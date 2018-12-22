# prismic-span-renderer

[![npm](https://img.shields.io/npm/v/@exportarts/prismic-span-renderer.svg?style=flat-square)](https://www.npmjs.com/package/@exportarts/prismic-span-renderer)

This library contains methods to transform CMS content from [prismic.io](prismic.io)
to HTML which can be used in websites.

This library targets Prismic's API `v2`.

## Get started

```
yarn add -E @exportarts/prismic-span-renderer
```

## Usage

Use the methods available in
[`src/renderer/`](https://github.com/exportarts/prismic-span-renderer/tree/master/src/renderer)
to transform the objects from Prismic's API response to standard html.

More information about the motivation and how to use this library can be found in
the [docs/](https://github.com/exportarts/prismic-span-renderer/tree/master/docs)-folder.

### Please note

This package is currently using [ng-packagr](https://github.com/ng-packagr/ng-packagr)
which made it easy to handle npm packaging for now, since we use this lib
solely in Angular applications anyway.

Feel free to contribute and make it usable in more projects.
