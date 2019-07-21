import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { workshopDataParser } from '../utils/workshopDataParser';
import CollapsableList from '../components/CollapsableList';
import Img from 'gatsby-image'

const BANNER_HEIGHT = 350;

export const query = graphql`
  query ($workshopRDRegex: String!) {
    allFile(filter: {relativeDirectory: {regex: $workshopRDRegex }}) {
      totalCount
      edges {
        node {
          relativePath
          childWorkshop {
            title
            tags
            contributors
            sections
          }
          childMarkdownRemark {
            html
            frontmatter {
              title
            }
          }
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const WorkshopTemplate = ({ data : { allFile : { edges }} }) => {
  // Cleaning up the data 
  let cleanData = workshopDataParser(edges);
  return (
    <Layout back={'./workshops'}>
      <div key='images' style={{position: 'relative'}}>
          <Img style={style.background} alt='Background hero image' fluid={cleanData.images.bg}/>
          <Img style={style.foreground} alt='Foreground hero image' fluid={cleanData.images.fg}/>
      </div>
      <h1>{cleanData.title}</h1>
      <div 
        style={style.description}
        dangerouslySetInnerHTML={{__html: cleanData.Description}}></div>
      <h2>by {cleanData.contributors}</h2>
      <CollapsableList sections={cleanData.sections}></CollapsableList>
    </Layout>
    )
}

const style = {
  description: {
    fontStyle: 'italic'
  },
  background: {
    position: 'relative',
    height: `${BANNER_HEIGHT}px`,
    width: '100%'
  },
  foreground: {
    position: 'absolute',
    width: '33%',
    marginLeft: "33%",
    height: `${BANNER_HEIGHT}px`,
    zIndex: '1000',
    top: '0px'
  },
}

export default WorkshopTemplate