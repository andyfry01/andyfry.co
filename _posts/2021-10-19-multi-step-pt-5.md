---
layout: post
title: Multistep Forms in React with Awesome UX – Persistent State
permalink: /multi-step-form-persistent-state/
description: Fourth part of the multi-step forms in React guide, focusing on using browser-based storage to remember the form's state between refreshes and page loads.
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism(3).css">

The internet is a complicated place. Your average FE dev has a plethora of things they have to worry about and take into consideration: OAuth, sessions, cookies, tokens, third-party scripts and SaaS vendors of all varieties and descriptions. If you work in a big corporation, your "website" may be comprised of many different apps overseen by many different teams, with different stacks, dependency versions, deadlines, goals, and political aims. 

All these factors can impact a multi-step form. Many of them will draw visitors away from your app: either to a different app on your same domain or to a separate third-party domain . In the best case scenario, your visitor will stay within the boundaries of your own app from start til finish. The second that someone has to step out of the flow, however, things can get hairy. 

And this is to say nothing of the form itself! Many visitors will not have the patience or fortitude to complete a long form in a single sitting. Your average React app only persists its state for the duration of a window session. Once a visitor closes a window or refreshes, the state they've created will disappear. 

We need some way to save what your impatient visitors have filled out between sessions. What we need is some way to save our form contents that will survive redirects and window refreshes. What we need, is persistent frontend storage!

## Frontend storage options

Fortunately, we have many options here. I would recommend saving your state in a proper backend-powered database if you have the ability to do so. This offers the greatest flexibility and doesn't tie the data for your form to a specific computer or phone.  

Architecture can get in the way of this sometimes. Sometimes we don't have easy access to a backend database, or we want to stay 100% in the realm of the frontend. The browser itself offers many options for persisting state between window sessions:


- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies): the OG client side storage strategy for the web. Cookies have the best support across all browsers. But they are the least performant option, have a size limit of [just 4 KB](https://stackoverflow.com/questions/8706924/how-big-of-a-cookie-can-should-i-create#8706946) per cookie, and can only save strings. Unless you need to support very old browsers, I wouldn't recommend this approach.

```js
// assign cookie value
document.cookie = "Using cookies=pretty jank; path=/; SameSite=strict"; 

// read cookie value
const [key, value] = document.cookie.split("=")

console.log(`${key} is ${value}. You've got better options for browser storage.`)

// -> Using cookies is pretty jank.  You've got better options for browser storage.
```

- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API): a fully-fledged client-side transactional database which works with JavaScript objects. IndexedDB has a rich API for reading and writing data, defining custom indices and setting data schemas. The complexity of setting it up, however, may not be worth it for our context:

```js
// courtesy of https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b
var indexedDB = window.indexedDB 

// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");

    // Add some data
    store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});

    // Query the data
    var getJohn = store.get(12345);

    getJohn.onsuccess = function() {
      console.log(getJohn.result.name.first);  
      // => "John"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}
```

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): a happy medium between cookies and IndexedDB. `localStorage` unfortunately only works with string values, which means extra work for transforming between types during writes and reads. It does, however, offer a nice key/value API system, and is [well supported](https://caniuse.com/?search=localstorage) across many browsers. 

```jsx
localStorage.setItem("more-powerful-than-cookies?", "yes")
localStorage.setItem("easier-than-indexed-db?", "also yes")

localStorage.getItem("more-powerful-than-cookies?") // -> "yes"
localStorage.getItem("easier-than-indexed-db?") // -> "also yes"
```

Let's use `localStorage` to save our form state!

## Implementation

We need two things to make a `localStorage` state persistence strategy work: 

1. A way to save form state
2. A way to "hydrate" our saved form state back into our app during reloads, i.e: a way to use that previous state as the initial state of the app

### Saving form state

The `localStorage` API makes the act of saving our state easy enough: 

```js
// Our state object:
const [state, setState] = useState({name: "Andy", location: "USA"})


// An example write opration to local state. We stringify the object because localStorage only works with strings
localStorage.setItem("form-state", JSON.stringify(state))
```

The tricky part is *when* to do this. We've got a couple popular and sensible patterns to choose from: 

1. When transitioning to a new section of the form, or
2. When an [`onBlur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event occurs on a form control

I like the `onBlur` strategy personally. When a visitor "leaves" a text input, it's usually because they're finished with that part of the form and are moving onto the next part. We can hook into this event to store our form state. Here's an event handler function for doing just that: 

```js
const handleBlur = () => {
  localStorage.setItem("form-state", JSON.stringify(state));
};
```

And a fully functional demo. Whenever a visitor exits the text input, what they've entered will be persisted in `localStorage`:

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Demo = () => {
  const [state, setState] = useState({ name: "Andy" })
  const handleInput = e => {
    const { id, value } = e.target;

    setState({ ...state, [id]: value });
  };

  const handleBlur = () => {
    localStorage.setItem("form-state", JSON.stringify(state));
  };
  
  return (
    <fieldset>
      <label for="ex">What's your name?</label>
      <input id="ex"
        type="text" 
        value={state.name}
        onChange={handleInput}
        onBlur={handleBlur}></input>
    </fieldset>
  )
}

ReactDOM.render(<Demo />, document.getElementById('root'))

```

We can't retrieve that state from `localStorage` yet however, let's figure out how!

### Hydrating form state

A fresh app load is the point at which we should hydrate the app with that saved form state. In terms of the UX flow for this process, we've got some things to consider: 

1. Does this visitor even have a previous state we can use, or is this their first time here? 
2. Does the visitor *actually* want to use their previous state? Maybe they'd like to fill it out from scratch, or maybe it's a shared device with many people who need to fill out the same form.
3. If they *don't* want to use their previous state, what do we do with it? 

Knowing this, we can make a list of checks and tasks to perform on initial app load:

1. Check for any existing form state on load.
2. If there **is** a saved state, we should prompt a visitor with the option to prefill the form with their old values first before filling it into the form.
3. If they want to use it, hydrate away! 
4. If not, get rid of it.
5. If there isn't any saved state, we load the app with an empty initial state.

So let's implement through those steps!!

#### 1. Check for form state on load

In a hook-based React app, a `useEffect` call with an empty dependency array is the thing to use. [`useLayoutEffect`](https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/) however, may be a better option in some circumstances. We can read our form state from `localStorage` within the function call, and decide what to do from there: 

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");
}, []);
```

#### 2. If there is saved state, prompt the user to prefill the form

Let's use the homely `window.confirm` function for this. It's drop-dead easy to use, and 100% accessible out of the box!

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");

  if (savedState) {
     const shouldPreFill = window.confirm("Would you like to use your answers from last time?");
  }
}, []);
```

#### 3. Hydrate the saved state if they want to prefill

A `JSON.parse` and a quick `setState` function call will do just that (remember, we're saving the state object as a JSON string): 

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");

  if (savedState) {
    const shouldPreFill = window.confirm("Would you like to use your answers from last time?");

    if (shouldPreFill) {
      const nextState = JSON.parse(savedState);
      setState(nextState);
    }
  }
}, []);
```

#### 4. Delete the saved state if they don't want to prefill

Just one more `if` check to add, along with a call to `localStorage.removeItem`: 

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");

  if (savedState) {
    const shouldPreFill = window.confirm("Looks like you've filled out part of this form already, would you like to keep what you've already entered?");

    if (shouldPreFill) {
      const nextState = JSON.parse(savedState);
      setState(nextState);
    }

    if (!shouldPreFill) {
      localStorage.removeItem("form-state");
    }
  }
}, []);
```

#### 5. If there's no saved state, load with initial state

Surprise ... we've already done this! Due to the way that we've structured our if statements, none of the above will run if there isn't any saved state in `localStorage`.

## Complete example

Here's everything we've seen so far wrapped up into a fully functional example: 

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [formState, setFormState] = useState({ name: "" });

  useEffect(() => {
    const savedState = localStorage.getItem("form-state");

    if (savedState) {
      const shouldPreFill = window.confirm(
        "Looks like you've filled out part of this form already, would you like to keep what you've already entered?"
      );

      if (shouldPreFill) {
        const stateObj = JSON.parse(savedState);
        setFormState(stateObj);
      }

      if (!shouldPreFill) {
        localStorage.removeItem("form-state");
      }
    }
  }, []);

  const handleInput = e => {
    const { id, value } = e.target;

      setFormState({ ...formState, [id]: value });
  };

  const handleBlur = () => {
    localStorage.setItem("form-state", JSON.stringify(formState));
  };

  return (
    <form>
      <fieldset>
        <label for="name">What's your name?</label>
        <input type="text" 
          id="name" 
          value={formState.name} 
          onBlur={handleBlur} 
          onChange={handleInput} />
      </fieldset>
    </form>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"))
```

## Next up

Now that we know how to save entered form data for later, there's one final piece to the puzzle: the *validation* of that data: i.e., whether the form and content of that data matches with the business requirements associated with it.

This is a tricky topic, because validation is not a frontend-only concern. [Backend validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#client-side-vs-server-side-validation) must occur at some point in the process, because you can't implicitly trust anything that comes from the frontend.

This is a frontend-oriented series, so we won't get into the subject of backend validation here. 

*Frontend validation*, however, is great for UX. Nobody wants to fill out a long form only to discover that they've made mistakes in earlier stages of the process. Notifying visitors when they've made errors or omissions can make the experience faster and easier for everybody. Next week, we'll find out what to validate, how to validate, and when to validate.

Until then!

## Table of contents:

This is a series of blog posts which will cover each aspect of a great multi-step form experience separately. Check back for a new post each Monday until they're all done!

- [Introduction](/multi-step-form-intro)
- [Your tech stack](/multi-step-form-tech-stack/)
- [Accessibility](/multi-step-form-accessibility) 
- [Animations](/multi-step-form-animations/)
- [Persistent state](/multi-step-form-persistent-state/)
- Input validation: coming on **10/25/21**
- Putting it all together: coming on **11/1/21**

<script src="/public/js/prism.js"></script>