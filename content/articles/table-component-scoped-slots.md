---
title: Building a Table Component with Vue and Scoped Slots
description: Let's build a table component
createdAt: 2021-03-19
draft: true
---

<div class="prose">

# Building a Table Component with Vue and Scoped Slots

Recently I found myself needing to build a component that takes in some data in the form of rows and columns, and displays that data as a table. The tricky part is that for some of the columns, I wanted to be able to customize the appearance of that data and/or combine several pieces of data within one cell. Something like this:

</div>

<div class="my-12">
<data-table-example></data-table-example>
</div>

<div class="prose">

It's easy enough to create a component like this for a very specific use case where you hard code in exactly how certain pieces of data should be formatted, but we want our component to be flexible, and make it only responsible for outputting the data in columns and rows, while leaving the _appearance_ of the content within each column and row to be customizable however we want.

I recently wrapped my mind around the concept of [Scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) through [Jess Archer's Laracon talk from 2020](https://vimeo.com/showcase/7060635/video/452362350) and her great Table component example. Let's make our own version of this component and try to get a better idea of what's going on.

_Note that this post assumes you are familiar with the basic concept of slots in Vue. If you're not, you can take a look at the [documentation on slots](https://vuejs.org/v2/guide/components-slots.html) and then come back!_

</div>
