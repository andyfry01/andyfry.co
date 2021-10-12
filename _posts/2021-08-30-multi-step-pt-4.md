---
layout: post
title: Multistep Forms in React with Awesome UX – Animations
description: Third part of the multi-step forms in React guide, focusing on animations to communicate when changes occur.
permalink: /multi-step-form-animations/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/fake-browser.css">
<link rel="stylesheet" href="/public/css/2021-08-30-multi-step-pt-4/animations.css"/>
<link rel="stylesheet" href="/public/css/prism.css">


Your typical visitor is accustomed to page loads. A fresh request for a new HTML page will clear the viewport of content, trigger a browser's loading indicators, and usually takes a moment or two to complete. These are unmistakable indicators that "something new" is occurring, and cue us to start looking out for those new somethings. 

When a SPA framework like React loads a new "page," this does not occur. Because the pages are being built dynamically inside the browser itself instead of being requested from a backend server, those hundreds or thousands of milliseconds of page loading may happen instantaneously. The URL may change, the page content may change, but most of the usual "new page" indicators will be absent. 

If you're in a "prime" state of mind – well rested, attentive, engaged with the task at hand – then you'll probably notice these super snappy transitions, and you'll be well oriented to what's going on. 

Many people, sadly, are not in this "prime" state of mind most of the time: maybe they haven't been sleeping well, maybe the kids are banging on pots in the kitchen, maybe thye've got a killer hangover, who knows. Whatever the case, when people miss these transitions, they may start to feel confused, alienated, or frustrated. This is a bad user experience!

We don't have any control over things like native loading indicators, but we have other ways of indicating that the content of a page has changed. Animations can help us signal to our visitors that there is new content on the page, and fortunately, they're pretty easy to add! I really like [Animate.css](https://animate.style/) for basic animations:

- The animations are general enough to use on many different elements.
- Like Tailwind, Animate.css has [utilities for removing unused styles](https://animate.style/#custom-builds), which cuts down on file size.
- As an accessibility bonus, the styles are all written to respect the [prefers-reduced-motion](https://animate.style/#accessibility) media query for visitors with vestibular disorders.

Be judicious in your use of animations, however. Check out the [best practices guidelines](https://animate.style/#Best_practices) in the docs for a great primer on when to use animations and when to skip them. 

## Compare and contrast

Let's take a look at some demo pages, both with and without animations. 

### No animations example

If you click the "Go to next step" button, the content will change. I've added in some goofy emojis to make the different parts of the form extra obvious, but the transitions would be easy to miss without them:

<div id="no-animations"></div>

### Example with animations

This is the exact same page with the `fadeInUp` animation from [Animate.css](https://animate.style/) added in. A very small, simple change, but it makes a huge difference! The transition point between steps is clear and unambigious. 

<div id="animations"></div>

## Code 

Here's the full example code, simplified for ease of reading. 

This might look a little funny compared to "normal" React, but the concepts are all the same. Instead of using Node modules to include React in the app, we're using [JS module imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) from [unpkg.com](https://unpkg.com/) instead. 

Instead of using [JSX](https://reactjs.org/docs/introducing-jsx.html), which requires a transpilation step to transform it into [React.createElement calls](https://reactjs.org/docs/react-api.html#createelement), we're using an extremely cool no-transpilation JSX alternative: [HTM](https://github.com/developit/htm). 

You can dig into more specifics about the code and how it works [here](https://preactjs.com/guide/v10/getting-started/#alternatives-to-jsx).

```js
import { h, Component, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const html = htm.bind(h);

const Page = (props) => {
  const { label, title, onPageChange } = props

  return html`<div class="animate__animated animate__fadeInUp">
    <div>
      <h1>${title}</h1>
    </div>
    <div>
      <label for="demo-1">${label}</label>
      <input
        id="demo-1"
        type="text"
        placeholder="Fill in a value! (or not)"
      />
    </div>
    <div class="">
      <button onClick=${() => onPageChange()}>
        Go to next step
      </button>
    </div>
  </div>`;
};

const PageOne = (props) => {
  const { onPageChange } = props
  return html`
    <${Page} 
      title="Step one ☝️" 
      label="What is your name?" 
      onPageChange=${onPageChange} />`
}

const PageTwo = (props) => {
  const { onPageChange } = props
  return html`
    <${Page} 
      title="Step two ✌️" 
      label="What is your quest?" 
      onPageChange=${onPageChange} />`
}

const routes = { 
  "one": PageOne,
  "two": PageTwo
}

const App = (props) => {  
  const [url, setUrl] = useState("https://website.com/what-is-your-name");
  const [page, setPage] = useState("one")

  const onPageChange = () => {
    if (page === "one") {
      setPage("two") 
      setUrl("https://website.com/what-is-your-quest")
    }

    if (page === "two") {
      setPage("one") 
      setUrl("https://website.com/what-is-your-name")
    }
  }

  return html`
    <div aria-live="polite">
      <${routes[page]} onPageChange=${onPageChange} />
    </div>`;
}

render(html`<${App} />`, document.getElementById("app-root"));
```

## Next up

Next week, we'll take a look at *persistent state* for multistep forms. With most React apps, your state will only persist for a single browser session. If you've got a long form, or if you need to take the user away from the form to log in or validate with something like OAuth, then it's possible that your visitors won't be able to finish and submit the whole thing in a single browser session, and will lose all of their data! 

How do we save the state of what's already been entered into a form, either for impatient visitors or for instances where they have to leave the domain of your app temporarily? Thankfully, there are many in-browser strategies we can use, and we'll learn about them next week.

Until then!

## Table of contents:

This is a series of blog posts which will cover each aspect of a great multi-step form experience separately. Check back for a new post each Monday until they're all done!

- [Introduction](/multi-step-form-intro)
- [Your tech stack](/multi-step-form-tech-stack/)
- [Accessibility](/multi-step-form-accessibility) 
- [Animations](/multi-step-form-animations/)
- Persistent state: coming on **9/6/21**
- Input validation: coming on **9/13/21**
- Putting it all together: coming on **9/20/21**

<script type="module" src="/public/preact-apps/2021-08-30-multi-step-pt-4/no-animations.mjs"></script>
<script src="/public/js/prism.js"></script>