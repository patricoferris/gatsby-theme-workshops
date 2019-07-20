/**
 * WORKSHOP DATA PARSER 
 * 
 * When querying for the data in ../templates/workshop.js we get all of the relevant
 * data back from multiple sources - we need to create one coherent collection of the 
 * data.
 * 
 * Currently the default sources of data include: 
 *   - metadata.yml
 *   - notes.md
 *   - images
 *      - bg.png (* Background Cover Image *)
 *      - fg.png (* Background Cover Image *)
 */

/**
 * A simple helper function to generate strings from arrays
 * @param {*} array An array of strings
 */
const arrayToString = (array) => {
  let string = "";

  array.forEach((c, idx) => {
    if (idx !== array.length - 1) {
      string += `${c}, `;
    } else {
      string += c
    }
  })

  return string;
}

/**
 * A function to generate a cleaner and more manageable object of the data
 * @param {*} dataArray The unclean, node data given from the graphql query
 */
export const workshopDataParser = (dataArray) => {
  let cleanData = {
    title: "",
    images: {},
    contributors: [],
    tags: [],
    Description: "",
    sections: []
  };

  let sortingArr;

  dataArray.forEach(({ node }) => {
    if (node.childWorkshop !== null) {
      cleanData.title = node.childWorkshop.title;
      cleanData.contributors = arrayToString(node.childWorkshop.contributors);
      cleanData.tags = arrayToString(node.childWorkshop.tags);
      sortingArr = node.childWorkshop.sections;
    } else if (node.childMarkdownRemark !== null) {
      // For any of the markdown files, we either purposefully extract the description
      if (/description\.md/g.test(node.relativePath)) {
        cleanData.Description = node.childMarkdownRemark.html
      } else {
        // Or we create new sections based on the config workshopSections options array
        cleanData.sections.push({
          title: node.childMarkdownRemark.frontmatter.title,
          html: node.childMarkdownRemark.html
        })
      }
    } else if (/bg/g.test(node.relativePath)) {
      cleanData.images.bg = node.childImageSharp.fluid
    } else if (/fg/g.test(node.relativePath)) {
      cleanData.images.fg = node.childImageSharp.fluid
    }
  });

  // Sorting the list based on the ordering given in the metadata.yaml
  cleanData.sections.sort(function(a, b){  
    return sortingArr.indexOf(a.title.toLowerCase()) - sortingArr.indexOf(b.title.toLowerCase());
  });

  return cleanData
}