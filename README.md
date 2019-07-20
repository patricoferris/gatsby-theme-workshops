# Gatsby Theme Workshops 
---------------------------

*A brief history*

Welcome to a Gatsby Theme for building lessons, workshops, tutorials and much more. This project started from the want to shift a current project the site for [Cambridge University's Tech Society's](hackersatcambridge.com) currently written in Swift, to something a bit more manageable and friendly to beginners whilst not sacrificing on capabilities, extensibility, performance and usability. Gatsby and their new Themes feature seemed like the perfect fit for turning our site into a **blazingly** fast one whilst also benefiting from the great community and developer ecosystem that comes with Gatsby. 

### Why change? 
----------------------------

For the longest time our workshops have been written using markdown and then parsed to HTML using a custom Swift backend developed by our own people (for info see [this article](https://medium.com/hackers-at-cambridge/why-were-writing-our-website-in-swift-2e620ae7b72b)). This is great and worked really well but it has three main problems for us: 

1. Nobody else can use it 
2. New-joiners to the project find onboarding hard 
3. Extending the functionality was difficult

The idea was to move our project away from this structure and use a more familiar stack with Javascript or Python - then Gatsby announced the stable release of themes and it seemed perfect. It solves all of our problems allowing us to share our resources with whoever wants to easily integrate them into their codebase.

### Workshop Structure 
-----------------------------

The basic, obligatory structure of a workshop is the following: 

```
> workshops 
  > workshop-default
    > metadata.yaml
    > notes.md
    > images
      > bg.png
      > fg.png
```

The `yaml` file is for storing the metadata about your workshop and needs the following structure: 

```yaml
title: My Default Workshop
  contributors:
   - Patrick Ferris
  tags:
   - Deep Learning
   - Machine Learning
   - Neural Networks
```

The tags are particularly useful as the theme uses [react-semantic-ui](https://react.semantic-ui.com/) to add filtering by tag to your workshops from the very start.

Each markdown file represents a section of your workshop and the only requirement on these files is that they have a frontmatter (a small yaml section at the top of the file) with a title - for example: 

```markdown
---
title: "Main Content"
---

This workshop aims to **help** you understand...
```

And lastly the `images` folder - this is used to hold two key images (you can add others and link it in your markdown like so: `![My Lovely Image](images/my_lovely_image.png)`) the background (`bg.png`) and foreground (`fg.png`) for the cover image on the workshop. Why two? The idea is that it will make it easier to display on screens of varying aspect ratios by expanding the background when whilst keeping the foreground one centred. 

### Configurations
---------------------

Of course this seems quite limiting - here are the current supported ways for you to make it your own. When you resolve the plugin in your `gatsby-config.js` file you can pass the following options:

```js
options: {
  workshopFolder: 'workshops', // Name of your folder for them (ab)
  basePath: '/workshops', // The base path for your workshop content i.e. www.my-site.com<basePath>/workshop-1
  sections: ['notes', 'setup', 'advanced'] // The different markdown files (sections) you'll want in your workshops 
}
```

### What does it look like? 
----------------------

Check out the live demo of a site using the theme and hopefully in the near future the [Hackers at Cambridge](hackersatcambridge.com) site will migrate to using this theme. 


### Want more things? 
-----------------------

Feature requests and bugs can be brought up in the issues on GitHub, here are some of the things I'm already thinking of adding: 

- JSON Questions and Answers for the bottom of the workshop
- Further improvements to maintaining accessibility to the workshops
- Greater customisability through the options 

