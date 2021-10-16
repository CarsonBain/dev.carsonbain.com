---
title: Use Tailwind Presets to share a design system between projects
description: Sometimes you will have multiple projects that need to share the same design system or styles. If you're using Tailwind CSS, this can be achieved through Presets, allowing you to manage the system in one spot and deploy to your various projects.
createdAt: 2021-10-16
---

<div class="prose">

# Use Tailwind Presets to share a design system between projects

Recently at [Felix](https://www.felixforyou.ca) we've been working toward moving our main project's front end code out of a Laravel monolith, and into its own separate Nuxt project. We're hoping that by moving to this architecture, we can separate the front end and backend concerns, and also make the project more consistent since currently some of the views are written in templated PHP, some in Vue, etc...

Something that we faced right away with this decision is that we won't just be able to move the whole application at once. There's lots of code that needs to be refactored and rewritten to support this new structure.

One problem with having multiple versions of the same application in different repositories is how do you manage the code that both apps need to share and keep them up to date and in sync? An example being a UI component that may need to change while you're working between both projects, or in the case of this post, the [tailwind config file](https://tailwindcss.com/docs/configuration) that holds your styleguide and tokens.

## Creating a preset

Essentially a preset is just a regular object like you would have in your Tailwind config file. You can define this in a separate `.js` file, and place it wherever you would like. We'll name ours `design-system-preset.js` and put it in the root folder of our example project.

Lets say that our design system contains some custom colors that we want to make accessible to whatever project this preset is used in. We can add those colors to the new file just as you would to a regular tailwind config file:

```js[design-system-preset.js]
module.exports = {
  theme: {
    colors: {
      brown: {
          100: '#544742',
          75: '#6B6055',
          50: '#B7A697',
          10: '#F5ECE4',
          5: '#FFFBF7'
      }
    },
      ...
    extend: {
      ...
    }
  },
}
```

Now we're able to import this new preset file directly into our project's `tailwind.config.js` file inside of the `presets` key:

```js[tailwind.config.js]
module.exports = {
  presets: [
    require('./design-system-preset.js')
  ],
  // Customizations specific to this project would go below
  theme: {
    ...
    },
    ...
  extend: {
    ...
    },
  },
}
```

The project should now be able to utilize any of our custom colors defined in the design system preset, as well as any custom project specific styles that have been added to the rest of the config file. For more information on how the preset and local config merge strategy works, checkout the [tailwind documentation](https://tailwindcss.com/docs/presets#how-configurations-are-merged).

This is a pretty simple example for one project, but you can see how this concept could be extended to having the file hosted as an npm package / it's own repository that can be version controlled, and then imported directly into each of your project's `tailwind.config.js` files. Importing as an npm package that was named `design-system-preset` after installing the package with `npm` or `yarn` would look something like this:

```js[tailwind.config.js]
module.exports = {
    presets: [
    require('@design-system-preset.js')
  ],
  ...
  theme: {
    ...
    },
      ...
    extend: {
      ...
    }
  },
}
```

For more info on creating simple npm packages, check out [this great tutorial](https://dev.to/souravdey777/creating-your-own-npm-package-4f4g). Note that you would name your `design-system-preset.js` file as `index.js` in the case of the tutorial, as that would be the main file of your application.

Hope this helps you create some more reusable code!

</div>
