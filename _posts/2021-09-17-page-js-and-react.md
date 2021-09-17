---
layout: post
title: How to Use Vanilla JS Routers with React 
permalink: /vanilla-js-routers-with-react/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/fake-browser.css">
<link rel="stylesheet" href="/public/css/prism(3).css">
<link rel="stylesheet" href="/public/css/custom-prism-highlight.css">
<link rel="stylesheet" href="/public/css/vanilla-js-routers-with-react/img.css">

When you're working with React, before too long, the question will inevitably arise:

> "Uh ... how do I change pages with React?"

It's a silly question, isn't it? This is what the web was *built to do*, man! Add pages, link to pages, change pages when you click on aforementioned links. The URL is the foundation on which everything else is built: the axis about which the entire insane machine of internet turns. Strange to think that the framework doesn't include anything for implementing something so fundamental, isn't it? 

To find out why this is so, let's have a tiny history lesson so we can get some context.

## First, some background context

If we cast our minds back to 2010 or thereabouts, the question of how to "change pages", or link between different parts of your site was a pretty simple one: 
- put an `<a>` tag on your page with an `href` attribute pointing towards the new URL
- whip up a new page with the contents for whatever that link contains
- and maybe configure your backend server a little bit so it knows how to serve the correct page under the correct URL

And voila! The magic of the internet in concert with HTML and the browser itself would fetch the new page, render it on the screen, and you'd be on your merry way. No JavaScript or further effort necessary. 

With React and other single-page-application frameworks, things work a little differently. Your "pages", in most instances, are not individual HTML pages on a _backend server_: they are dynamically constructed chunks of HTML which are build on the _client_, or in the browser itself. 

Dynamic HTML generation isn't necessarily new in and of itself. Unless your webpage is nothing but static server-generated content, you'll probably need *some* kind of dynamic content on your website. React's innovation was to turn your entire app into dynamically generated HTML, bundled with an integrated event and state-management system to declaratively coordinate updates to that HTML. 

If you've built your entire site with nothing but React, all of the content on your site therefore consists of these dynamic chunks of JavaScript-generated HTML. This doesn't stop you from creating something that resembles a traditional "page", per se. You can add as many component "pages" as you like, each one representing a distinct area in your app. You can also add in buttons to swap these chunks of dynamic HTML in and out of the browser window. 

If you don't look too closely, this can create the appearance of different "pages" being loaded to the end user ...

... but that pesky URL bar won't change at all! 

<div id="no-url-change"></div>

## ... but that's the whole point of React!

This behavior is, ironically, exactly what React promises right on the label: the library's whole purpose is to enable you to build one single application, loaded in the browser by one single HTML file, which can dynamically generate your "pages" right then and there. This mitigates the long round-trip retrieval and content-loading times associated with fetching individual pages from a server, and gives the visitors to your site a much snappier, faster, and smoother web experience. 

And yet, if you're going to build your entire site using only React, you're going to be missing out on a lot of important functionality: 
- if a visitor refreshes the page, whatever "page" they were on, and whatever information they might have entered, will be lost. They were will be sent right back to the initial state of the application, whatever that might be
- if a visitor wants to link to a specific page, they can't: all pages will have the same static URL, and can only be accessed using whatever UI is inside the application itself

The history of the web has established these UX expectations in our minds, and so we're going to have to add this functionality back into our apps if we're going to use React to power the whole thing. 

## Enter React Router 

Fortunately, there are libraries out there which can mimic this routing behavior, and one of the most popular is [React Router](https://reactrouter.com). It enables you to add this functionality back into your app. React Router and [similar React-based libraries](https://reach.tech/router/) work by wrapping up the various bits of your app into special routing components: 

- Each distinct page of your app goes into a `Route` component
- These routes, in turn, get wrapped up into a `Switch` component
- Your entire app (or at least the portion that contains your pages) goes into a `Router` component
- The links between pages get wrapped up in a special `Link` component

```jsx
import { React, ReactDOM } from 'https://unpkg.com/es-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "https://unpkg.com/react-router/umd/react-router.min.js"
import htm from 'https://unpkg.com/htm?module'

const html = htm.bind(React.createElement)

const Example = () => {
  return html`
    <div>
      <nav>
        <Link to="/page-one">Go To Page One</Link>
        <Link to="/page-two">Go To Page Two</Link>
      </nav>

      <Router>
        <Switch>
          <Route path="/page-one">
            <PageOne />
          </Route>
          <Route path="/page-two">
            <PageOne />
          </Route>
        </Switch>
      </Router>
    </div>
  `
}

ReactDOM.render(html`<${Example} />`, document.getElementById('app-root')
```

And voila! You've got an app that can link between pages, reload, and access pages via a URL entered straight into the URL bar: 

<div id="routing-change-demo"></div>

## ... so why not just use React Router?  

Frontend routing isn't a React-only problem, there are a lot of other "vanilla-JS" or platform-agnostic routers out there which can implement routing functionality without being dependent on a specific view library like React: 

- [Vaadin Router](https://github.com/vaadin/router),
- [Navigo](https://github.com/krasimir/navigo),
- and [Page.js](https://github.com/visionmedia/page.js), which we'll be featuring in the rest of this post


So why would you use one of these over React Router?

### Reasons to use React Router
1. It's very ubiquitous: you'll find a lot of code examples, blog posts, and tutorials that feature React Router. 
2. It offers accessible routing out of the box. You can be assured that your app won't suffer from the major problems associated with [multi-route SPA accessibility](/multi-step-form-accessibility/) (although these features are not all that difficult to add back in).
3. It is 100% React, which makes it easier to use if you don't have a firm grasp on how to mix vanilla JS techniques with React techniques.

### Reasons to use a platform-agnostic router
1. React Router conceals most of its logic within the library components themselves. These kind of "magical" libraries can be very useful in many cases. When functionality is wrapped up in a React component, it's more liable to be [declarative](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2), which makes working with components easier. But the magic comes at a cost: if you have to implement an unconventional or custom feature, then you're gonna have a hard time.
2. If you ever want to switch libraries (like from React to Vue), then you can take most of your existing routing logic with you without having to refactor to a new library or framework.
3. Libraries like Page.js have some features that React Router doesn't have. Lots of routing libraries have a concept of "enter" and "exit" callbacks, which give you the opportunity to run setup and teardown code when you visit and leave a particular route. Page.js [has these callbacks built in](https://visionmedia.github.io/page.js/#pageexitpath-callback-callback-), but to achieve the same effect in React Router, you have to build it into your [components themselves](https://reactrouter.com/web/example/preventing-transitions), which (arguably) blurs the separation of concerns between the router and the routes themselves, and makes your components more complicated and tricky to refactor.
4. Many of these libraries are smaller than React Router. Minified and gzipped, Page.js comes out to [3.9 KB of code](https://cost-of-modules.herokuapp.com/result?p=page@1.11.6), whereas react-router-dom comes out to [9.5 KB](https://cost-of-modules.herokuapp.com/result?p=react-router-dom@5.3.0). A pretty negligible amount, but if you don't have much wiggle room with the size or your app, then an alternative like Page.js is the clear winner. 

So! If these pros sound appealing to you, then let's learn how to write a React app which uses Page.js.

## Required background knowledge

Before we dive in, here are some pre-reqs that you'll want to familiarize yourself with in order to understand this tutorial. We won't be diving too deep into any of this – a basic orientation is all that is required: 
- The [Hooks API](https://reactjs.org/docs/hooks-intro.html)
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

const html = htm.bind(React.createElement)

const App = () => {
    return html`
        <div>
          <p>Look ma! No node_modules!</p>
        </div>
    `
}

ReactDOM.render(App(), document.getElementById('app-root'))
```

And would you look at that, frontend code produced with nothing but browser-based tools: 

<div id="app-initial-setup"></div>

## Import page.js, initialize the router, set a base URL

Now that we've got a bare-bones app setup, let's import Page.js and get it running. `useEffect` comes into play here: we only want to initialize the router once, so we'll make our initial call to the `page` function there. 

I'll also be setting the base URL to `/#` here. This is to prevent our backend server from returning 404s when we link between different pages or perform reloads. If you have easy access to your backend server and can define appropriate handlers for every frontend route, then you can omit this step. This [Stack Overflow answer](https://stackoverflow.com/a/51975988) has more info if you'd like to dive deeper into why we need to do this. 


```jsx
import { React, useEffect, ReactDOM } from 'https://unpkg.com/es-react'
import htm from 'https://unpkg.com/htm?module'
import page from 'https://unpkg.com/page@1.11.6/page.mjs'

const html = htm.bind(React.createElement)

const App = () => {
  useEffect(() => {
    page.base("/#")
    page()
  }, [])

  return html`
    <div>
      <p>Look ma! No node_modules!</p>
    </div>
  `
}

ReactDOM.render(App(), document.getElementById('app-root')
```


## Defining our routes

So, first up: let's define our routes. According to the docs, it's a matter of calling [the `page` function](https://visionmedia.github.io/page.js/#pagepath-callback-callback-) with two things: 

1. The name of our desired route
2. A callback to fire when we hit that route

Let's add some route definitions, and use some silly stub functions to show that they actually do something when you hit each route:

```jsx
import { React, useEffect, ReactDOM } from 'https://unpkg.com/es-react'
import htm from 'https://unpkg.com/htm?module'
import page from 'https://unpkg.com/page@1.11.6/page.mjs'

const html = htm.bind(React.createElement)

const App = () => {
  const [pokedexVideoId, setPokedexVideoId] = useState("oyhQQIeU-JY")

  page("/charmander", () => setPokedexVideoId("oyhQQIeU-JY"))
  page("/snorlax", () => setPokedexVideoId("GXNc8QDH-Dc"))
  page("/bulbasaur", () => setPokedexVideoId("F_-x2ErAtsA"))

  useEffect(() => {
    page.base("/#")
    page()
  }, [])

  return html`
    <div>
      <nav>
        <h1>Pokedex Browser</h1>
        <a href="/charmander">Charmander</a>
        <a href="/snorlax">Snorlax</a>
        <a href="/bulbasaur">Bulbasaur</a>
      </nav>
      
      <iframe src="https://www.youtube.com/embed/${pokedexVideoId}"></iframe>
    </div>
  `
}

ReactDOM.render(html`<${App} />`, document.getElementById('app-root')
```

<div id="pokedex-demo"></div>


## Interlude: freedom of movement

That last example was kind of interesting, right? One of the things that distinguishes Page.js from React Router is that you're able to directly define the callback that's fired when a route changes. 

Compared to React Router, this gives you a much greater degree of control over what happens when a route changes. React Router is deeply hooked into React API and ethos: the API practically demands that you render a component and nothing but a component on a route change. From the [React Router docs](https://reactrouter.com/web/example/basic):

```jsx
import { React, useEffect, ReactDOM } from 'https://unpkg.com/es-react'
import { Router, Route, Switch } from "https://unpkg.com/react-router/umd/react-router.min.js"
import htm from 'https://unpkg.com/htm?module'

const html = htm.bind(React.createElement)

const Example = () => {
  return html`
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  `
}

ReactDOM.render(html`<${Example} />`, document.getElementById('app-root')
```

When Page.js detects a route change, however, you can do ... *anything*. You could do something as big as swapping out the topmost component being rendered by your app, or something as small as changing the video ID on an embedded YouTube iframe. The choice is yours, depending on the size of the problem you're trying to solve. 

Speaking of swapping out components on route changes, let's get back to the task at hand:

## Rendering our views

It's just a small leap from here if we want to change *pages* (or components) instead of switching YouTube video IDs around. We can use the exact same concept – tracking a video ID in state, and switching the video ID on route change – and apply it instead to components. 

This time, we'll make a set of page components, wrap them up in an object for ease of organization, and render them conditionally based on state: 

```jsx
import { React, useEffect, ReactDOM } from 'https://unpkg.com/es-react'
import htm from 'https://unpkg.com/htm?module'
import page from 'https://unpkg.com/page@1.11.6/page.mjs'

const html = htm.bind(React.createElement)

const Charmander = () => {
  return html`
    <div>
      <h1>Charmander's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/oyhQQIeU-JY"></iframe>
    </div>
  `
}

const Bulbasaur = () => {
  return html`
    <div>
      <h1>Bulbasaur's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/GXNc8QDH-Dc"></iframe>
    </div>
  `
}

const Snorlax = () => {
  return html`
    <div>
      <h1>Snorlax's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/F_-x2ErAtsA"></iframe>
    </div>
  `
}

const routes = {
  charmander: Charmander,
  snorlax: Snorlax,
  bulbasaur: Bulbasaur 
}

const App = () => {
  const [route, setRoute] = useState("charmander")

  page("/charmander", () => setRoute("charmander"))
  page("/snorlax", () => setRoute("snorlax"))
  page("/bulbasaur", () => setRoute("bulbasaur"))

  useEffect(() => {
    page.base("/#")
    page()
  }, [])

  return html`
      <div>
        <nav>
          <h1>Pokedex Browser</h1>
          <a href="/charmander">Charmander</a>
          <a href="/snorlax">Snorlax</a>
          <a href="/bulbasaur">Bulbasaur</a>
        </nav>

        <${routes[route]} />
      </div>
  `
}

ReactDOM.render(html`<${App} />`, document.getElementById('app-root')
```

<div id="pokedex-route-change"></div>

## Accessibility

The final piece of this is [accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/). 

The great thing about backend-driven websites is that they are pretty much accessible out of the box. Assistive technology knows how to detect page changes and announce them properly to users of this technology. 

With 100% frontend-driven sites and apps, we need to give assistive technology a few additional hints in order for everything to function properly. In short, this consists of three things: 

1. Scrolling to the top of the new page on route change.
2. Changing the document’s title so the screen reader will announce the new page.
3. Programmatically resetting focus to something on the new page.

Those first two are pretty straightforward, although the last one is a [tricky issue](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/) which doesn't have a universally agreed upon best practice just yet. In this example, I'm going to go with focusing on the first heading of the new page. I've written a [whole blog post](/multi-step-form-accessibility/) on the topic if you'd like to dive deeper!

Here is the vanilla JS code for each of those tasks: 
```js
// 1. Scroll to the top of the page
const scrollTop = () => window.scrollTo({x: 0})

// 2. Change the title of the page
const changeTitle = title => document.title = title

// 3. Set focus on an element with a `focus-target` ID, with a little bit of extra code to ensure cross-browser compatibility 
const setFocus = () => {
    setTimeout(() => {
        const focusTarget = document.getElementById("focus-target")
        focusTarget.setAttribute('tabindex', '-1')
        focusTarget.focus()
        focusTarget.removeAttribute('tabindex')
    }, 0)
}
```

And here's everything integrated into our Pokedex example: 

```jsx
import { React, useEffect, ReactDOM } from 'https://unpkg.com/es-react'
import htm from 'https://unpkg.com/htm?module'
import page from 'https://unpkg.com/page@1.11.6/page.mjs'

const html = htm.bind(React.createElement)

const Charmander = () => {
  return html`
    <div>
      <h1 id="focus-target">Charmander's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/oyhQQIeU-JY"></iframe>
    </div>
  `
}

const Bulbasaur = () => {
  return html`
    <div>
      <h1 id="focus-target">Bulbasaur's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/GXNc8QDH-Dc"></iframe>
    </div>
  `
}

const Snorlax = () => {
  return html`
    <div>
      <h1 id="focus-target">Snorlax's Pokedex Entry</h1>
      <iframe src="https://www.youtube.com/embed/F_-x2ErAtsA"></iframe>
    </div>
  `
}

const routes = {
  charmander: Charmander,
  snorlax: Snorlax,
  bulbasaur: Bulbasaur
}

const scrollTop = () => window.scrollTo({x: 0})
const changeTitle = title => document.title = title
const setFocus = () => {
    setTimeout(() => {
        const focusTarget = document.getElementById("focus-target")
        focusTarget.setAttribute('tabindex', '-1')
        focusTarget.focus()
        focusTarget.removeAttribute('tabindex')
    }, 0)
}

const App = () => {
  const [route, setRoute] = useState("charmander")

  const changeRoute = routeName => {
    setRoute(routeName)
    scrollTop()
    changeTitle(`Pokedex entry for ${routeName}`)
    setFocus()
  }

  page("/charmander", () => setRoute("charmander"))
  page("/snorlax", () => setRoute("snorlax"))
  page("/bulbasaur", () => setRoute("bulbasaur"))

  useEffect(() => {
    page.base("/#")
    page()
  }, [])

  return html`
      <div>
        <nav>
          <h1>Pokedex Browser</h1>
          <a href="/charmander">Charmander</a>
          <a href="/snorlax">Snorlax</a>
          <a href="/bulbasaur">Bulbasaur</a>
        </nav>

        <${routes[route]} />
      </div>
  `
}

ReactDOM.render(html`<${App} />`, document.getElementById('app-root')
```

I've added some focus ring styles so the focus change is nice and obvious to see: 

<div id="pokedex-accessible-route-change"></div>

## And that's it!

With accessibility taken care of, we've got a fully functioning, accessible, routable, linkable React application. Go forth and build what you will!

If you've got a comment, see an error in any of the demo code, or have a question, post a comment down below, or [get in touch](/about). I'd love to hear from you :) 

\- Andy

<script src="/public/js/prism(3).js"></script>
<script type="module" src="/public/preact-apps/vanilla-js-routers-with-react/app.mjs"></script>



