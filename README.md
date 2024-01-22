# `instant-photo`

A Web Component for presenting an img like an instant photograph.

**[Demo](https://chrisburnell.github.io/component-template/demo.html)** | **[Further reading](https://chrisburnell.com/instant-photo/)**

## Examples

General usage example:

```html
<script type="module" src="instant-photo.js"></script>

<instant-photo>
  <img src="example.jpg" alt="">
</instant-photo>
```

Example setting the image to develop over time:

```html
<script type="module" src="instant-photo.js"></script>

<instant-photo develop>
  <img src="example.jpg" alt="">
</instant-photo>
```

## Features

This Web Component presents an img to make it look like an instant photo. With the `develop` attribute it will “develop” over time.

## Installation

You have a few options (choose one of these):

1. Install via [npm](https://www.npmjs.com/package/@chrisburnell/instant-photo): `npm install @chrisburnell/instant-photo`
1. [Download the source manually from GitHub](https://github.com/chrisburnell/instant-photo/releases) into your project.
1. Skip this step and use the script directly via a 3rd party CDN (not recommended for production use)

### Usage

Make sure you include the `<script>` in your project (choose one of these):

```html
<!-- Host yourself -->
<script type="module" src="instant-photo.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@chrisburnell/instant-photo@1.0.0/instant-photo.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@chrisburnell/instant-photo@1.0.0"
></script>
```

## Credit

With thanks to the following people:

- [David Darnes](https://darn.es) for creating this [Web Component repo template](https://github.com/daviddarnes/component-template)
