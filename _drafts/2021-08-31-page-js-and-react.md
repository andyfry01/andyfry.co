---
layout: post
title: How to Use the Super-tiny Page.js Router with React 
permalink: /page-js-and-react/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/fake-browser.css">
<link rel="stylesheet" href="/public/css/page-js-and-react/border-animation.css">
<link rel="stylesheet" href="/public/css/prism.css">

When you're working with React, before too long, the question will arise:

> "Uh ... how do I change pages with React?"

If we cast our minds back to 2010 or thereabouts, the question of how to "change pages", or link between different parts, of your site was a pretty simple one: 
- put an `<a>` tag on your page with an `href` attribute pointing towards the new URL
- whip up a new page with the contents for whatever that link contains
- and maybe configure your backend server a little bit so it knows how to serve the correct page under the correct URL

And voila! The magic of the internet in concert with HTML and the browser itself would fetch the new page, render it on the screen, and you'd be on your merry way. No JavaScript or further effort necessary. 

With React and other single-page-application frameworks, things work a little differently. Your "pages", in most instances, are not individual HTML pages on a _backend server_ or even backend PHP templates: they are dynamically constructed chunks of HTML which are build on the _client_, or in the browser itself. You can add as many components as you like, representing different parts of your site. You can add in buttons to swap these chunks of dynamic HTML in and out of the browser window, and it may appear that different "pages" are being loaded to the end user ...

... but that pesky URL bar won't change at all! 

MULTIPLE LINK DEMO GO HERE

## ... but that's the whole point of React!

This behavior is, ironically, exactly what React promises right on the label: the library's whole purpose is to enable you to build one single application, loaded in the browser by one single HTML file, which can dynamically generate your "pages" right then and there. This mitigates the long round-trip retrieval and content-loading times associated with fetching individual pages from a server, and gives the visitors to your site a much snappier, faster, and smoother web experience. 

And yet, if you're going to build your entire site using only React, you're going to be missing out on a lot of important functionality: 
- if a visitor refreshes the page, whatever "page" they were on, and whatever information they might have entered, will be lost. They were will be sent right back to the initial state of the application, whatever that might be
- if a visitor wants to link to a specific page, they can't: all pages will have the same static URL, and can only be accessed using whatever UI is inside the application itself

The history of the web has established these UX expectations in our minds, and so we're going to have to add this functionality back into our apps if we're going to use React to power the whole things. 

## Enter React Router

Fortunately, there are libraries out there which can mimic this routing behavior, and one of the most popular is React Router. 

<div id="routing-change-demo"></div>


## Required background knowledge

Before we dive in, here are some pre-reqs that you'll want to familiarize yourself with in order to understand this tutorial. We won't be diving too deep into any of this – a basic orientation is all that is required: 
- The [Hooks API](https://reactjs.org/docs/hooks-intro.html) (as opposed to [React.Component](https://reactjs.org/docs/react-component.html) or [React.createClass](https://reactjs.org/docs/react-without-es6.html))
- The [useState hook](https://reactjs.org/docs/hooks-state.html)
- The [useEffect hook](https://reactjs.org/docs/hooks-effect.html)
- The difference between client-side routing vs. server-side routing. [This article](https://betterprogramming.pub/react-router-and-client-side-routing-2e483452fbfb) has a nice summary of the differences.

## Initial setup

Let's do some initial setup. It's 2021, and I'm sick of Babel and Webpack, aren't you? Let's dump some complexity and use some nice modern JS features to keep our code simple. We'll use:
- [es-react](https://github.com/lukejacksonn/es-react), which provides React and ReactDOM in [es module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) format, courtesy of [unpkg](https://unpkg.com/)
- [HTM](https://github.com/developit/htm), which looks a lot like JSX, but doesn't require any transpilation at all

```jsx
import { React, ReactDOM } from 'https://unpkg.com/es-react'
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

const App = () => {
    return html`
        <div>
          <p>Look ma! No node_modules!</p>
        </div>
    `
}

ReactDOM.render(App(), document.getElementById('test'))
```

And would you look at that: frontend code produced with nothing but browser-based tools: 

<div id="app-initial-setup"></div>

## Defining our routes

So, first up: let's define our routes. According to the docs, it's a matter of calling [the `page` function](https://visionmedia.github.io/page.js/#pagepath-callback-callback-) with all of the routes that we'll need. So let's add some: 


```jsx
```

## Setting a base URL

## Initializing the router

## Rendering our views

## Accessibility

## ... or, just use my NPM module!

## Complete example


```jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import page from "page";

import Intro from "../form/Intro";
import Name from "../form/Name";
import Email from "../form/Email";
import Confirmation from "../form/Confirmation";

const routes = {
  root: { component: Intro, title: "A Form For a Thing" },
  name: { component: Name, title: "Step One: Name" },
  email: { component: Email, title: "Step Two: Email" },
  confirm: { component: Confirmation, title: "Step Three: Confirmation" }
};

const scrollTop = () => window.scrollTo({ x: 0 });
const changeTitle = (title) => (document.title = title);
const setFocus = () => {
  setTimeout(() => {
    const focusTarget = document.getElementById("focus-target");
    focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus();
    focusTarget.removeAttribute("tabindex");
  }, 0);
};

const useRouter = () => {
  const [route, setRoute] = useState("root");

  const changeRoute = (route) => {
    scrollTop();
    changeTitle(routes[route].title);
    setRoute(route);
    setFocus();
  };

  // router config
  page("/", () => changeRoute("root"));
  page("/name", () => changeRoute("name"));
  page("/email", () => changeRoute("email"));
  page("/confirm", () => changeRoute("confirm"));

  page.base("/#");
  // init router
  useEffect(() => {
    page();
  }, []);

  const View = routes[route].component;

  return View;
};

export default useRouter;

```

<script src="/public/js/prism.js"></script>
<script type="module" src="/public/preact-apps/page-js-and-react/app.mjs"></script>



