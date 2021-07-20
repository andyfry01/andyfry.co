

# Functional Functional React

## 

Now that the hooks API has been out for a couple months and I've gotten a chance to use hooks in my day-to-day job, it's really started to warp and transform my conception of the React component itself. 

Over the years I've tried to limit myself to functional stateless components where I can. But inevitably, the main functionality of any React app is going to be a stateful class component or a state management library like MobX or Redux. These parts of your app are therefore going to be where you spend a lot of your development time and thought. But now that you can have state WITHIN a functional component, I've written nothing but functions for weeks now.  

Maybe it was staring at functions all day instead of classes that did it, maybe learning the new API shifted around some grey matter in an opportune kind of way, but whatever the cause: I practically had a mini-stroke the other day. One of those "Handel seeing the face of God" moments where all of the the sweet sugary JSX was stripped away, and I saw React components for what they really are: not components, but functions! Plain old ordinary functions with a little sprinkling of magic courtesy of the framework. 

It's kind of a stupid epiphany isn't it? Of course they were functions this whole time. What else could they be? But when you *understand* that a component is a function. When you realize that you can *call* a component like you would any function, it opens up an exciting alternate universe full of wacky and strange possibilities. React is a very functional framework to begin with, but once you sacrifice a little bit of the JSX syntax to the gods of FP, it rocks the foundations of your world. 

[Higher order components](https://reactjs.org/docs/higher-order-components.html) – an early method of advanced component composition that has since fallen out of style – become instantly more attractive, and even _easy_ to implement. The very idea of a prop transforms from this esoteric thing with a funny syntax to a plain old function argument. The Context API seems suddenly quaint and limiting when faced with the prospect of sharing state between components via a closure instead. 

I'm calling this concept "Functional Functional React" in my head. Using some of the foundational concepts of functional programming along with functional React components, you can achieve some awesome results with very few lines of code, at the expense of the familiarity and comfort of the typical JSX-oriented approach to writing (and most significantly: _composing_) React components. 

I'm not going to say that this is the best way to write a React app. I make no claims about it being easier or more intuitive or at all preferable to the "traditional" methods, which are numerous and well documented. However, it is *different*, and I think there's real value to seeing things differently. 

Who knows! Maybe you won't adopt this technique fully, but you might find some of it appealing enough to incorporate into a traditional React app. At the very least, I want to pull back the curtain on the React framework a little bit and demystify the all-powerful Component, that we might all better understand what's really going on in our applications. 

## Part one: React component composition

Stop me if you've heard this one before: "React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components." The bedrock, foundational concept of React is composition. Instead of making monolithic classes with generic methods and inheriting from these classes, you're encouraged to think of components as lego blocks: if you need new functionality, combine existing components/lego blocks together to achieve the desired result. 

Implemented well, the elements of your app become these atom-like particles: tiny, simple, purpose-built units of code that can be combined together to form bigger "molecules," which can be combined together with yet *more* molecules, so on and so forth. 

It's the Golden Dream of programming! Orderly stacks of Legos instead of dread-inducing piles of spaghetti. 

But of course, it's much easier to muse about the Golden Dream than to actually realize it in the real world. What does composition look like in practice? Maybe we can start with what composition ISN'T and then work backwards from there. Say we want to build a shopping list, and we need to have both ordered and unordered lists. Here's an implementation:  

```jsx
import React from "react";
import ReactDOM from 'react-dom';

const things = ["Milk", "Eggs", "Cheese"];

const UnorderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ul>{listItems}</ul>;
};

const OrderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ol>{listItems}</ol>;
};

const NotCompositionExample = () => {
  return (
    <>
      <UnorderedList items={things} />
      <OrderedList items={things} />
    </>
  );
};

ReactDOM.render(<NotCompositionExample />, document.getElementById('root'));
```

It does what we need it to do. If I never had to touch this code again in my whole life, I'd call it done. But things could get sticky fast if you have to maintain or update this in the long-term.

I can see two problems that affect maintainability: duplicated code, and unneccessary wrapper code. 

### Duplicated code
There's duplicated code for building the lists for instance, which doubles the overhead maintenance. Say we wanted to make all of the list items bold, or add checkboxes to them. We'd have to do that in two places, both `UnorderedList` and `OrderedList`. 

Not only that, but we have two separate components just for the different list types, when they only differ in the type of list they render. 

Composing components together allows you to avoid these kinds of patterns. We'll refactor this code later to show you exactly how a compositional approach can improve things, but let's look at the next problem first:

### Unneccessary wrapper code
Remember what I said earlier? React components are "plain old ordinary functions." That applies not *just* to the components *we* write ...

```jsx
// This:
const DivGrimace = () => <div>😬</div>
// Is actually this:
const DivGrimace = () => React.createElement("div", null, "😬")
```

.. but ALSO to the *baked in components* that we use via JSX. They look like their HTML equivalents, but *they* are functions too! [^1]

```jsx
// This: 
<ol>
  <li>World's shortest Todo list</li>
</ol>

// Becomes this: 
React.createElement("ol", 
                    null, 
                    React.createElement("li", 
                                        null, 
                                        "World's shortest Todo list"))

// ... Imagine writing a whole app like that.
```

So why wrap the "`ol` function," whose sole purpose is to add an `ol` element to the DOM, with another function at all [^2]? We don't cook with the papery exterior of an onion do we? What we're really interested in is what's *inside*.

## What's really the issue?

Those problems of duplication and wrapper code all revolve around the idea of things being locked away. The concept of "what's inside" lies at the heart of composing components together. 

What should be inside a component? What should be outside a component? And how do we take the innards out in a way that leaves us less confused and more flexible? That last question is the most important in my opinion. A good programming technique makes your code more accessible and easier to work with. 

First, let's have a look at just one of those components from the previous example: 

```jsx
const OrderedList = props => {
  const listItems = props.items.map(listItem => <li>{listItem}</li>);

  return <ol>{listItems}</ol>;
};
```

If you look closely, you can see that almost the entire implementation for this list is locked away inside the component. All the little pieces that come together to make this thing are enclosed within `OrderedList`'s shiny braces. The list type, the map function which produces the list items, even the *name* that you have to give to the list: `props.items`. This component does absolutely everything for you. The only part of the equation that it *can't* know beforehand is the list: you supply that yourself. As a consequence, that's the only part of the equation that *you can control*. 

Or better stated: it's the only part that you can control without altering the `OrderedList` component itself. 

### The problem with boxes

You can think of these kinds of components like magic boxes. Or maybe they're like a perfectly good iPhone with an old battery. Or an overbearing coworker. Magic boxes, magic consumer products, and micromanagers are huge bottlenecks to progress. Every time you need to get something done, and especially that something is small, you're forced to put in an outsized amount of effort to just get the thing did.

What's in that magic box? No way to tell from the outside, you have to open it up to see. 

Want to swap out the battery in the iPhone? Good chance you're gonna break the phone by prying open the glued-shut casing. 

Need to make a powerpoint for the presentation tomorrow? Well, toss it on the pile and put your feet up, your coworker has to do absolutely everything themselves and won't delegate anything to you. 

## Unlock the box

So! How do we free the contents of the box? How do we use composition to make these brittle, single-use components more flexible and easier to change from the outside? How about like this: 

```jsx
import React from "react";
import ReactDOM from 'react-dom';

const things = ["Milk", "Eggs", "Cheese"];

// xs, as in: "multiple things called X"
const aListOf = xs => xs.map(x => <li>{x}</li>);

const CompositionExample = () => {
  return (
    <>
      <ol>{aListOf(things)}</ol>
      <ul>{aListOf(things)}</ul>
    </>
  );
};

ReactDOM.render(<CompositionExample />, document.getElementById('root'));
```

Let's look at each piece of this individually: 

The first thing is to take the list builder function outside of the container. You don't need the implementation to be locked away inside the magic box, you can just as well build it on the outside and pass it in as a prop to `<ul>` or `<ol>`[^3]:

```jsx
const aListOf = xs => xs.map(x => <li>{x}</li>);
```

On top of  that, we've removed the wrapper function entirely. Instead of enclosing the concept of a `ul` or an `ol` in an unneeded container, why not just use the pre-built function you've got already?

```jsx
<ol>{aListOf(things)}</ol>
```

Much better! We have less code in general, and what remains is:

- **more flexible**: if you need to make changes, you can work on each instance of a list individually instead of mucking around in some big übercomponent.
- **more essential**: the code is a closer, plainer description of the problem being solved. You don't need to peel away layers of code to get to the heart of the thing. It's all plainly visible from the outside.

It all gives more room to breathe. And we're gonna need the room too: now we need some of the lists to contain links. This requires a hairy, monolithic change in the first version of our code:

```jsx
import React from "react";
import ReactDOM from 'react-dom';

// The list is now a list of objects with "text" and "link" properties. 
const things = [
	{text: "Milk", link: "www.milk.com"}, 
	{text: "Eggs", link: "www.eggs.com"}, 
	{text: "Cheese", link: "www.cheese.com"}];

const UnorderedList = props => {
  // We need two things here: a prop which turns on our new link feature, and conditional logic for rendering a list with and without links. 
  // It's a small thing now, but after a few rounds of this kind of customization and tweaking, you'll end up with some seriously hairy code
  const listItems = props.hasLinks 
    ? props.items.map(listItem => <li>{listItem}</li>)
    : props.items.map(listItem => <li><a href={listItem.link}>{listItem.text}</a></li>);

  return <ul>{listItems}</ul>;
};

const OrderedList = props => {
  // Not only that, but we have to double up the code between two different components! It's the exact same stuff!
  const listItems = props.hasLinks 
    ? props.items.map(listItem => <li>{listItem}</li>)
    : props.items.map(listItem => <li><a href={listItem.link}>{listItem.text}</a></li>);

  return <ol>{listItems}</ol>;
};

const NotCompositionExample = () => {
  return (
    <>
      <UnorderedList items={things} hasLinks={true} />
      <OrderedList items={things} />
    </>
  );
};

ReactDOM.render(<NotCompositionExample />, document.getElementById('root'));
```

By contrast, we need just one tiny compositional touch to solve the task with our new code:

```jsx
import React from "react";
import ReactDOM from 'react-dom';

// Same as before, the list is now a list of objects with "text" and "link" properties
const things = [
	{text: "Milk", link: "www.milk.com"}, 
	{text: "Eggs", link: "www.eggs.com"}, 
	{text: "Cheese", link: "www.cheese.com"}];

// Our old list-maker function from before
const aListOf = xs => xs.map(x => <li>{x}</li>);
                             
// One new function, which wraps our list items in an anchor tag first!
const linksOf = xs => xs.map(x => <a href={x.link}>{x.text}</a>);

const CompositionExample = () => {
  // Most significantly: we didn't need to add any new props to anything. No new concepts to fit into our heads, no ever-expanding list of props, no duplication. Just a single new function call.
  const itemsWithLinks = aListOf(linksOf(things));
  const normalItems = aListOf(things);

  return (
    <>
      <ol>{itemsWithLinks}</ol>
      <ol>{normalItems}</ol>
    </>
  );
};

ReactDOM.render(<CompositionExample />, document.getElementById('root'));
```

Pretty cool right? The same thing with less work and more control from the outside. I'd call that a big win!

## In summary

This article touched on code composition from the perspective of React. React has the model of component composition at its core, and the things that those compositions produce – DOM elements – are easy to relate to. We're not producing esoteric things like objects or arrays[^2]; we're producing links and lists and images. You can inspect it with the browser. What your code produces is (usually) visual and plain to see, and that makes it very relatable.

The easiest way to add composition techniques to a component is taking what's on the inside and putting it on the outside. Code that's locked away on the inside of a component is hard to change from the outside, and creates friction when requirements change. Code that's "built" or "assembled" on the outside, on the other hand, is easier to customize after the fact. This makes your code more robust, easier to maintain, and easier to understand. 

But there's more to life than React and the DOM! How do we apply these techniques to vanilla JavaScript? Not only that, but I didn't _really_ show you every facet of the composition diamond either. There's more to it than "take stuff from the inside and put it on the outside," and it can solve different kinds of problems than the ones we've seen in the examples we've seen so far. 

In the next article, we'll focus on code composition with vanilla JavaScript, and we'll get a little closer to the heart of what composition is. If you understood how to do composition in a React context, but haven't tried it for non-React code, then you'll be pleasantly surprised at how much easier this makes your vanilla JS programming! 

Even if you didn't grok everything fully, that's ok. Seeing things from many different angles makes it easier to form connections between concepts and bridge the gap to new understanding. Maybe the above examples will become more clear to you after we explore the fundamentals more closely in the following article. 

And hey, even if you already know this stuff backwards and forwards, you might still learn something new :) 

See you then!



[^1]: Haven't seen React.createElement before? Check out the [React documentation](https://reactjs.org/docs/react-without-jsx.html) for a nice explanation of what it is 👍
[^2]: This concept is known as "layers of indirection" if you'd like to read more about it: https://lispcast.com/is-your-layer-of-indirection-actually-useful/
[^2]: I know, I know, that actually _is_ what we're building. Indulge me in the argument for a moment.
[^3]: For more on that idea, I will direct you to this wonderful MIT lecture series from Bartozs Milewski https://youtu.be/I8LbkfSSR58?t=1280
[^3]: Remember: anything passed within the braces of JSX is passed as `props.children`
[^4]: Cf. this wonderful video on the pure world of math vs. the fuzzy, wiggly world in which we actually live: https://www.youtube.com/watch?v=_ADi5JlFf1E
[^5]: Well, if you really wanted to split hairs, you could say that some of these strategies are a form of function composition, but I don't think most functional programmers would agree.

