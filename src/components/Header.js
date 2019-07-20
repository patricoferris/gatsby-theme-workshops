import React from 'react';
import Button from '../components/Button';
import { graphql, useStaticQuery } from 'gatsby'
import { Header as ThemeHeader } from 'theme-ui';


const Header = ({ back }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <ThemeHeader>
        <Button text={'Back'} to={back}></Button>
        <div><h1 style={style.title}>{data.site.siteMetadata.title}</h1></div>
    </ThemeHeader>
  )
}

const style = {
  title: {
    gridColumn: '2 / span 1',
  }
}

export default Header;