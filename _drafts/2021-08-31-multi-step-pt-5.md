---
layout: post
title: Multistep Forms in React with Awesome UX – Persistent State
permalink: /multi-step-form-persistent-state/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism.css">

The internet is a complicated place. Your average FE dev has a plethora of things they have to worry about and take into consideration: OAuth, sessions, cookies, tokens, third-party scripts and SaaS vendors of all varieties and descriptions. If you work in a big corporation, your "website" may be comprised of many different apps overseen by many different teams, with different stacks, dependency versions, deadlines, goals, and political aims. 

All of these factors can impact a multi-step form, and many of them will draw visitors away from your app: either to a different app on your same domain or to a separate third-party domain entirely. The [happy path](https://en.wikipedia.org/wiki/Happy_path) of your form will hopefully see the visitor staying within the boundaries of your own app from start til finish, but the second that someone has to step out of the flow, things can get hairy. 

This is to say nothing of the form itself. If you've got a particularly long set of steps, many visitors will not have the patience or fortitude to complete them in a single sitting. Your average React app only persists its state for the duration of a window session. Once a visitor closes a window or refreshes, the state they've created will disappear. 

We need some way to save what the impatient or time-strapped visitor has filled out so they don't have to start over from scratch when they come back. 

Fortunately, we have many options here! And you don't even need a backend server to store your state either. If you do have one, I would probably recommend saving it in a proper database. This offers maximum flexibility and doesn't tie the data for your form to a specific computer or phone.  

But if you don't have easy access to a backend database, the browser itself offers many options for persisting state between window sessions:

- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies): the OG client side storage strategy for the web. Cookies have the best support across all browsers, but they are the least performant option, have a size limit of [just 4 KB](https://stackoverflow.com/questions/8706924/how-big-of-a-cookie-can-should-i-create#8706946) per cookie, and can only save strings. Unless you need to support very old browsers, I wouldn't recommend this approach.
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), a fully-fledged client-side transactional database which works with JavaScript objects. This offers you a lot of API options for reading, writing, and updating data, but unless you have a particularly complicated app, it may be overkill. 
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), a happy medium between cookies and IndexedDB. It unfortunately only works with string values, which means extra work for transforming between types during writes and reads (what do you mean `1 + "1" = "11"`??), but it does offer a nice key/value API system, and is [well supported](https://caniuse.com/?search=localstorage) across many browsers. 

Let's use `localStorage` to save our form state!

### Strategy

We need two things to make a `localStorage` state persistence strategy work: 

1. A way to save form state
2. A way to "hydrate" our saved form state back into our app when it is reloaded, i.e: us a way to use that previous state as the initial state of the app

#### Saving form state

The `localStorage` API makes the act of saving our state easy enough: 

```js
// Our state object:
const [state, setState] = useState({name: "Andy", location: "USA"})

// A call to setItem 
// We stringify the object because localStorage only works with strings
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

#### Hydrating form state

A fresh app load is the point at which we should hydrate the app with that saved form state. In terms of the UX flow for this process, we've got some things to consider: 

1. Does this visitor even have a previous state we can use, or is this their first time here? 
2. Does the visitor *actually* want to use their previous state? Maybe they'd like to fill it out from scratch because the information has changed since they started, or maybe it's a shared device with multiple people who need to fill out the same form.
3. If they *don't* want to use their previous state, what do we do with it? 

Knowing this, we can make a list of checks and tasks to perform on initial app load:

1. Check for any existing form state on load.
2. If there **is** a saved state, we should prompt a visitor with the option to prefill the form with their old values first before filling it into the form.
3. If they want to use it, hydrate away! 
4. If not, get rid of it.
5. If there isn't any saved state, we load the app with an empty initial state.

So let's implement through those steps!

##### Check for form state on load

In a hook-based React app, a `useEffect` call with an empty dependency array is the thing to use (although [`useLayoutEffect`](https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/) may be a better option in some circumstances). We can read our form state from `localStorage` within the function call, and decide what to do from there: 

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");

  if (savedState) {
    // do something
  }
}, []);
```

##### If there is saved state, prompt the user to prefill the form

Let's use the homely `window.confirm` function for this. It's drop-dead easy to implement, and 100% accessible out of the box!

```js
useEffect(() => {
  const savedState = localStorage.getItem("form-state");

  if (savedState) {
     const shouldPreFill = window.confirm("Would you like to use your answers from last time?");
  }
}, []);
```

##### Hydrate the saved state if they want to prefill

A `JSON.parse` and a quick `setState` function call will do just that (remember, we're saving the state object as a JSON string): 

```js
useEffect(() => {
	const savedState = localStorage.getItem("form-state");
  
  if (savedState) {
    const shouldPreFill = window.confirm("Would you like to use your answers from last time?");
      
    if (shouldPreFill) {
      const stateObj = JSON.parse(savedState);
			setState(stateObj);
		}
	}
}, []);
```

##### Delete the saved state if they don't want to prefill

Just one more `if` check to add, along with a call to `localStorage.removeItem`: 

```js
useEffect(() => {
	const savedState = localStorage.getItem("form-state");
  
  if (savedState) {
  	const shouldPreFill = window.confirm("Looks like you've filled out part of this form already, would you like to keep what you've already entered?");
      
		if (shouldPreFill) {
      const stateObj = JSON.parse(savedState);
			setState(stateObj);
		}
		
		if (!shouldPreFill) {
			localStorage.removeItem("form-state");
		}
	}
}, []);
```

##### If there's no saved state, load with initial state

Surprise ... we've already done this! Because all of our functionality is wrapped up in that first `if (savedState)` check, none of the above will run if there isn't any saved state in `localStorage`. 

### Complete example

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

<script src="/public/js/prism.js"></script>