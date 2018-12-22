# Motivation

This library is intended to be used to tranform [prismic.io](https://prismic.io)'s
text styling attributes (bold, italic, hyperlink) as well as more complex objects
(e.g. whole rich-text-sections or images) to HTML usable on websites.

## Vision

This library is build with Prismic's `v2` API in mind and contains several
common objects found in a typical API-response such as `paragraph` or `image`.
(See [`src/models/`](https://github.com/exportarts/prismic-span-renderer/tree/master/src/models)
directory for all available objects.)

The goal is to provide rendering-methods which take these standard objects
and return HTML. More advanced objects (e.g. custom slices) are currently
not handled in this project and are maintained in the consuming main projects.

The rendering methods should be as unopinionated as possible and return standard HTML5.
Custom styling shall either be passed via configuration of the rendering-methods
or be applied from outside this library via styling of the HTML elements themselves
(e.g. `p { color: red }`).

The rendering-methods available today can be found in the
[`src/renderer/`](https://github.com/exportarts/prismic-span-renderer/tree/master/src/renderer)
directory.

## About Prismic Spans

When text is styled in Prismic's WYSIWYG editor, the user can style the text and add 
hyperlinks, for example:

*Today* is a **good** day!

Prismic's API will return something like this:

```json
{
  "type": "paragraph",
  "text": "Today is a good day!",
  "spans": [
    {
      "start": 0,
      "end": 4,
      "type": "em"
    },
    {
      "start": 11,
      "end": 14,
      "type": "bold"
    }
  ]
}
```

## Our Usecase

This library is used in various website projects which use server-side-rendering with
Angular Universal. To display the CMS-content, we need to tranform Prismic's JSON-data to
HTML on the server side in order to create static HTML useable for search engines/social
network crawlers and of course the human.

With the example above, the library will return the following HTML:

```html
<em>Today</em> is a <strong>good</strong> day!
```
