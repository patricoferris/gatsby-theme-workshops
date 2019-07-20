import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import WorkshopList from '../components/WorkshopList';

const removeSpaces = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const WorkshopsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            id
            childWorkshop {
              id
              contributors
              tags
              slug
              title
            }
            childMarkdownRemark {
              html
              frontmatter {
                title
              }
            }
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 220) {
                ...GatsbyImageSharpFluid
              }
            }
            relativeDirectory
            relativePath
          }
        }
      }
    }
  `);

  // Combine the markdown and the yaml metadata
  let workshops = [];
  data.allFile.edges.forEach(({ node }) => {
    let match = workshops.find(item => item.relativeDirectory.split("/")[0] === node.relativeDirectory.split("/")[0]);
    if (match === undefined) {
      let relativeDirectory = node.relativeDirectory;

      // Extracting the relative directory without images subfolder if necessary
      if (/images/g.test(node.relativeDirectory)) {
        relativeDirectory = node.relativeDirectory.split('/')[0];
      }

      // Create a new item
      let newItem = {
        relativeDirectory: relativeDirectory,
      }

      if (node.childWorkshop !== null) {
        newItem.metadata = node.childWorkshop;
        let spacelessTags = node.childWorkshop.tags.map(tag => removeSpaces(tag));
        newItem.metadata.tags = spacelessTags;
      } else if (node.childMarkdownRemark !== null) {
        newItem.markdown = node.childMarkdownRemark;
      } else if (node.childImageSharp !== null) {
        if (/bg/g.test(node.relativePath)) {
          newItem.coverImageBg = node.childImageSharp.fluid
        } else {
          newItem.coverImageFg = node.childImageSharp.fluid
        }
      }

      workshops.push(newItem);
    } else {
      if (node.childWorkshop !== null) {
        match.metadata = node.childWorkshop;
        let spacelessTags = node.childWorkshop.tags.map(tag => removeSpaces(tag));
        match.metadata.tags = spacelessTags;
      } else if (node.childMarkdownRemark !== null) {
        match.markdown = node.childMarkdownRemark;
      } else if (node.childImageSharp !== null) {
        if (/bg/g.test(node.relativePath)) {
          match.coverImageBg = node.childImageSharp.fluid
        } else {
          match.coverImageFg = node.childImageSharp.fluid
        }
      }
    }
  });

  return (
    <>
      <Layout back={'/'}>
        <WorkshopList workshops={workshops}></WorkshopList>
      </Layout>
    </>
  )
}

export default WorkshopsTemplate