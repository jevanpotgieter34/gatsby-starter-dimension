module.exports = {
  siteMetadata: {
    title: "Diamond Nutrition",
    author: "Jevan Potgieter",
    description: "We help you get back on the wagon"
  },
  plugins: [
    
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-netlify-identity-widget',
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
