---
layout: post
title: Accessible Multistep Forms in React with Awesome UX – Accessibility
permalink: /multi-step-form-accessibility/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism.css">



## Accessibility

The [Animations](#Animations) section addresses the instantaneous SPA page-loading problem from a *visual* perspective. However, millions of web users are *visually impaired*, or otherwise need or want to use a [screen reader](https://en.wikipedia.org/wiki/Screen_reader) or other [assistive tools](https://www.w3.org/WAI/people-use-web/tools-techniques/) to browse the web.

### Missing signals

Your typical screen reader software is well aware of when a page load occurs. There are many clear, baked-in signals which broadcast this: a visitor has opened a new browser window or tab, has clicked a link, or has typed in a URL and hit enter. 

These unambiguous signals do not occur during changes in "dynamic" content – when JavaScript changes the content on the screen **without** a new HTML page being requested from a backend server. To a sighted visitor, it may look like the same thing: the content on the screen changes, and so you know you're on a new page, or at least in some kind of new context. Assistive technology, however, has a hard time realizing that anything has happened. 

There are several other side effects which occur when a new page is loaded in a browser too: 

- The document [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) changes: e.g., from "The New York Times" to "Guest Essay: Why Everything is Horrible and Getting Worse".
- The "focus" of the screenreader itself changes. Screenreader focus is like keyboard focus. If you don't know what keyboard focus is, here's a great [primer on how it works](https://www.youtube.com/watch?v=EFv9ubbZLKw).
- The scroll position resets to the top of the page.

### Demonstration

This can be confusing to think about without a visual demonstration, so let's check out some videos demonstrating accessibility problems and solutions.

One of the biggest problems with SPA frameworks is keyboard and/or screen reader focus. This is a video demonstrating how focus changes between "normal" page loads using MacOS Voiceover on Safari. Because we're loading brand new static pages from a backend server, everything behaves as it should. Notice how the black Voiceover focus ring moves between elements until I click on the "Dragon Ball Z" link, which loads a new page and moves Voiceover focus back to "web content"[`1].

VIDEO GO HERE

And here is an example of an inaccessible set of pages, where content and URL changes are 100% JavaScript driven. Notice how:

- The black Voiceover focus ring remains stuck in place after page changes. It's still visually located where the previous link was located even though the link has disappeared.
- The scroll position remains stuck at the previous scroll position (middle of the page, not the top). Even though the browser and/or the screen reader itself has helpfully moved focus to the top of the document, you wouldn't know it until you attempt to navigate around. When you do start to navigate, the page snaps jarringly upwards to where focus actually is.
- The title of the page hasn't changed, so there's no new announcement with a new page title when we click on links.

VIDEO GO HERE

### Adding the signals back in

So, in order to make a client-driven route change accessible, we need to: 

1. Scroll to the top of the new page.
2. Change the document's title so the screen reader will announce the new page.
3. Programmatically set focus to ... *something* on the new page.

Those first two pieces are fortunately pretty simple, but that last piece is trickier. As of writing, there is not one single "best practice" solution for *where* you should send focus on a route change, seeing as the default browser and screen reader behaviors can't be reproduced with JavaScript. Voiceover focuses on the outer "web content" box when the browser loads a new page, but this is outside the document, and JavaScript can't access it. 

Being thus limited to stuff within the document itself, some approaches are to:

- Focus on the document `body` tag
- Focus on the container node of the app (usually `<div id="target"></div>)
- Focus on the topmost part of the app tree that changed (the approach of [Reach Router](https://reach.tech/router/accessibility))
- Focus on the top level heading of the page (frequently an `h1` element)
- Focus on a [skip navigation link](https://webaim.org/techniques/skipnav/) at the top of the page

All of these strategies can be found somewhere on the internet, all have their various upsides and drawbacks. You should pick one though, because the alternative isn't pretty!

Here's a video which fixes our previously inaccessible Bob Ross website. It scrolls to the top, and changes the document title after every route change. It also demonstrates two page-load focus strategies: 

- Focus on the first heading
- Focus on a skip navigation link

VIDEO GO HERE

### The code

So, to enable accessible SPA route changes, we need three things: 

1. We need to scroll to the top of the page:
```js
window.scrollTo({x: 0})
```

2. We need to change the document title: 
```js
document.title = "Guest Essay: If We Just Work Together We Can Stop the Apocalypse Guys"
```

3. We need to set focus. My favorite strategy is to set focus on the first heading of the page. To make that easier to perform programmatically, let's add an id to the exact element we want to focus on:

```html
<h1 id="focus-target">Welcome to the home page</h1>
```

And after that, we programmatically focus on that element. Because of browser bugs and other inconsistent behavior, there are a few extra steps we need to do aside for just calling `focus` on our target element to ensure that this happens correctly across all browsers. The what and why of these extra steps are summarized very nicely in [this article](https://accessible-app.com/pattern/vue/routing).

```js
const setFocus = () => {
    setTimeout(() => {
        const focusTarget = document.getElementById("focus-target")
        focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus();
        focusTarget.removeAttribute('tabindex');
    }, 0);
}
```

#### Complete example

Here's the full code from the video example, simplified for ease of reading:

```jsx
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import page from "page";

// Note the "focus-target"
const Home = () => {
    return (
        <div>
            <h1 id="focus-target">Welcome to the home page</h1>
            <a href="/page-1">Go to page one</a>
        </div>
    )
}

const Page1 = () => {
    return (
        <div>
            <h1 id="focus-target">You made it to page 1!</h1>
            <a href="/">The movie's over, go home</a>
        </div>
    )
}

const routes = {
    Home: Home,
    Page1: Page1,
};

const scrollTop = () => window.scrollTo({x: 0})
const changeTitle = title => document.title = title
const setFocus = () => {
    setTimeout(() => {
        const focusTarget = document.getElementById("focus-target")
        focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus();
        focusTarget.removeAttribute('tabindex');
    }, 0);
}

const onRoutechange = ({ title, view }) => {
    scrollTop()
    changeTitle(title)
    setView(view)
}

const App = () => {
    const [view, setView] = useState("Home");

    // route definition, these callbacks get called on each route change
    page("/", () => onRoutechange({title: "Home page", view: "Home"}))
    page("/page-1", () => onRoutechange({title: "Page one", view: "Page1"}))
    
    // init the router
    useEffect(() => page({ hashbang: true }), []);
  
    const View = routes[view];
  
    // render the actual page
    return <View />
}

ReactDOM.render(<App />, document.getElementById("root"))
```

### Further reading

Here is some further reading on the topic if you'd like to dive deeper:

- [A great summary of accessible routing issues for all SPA frameworks](https://accessible-app.com/pattern/vue/routing), and a Vue-specific implementation of accessible routing

- [A recent user testing research document](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/) conducted by the Gatsby team, with an in-depth summary of the problems and commentary by users of assistive technology on what they like and don't like about the various focus methods. 

[:^1] "Web content" is like a bounding box containing the website itself. When focus is on web content, you can "enter the web content," which is like diving into the document, and restricts voiceover navigation to the website itself. Without entering the web content, Voiceover navigates between controls in the application itself, which enables you to interact with the toolbar, back and forwards buttons, URL text field, etc.

<script src="/public/js/prism.js"></script>