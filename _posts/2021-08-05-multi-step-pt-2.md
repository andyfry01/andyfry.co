---
layout: post
title: Accessible Multistep Forms in React with Awesome UX – Tech Stack
permalink: /multi-step-form-tech-stack/
author_profile: true
read_time: true
comments: true
share: true
related: true
description: "If your web app is a chonker of a page that takes a long time to download, then you're cutting off easy access to those without fast internet."
---

## Your tech stack

### Problems

Before we even start building this form, the first thing we should assess is the tech stack we're building with. 

There are as many tech stacks out there as grains of sand on a beach, but this is a pretty typical modern stack: 

- React for rendering and state management
- React Router for client-side routing
- Bootstrap for CSS

JUST this. 

...no actual application code, no images, no fonts, no nothing

... bundled and minified with `create-react-app`'s default `build` script 

... comes out to almost *300 kilobytes* of JS and CSS! We haven't even added any of our own code yet, this is the baseline. And our app doesn't even DO anything yet!

![Browser network tab showing downloaded file sizes for a React app](/assets/img/cra-router-bootstrap.png)

If you're fortunate to live and work in a wealthy part of the world, with a new-ish phone in your pocket and good internet access, this may not seem like such a big concern. An afternoon's journey through the web might consume tens or hundreds of megabytes of code and assets along the way, but you'd never know it on a 5G connection, to say nothing of a localhost dev environment.

But if we expand the commonly understood definition of "web accessibility" a little bit, the picture looks very different. "Accessible" outside the context of the web means "easy to access," and an unnecessarily bloated website is anything but. If your web app is a chonker of a page that takes a long time to download, then you're cutting off that easy access to those who don't have fast internet or a modern browsing device.

### Solutions

So, what can we do to cut down on baseline code? 

### React vs Preact

Instead of React, why not use [Preact](https://preactjs.com/)? It has the exact same API and clocks in at a fraction of the size. [There are differences](https://preactjs.com/guide/v10/differences-to-react) in how Preact works internally, but nothing that would impact most React projects. 

You may not even need to refactor your app to integrate Preact either: it can be used as a drop-in replacement for React via the [preact-compat](https://github.com/preactjs/preact-compat) library. 

![Preact logo](/assets/img/preact.png)

### React Router vs Page.js

Instead of React Router, why not use something like [Page.js](https://github.com/visionmedia/page.js/), or if you're going with Preact, [preact-router](https://github.com/preactjs/preact-router). If we're talking about big, chonky libraries, React Router is the chonkiest. Most use cases don't justify such a huge library. 

React Router does include some important accessibility features along with its routing capabilities, but we can reimplement them ourselves easily enough with very little code. We'll address this in the accessibility section of the guide. 

If all you need is simple frontend URL routing, pick a simple URL router. 

<img class="border border-solid border-black mx-auto" src="/assets/img/pagejs.png" alt="Page.js logo">

### Monolith CSS vs Utility CSS

Instead of a monolithic CSS library like Bootstrap, how about something smaller? You've got a lot of options here: 

- [Milligram](https://milligram.io/), a lightweight framework which uses element selectors instead of class selectors for many of its styles. Think `<h1>A nice heading</h1>` instead of `<h1 class="heading">A nice heading</h1>`. This makes it super simple to use. 
- [Bonsai.css](https://www.bonsaicss.com/) and [Pure.css](https://purecss.io/). These use both element-based and class-based selectors, which gives you more custom styling options than Milligram.
- And of course, the ever-controversial [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) (which this blog uses!). Tailwind is unique in that it has built-in utilities for removing unused styles from your final CSS file. Most builds come out to mere kilobytes in size: a tidy snack at any internet speed.

<img class="border border-solid border-black py-10 px-12" src="/assets/img/tailwind.svg" alt="Tailwind CSS logo">


## Next up

Next week, we'll take a look at *accessibility* for multistep forms. We touched briefly on the topic here as it pertains to download speeds and "ease of access," but when it comes to keyboard users and assistive technology, there are a number of things you need to do with a multistep form that you might take for granted in a single-page HTML form. 

Stay tuned!

## Table of contents:

This is a series of blog posts which will cover each aspect of a great multi-step form experience separately. Check back for a new post each Monday until they're all done!

- [Introduction](/multi-step-form-intro)
- [Your tech stack](/multi-step-form-tech-stack/)
- Accessibility: coming on **8/23/21**
- Animations: coming on **8/30/21**
- Persistent state: coming on **9/6/21**
- Input validation: coming on **9/13/21**
- Putting it all together: coming on **9/20/21**
