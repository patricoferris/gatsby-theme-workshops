import React from 'react';
import { Layout as ThemeLayout, Container, Main } from 'theme-ui';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header';
import Helmet from 'react-helmet';


const Layout = ({ children, back }) => {
  let images;
  let filtered = children;
  // Filtering out the cover images from the workshops to display in full by placing outside the main container
  if (Array.isArray(children)) {
    images = children.find(child => child.key === 'images');
    filtered = children.filter(child => child.key !== 'images')
  }

  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => {
        const {title, description} = data.site.siteMetadata;
        return (
          <ThemeLayout>
            <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`} description={description}>
              <meta charSet="utf-8" />
              <html lang="en" />
            </Helmet>
            <Header back={back}></Header>
            {images}
            <Main><Container>{filtered}</Container></Main>
          </ThemeLayout>
      )
      }}
    />
  )
}

export default Layout;