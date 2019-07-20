module.exports = ({ workshopFolder = 'workshops' }) => ({
  plugins: [
    "gatsby-transformer-sharp",
    `gatsby-plugin-sharp`,
    "gatsby-theme-ui",
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: workshopFolder
      }
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Workshop"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '>'
            }
          }
        ],
      },
    },
  ]
})