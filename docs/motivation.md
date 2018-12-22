# Motivation

This library is intended to be used to tranform [prismic.io](https://prismic.io)'s
text styling attributes (bold, italic, hyperlink) to HTML usable on websites.

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
