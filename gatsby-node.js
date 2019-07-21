const fs = require('fs');

const yamlData = `
  title: My Default Workshop
  contributors:
   - Patrick Ferris
  tags:
   - Deep Learning
   - Machine Learning
   - Neural Networks
  sections:
   - Prerequisites
   - Setup
   - Notes
`

const markdownGenerator = (section) => {
  return `--- \ntitle: ${section} \n--- \nWelcome to my lovely little section called ${section} - Gatsby is great :)`;
}

const consoleError = (tag, err) => {
  if (err) {
    console.error(`Oh no, something's wrong with ${tag}`)
    console.error(err);
  }
}

const png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==";
var buf = Buffer.alloc(128, png, 'base64');

// Check for the correct directory 
exports.onPreBootstrap = ({ reporter }, options) => {
  const path = options.workshopFolder || 'workshops';
  const sections = options.workshopSections || ['prerequisites', 'setup', 'notes'];

  if (!fs.existsSync(path)) {
    reporter.info(`Creating the ${path} directory and default workshop`);
    fs.mkdirSync(path);
    fs.mkdirSync(`${path}/workshop-default`);
    fs.mkdirSync(`${path}/workshop-default/images`);
    fs.writeFile(`${path}/workshop-default/metadata.yaml`, yamlData, (err) => consoleError("metadata", err));
    sections.map(section => {
      fs.writeFile(`${path}/workshop-default/${section}.md`, markdownGenerator(section), (err) => consoleError("markdown", err));
    })
    fs.writeFile(`${path}/workshop-default/images/fg.png`, buf, (err) => consoleError("image", err));
    fs.writeFile(`${path}/workshop-default/images/bg.png`, buf, (err) => consoleError("image", err));
  }
}

// The Workshop Type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Workshop implements Node @dontInfer {
      id: ID!
      title: String!
      tags: [String!]!
      contributors: [String!]!
      sections: [String!]!
      slug: String!
    }
  `)
}

// Adding our slug
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || '/';
  const slugIt = str => {
    const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  }

  createResolvers({
    Workshop: {
      slug: {
        resolve: source => slugIt(source.title)
      }
    }
  })
}

// Query the workshops and create the pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/workshops.js')
  })

  const result = await graphql(`
  query {
    allFile {
      edges {
        node {
          id
          childWorkshop {
            id
            slug
            title
          }
          relativeDirectory
        }
      }
    }
  }
  `)

  if (result.errors) {
    reporter.panic(`error loading workshops: ${result.errors}`);
    return;
  }

  const workshops = result.data.allFile.edges;

  workshops.forEach(({ node }) => {
    if (node.childWorkshop !== null) {
      const slug = node.childWorkshop.slug;

      actions.createPage({
        path: slug,
        component: require.resolve('./src/templates/workshop.js'),
        context: {
          workshopID: node.id,
          workshopRD: node.relativeDirectory,
          workshopRDRegex: `/${node.relativeDirectory}/i`,
        }
      })
    }
  })
}
