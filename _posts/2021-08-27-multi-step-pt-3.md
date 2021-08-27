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

Millions of web users are *visually impaired*, or otherwise need or want to use a [screen reader](https://en.wikipedia.org/wiki/Screen_reader) or other [assistive tools](https://www.w3.org/WAI/people-use-web/tools-techniques/) to browse the web. One of the web's many great achievements is that when a website is built with proper HTML, it's fully accessible! All of the standardized semantic tags we have at our disposal – [headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), [paragraphs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p), [anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), [sections](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section), etc. – form a wonderful, standardized interface which enables assistive software to parse documents easily. This, in turn, makes it much easier for users of assistive devices to navigate pages when the usual visual experience is out of reach. 

However, React-driven multistep forms can often impair the accessibility of a page. Because these forms are primarily JavaScript-driven instead of HTML-driven, many of the "signals" that assistive technology relies on to detect changes and updates to a page go missing. 

At best, these accessibility problems can be a small annoyance; at worst, they can completely block visitors from using your website at all, which is not only a grievous and unneccessary disenfranchisement of a whole class of internet users, it's bad for business too!

Fortunately, it's not too hard to add those signals back in. So let's dive in and learn what kind of problems can be introduced by React multistep forms and ways to minimize them. 

### Missing signals

Your typical screen reader software is well aware of when a page load occurs. There are many clear, baked-in signals which broadcast this: a visitor has opened a new browser window or tab, has clicked a link, or has typed in a URL and hit enter. 

These unambiguous signals do not occur during changes in "dynamic" content – when JavaScript changes the content on the screen **without** a new HTML page being requested from a backend server. To a sighted visitor, it may look like the same thing: the content on the screen changes, and so you know you're on a new page, or at least in some kind of new context. Assistive technology, however, has a hard time realizing that anything has happened. 

There are several other side effects which occur when a new page is loaded in a browser too: 

- The document [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) changes: e.g., from "The New York Times" to "Guest Essay: Why Everything is Horrible and Getting Worse".
- The "focus" of the screenreader itself changes. Screenreader focus is like keyboard focus. If you don't know what keyboard focus is, here's a great [primer on how it works](https://www.youtube.com/watch?v=EFv9ubbZLKw).
- The scroll position resets to the top of the page.

### Demonstration

This can be confusing to think about without a visual demonstration, so let's check out some videos demonstrating accessibility problems and solutions.

One of the biggest problems with SPA frameworks is keyboard and/or screen reader focus. This is a video demonstrating how focus changes between "normal" page loads using MacOS Voiceover on Safari. Because we're loading brand new static pages from a backend server, everything behaves as it should. Notice how the black Voiceover focus ring moves between elements until I click on the "Dragon Ball Z" link, which loads a new page and moves Voiceover focus back to "web content"[^1].
<div class="videoWrapper" style="--aspect-ratio: 3 / 4;">
    <iframe class="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/JtdxQbLglY8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

And here is an example of an inaccessible set of pages, where content and URL changes are 100% JavaScript driven. Notice how:

- The black Voiceover focus ring remains stuck in place after page changes. It's still visually located where the previous link was located even though the link has disappeared.
- The scroll position remains stuck at the previous scroll position (middle of the page, not the top). Even though the browser and/or the screen reader itself has helpfully moved focus to the top of the document, you wouldn't know it until you attempt to navigate around. When you do start to navigate, the page snaps jarringly upwards to where focus actually is.
- The title of the page hasn't changed, so there's no new announcement with a new page title when we click on links.

<div class="videoWrapper" style="--aspect-ratio: 3 / 4;">
<iframe class="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/mi4eOTChmFE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
### Adding the signals back in

So, in order to make a client-driven route change accessible, we need to: 

1. Scroll to the top of the new page.
2. Change the document's title so the screen reader will announce the new page.
3. Programmatically set focus to ... *something* on the new page.

Those first two pieces are fortunately pretty simple, but that last piece is trickier. As of writing, there is not one single "best practice" solution for *where* you should send focus on a route change, seeing as the default browser and screen reader behaviors can't be reproduced with JavaScript. Voiceover focuses on the outer "web content" box when the browser loads a new page, but this is outside the document, and JavaScript can't access it. 

Being thus limited to stuff within the document itself, some approaches are to:

- Focus on the document `body` tag
- Focus on the container node of the app (usually `<div id="target"></div>`)
- Focus on the topmost part of the app tree that changed (the approach of [Reach Router](https://reach.tech/router/accessibility))
- Focus on the top level heading of the page (frequently an `h1` element)
- Focus on a [skip navigation link](https://webaim.org/techniques/skipnav/) at the top of the page

All of these strategies can be found somewhere on the internet, all have their various upsides and drawbacks. You should pick one though, because the alternative isn't pretty!

Here's a video which fixes our previously inaccessible Bob Ross website. It scrolls to the top, and changes the document title after every route change. It also demonstrates two page-load focus strategies: 

- Focus on the first heading
- Focus on a skip navigation link
<div class="videoWrapper" style="--aspect-ratio: 3 / 4;">
<iframe class="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/J9oR-Zn_vHc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

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


## Next up

Next week, we'll take a look at *animations* for multistep forms. This is a small but important detail to consider for multistep forms. SPA frameworks like React enable rapid switches from one "page" to another, seeing as new pages are built dynamically in the browser. But for some visitors, these rapid transitions can lead to page transitions being missed! Animations can help to signal that transitions are occuring. 

We'll learn more next week! Until then.

## Table of contents:

This is a series of blog posts which will cover each aspect of a great multi-step form experience separately. Check back for a new post each Monday until they're all done!

- [Introduction](/multi-step-form-intro)
- [Your tech stack](/multi-step-form-tech-stack/)
- [Accessibility](/multi-step-form-accessibility) 
- Animations: coming on **8/30/21**
- Persistent state: coming on **9/6/21**
- Input validation: coming on **9/13/21**
- Putting it all together: coming on **9/20/21**

## Footnotes:

[^1]: "Web content" is like a bounding box containing the website itself. When focus is on web content, you can "enter the web content," which is like diving into the document, and restricts voiceover navigation to the website itself. Without entering the web content, Voiceover navigates between controls in the application itself, which enables you to interact with the toolbar, back and forwards buttons, URL text field, etc.

<script src="/public/js/prism.js"></script>