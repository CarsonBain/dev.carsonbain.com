---
title: How to (slowly) migrate your project to use Tailwind CSS
description: A 3 step strategy to help get a project's CSS back under control wihtout having to re-write everything all at once.
createdAt: 2021-02-20
---

# How to (slowly) migrate your project to Tailwind CSS

Over the last 8 months or so, I've really loved writing and organizing CSS with [Tailwind CSS](https://tailwindcss.com/). I've also found that using Tailwind in a project that has rather unorganised and hard to maintain CSS can be a really good strategy to get things back under control.

**The main obstacles I faced in the codebase I was working on:**

- One main CSS file that had ~10,000 lines of unorganised code that touched all parts of the app in no particular order. Lots of these rules were overriding other rules using `!important`
- Bootstrap 4 utility classes and some components were included in the project and trickled throughout
- Some of the Vue components had their own scoped styles
- No real structure or idea of consistent classes being used for spacing, colours, etc...

I knew I wouldn't be able to just re-write everything from scratch — I needed to be able to make small gradual changes and refactors while keeping the rest of the CSS intact. I found that the 3 steps below set me up with a good foundation to be able to achieve this.

## 1. "Freeze" the old code

My first step was to set a precedent to the rest of the dev team that the old CSS files should not be added to, they can only have code removed as the app is refactored. Treating these files as "legacy" or "archive" was helpful to gain a sense of security that these files would stop growing, and eventually can be removed without worry.

Any new code to be built should be built with Tailwind and any time the team touches existing code that includes CSS, an attempt should be made to refactor that CSS to use Tailwind as best as possible.

## 2. Give your Tailwind classes a prefix

Due to the use of Bootstrap utility classes, and the fact that some custom utility classes had also been created, I wanted to make sure there would be no naming convention clash between Tailwind and these now legacy classes.

Tailwind lets you set a custom prefix to their class names in the `tailwind.config.js` file:

```js
module.exports = {
  ...
  prefix: 'my-prefix'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  ...
}
```

So in the example above, instead of writing a Tailwind class `bg-blue-100`, you would write `my-prefix-bg-blue-100`.

## 3. Enable the `!important` flag

My last major problem was controlling CSS specificity with these new classes especially since some of the older CSS already utilized the `!important` rule to override other styles within the application and was a bit unpredictable.

I decided to utilize the `important` flag in the `tailwind.config.js` file to add `!important` to every Tailwind rule generated:

```js
module.exports = {
  ...
  important: true,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  ...
}
```

Using `!important` shouldn't be seen as a disadvantage or "bad practice" — I want to make sure that the Tailwind classes takes precedence over all other current classes so that there's no un wanted side effects.

---

What's great about this 3 step approach above is that combined with the fact that Tailwind uses [PurgeCSS](https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html), the only classes that are created are the ones that are actually used in your project. So instead of loading in every possible combination of classes your project _could_ use, it's only going to generate the classes your project is currently using. This means that we can slowly refactor, and not be worried about adding a ton of size to the final bundle that gets served to the user!

Hopefully this post helps if you're feeling overwhelmed about taking on a migration / re-write like this. It doesn't have to be as daunting as it seems — take it slow!
