What does a composed version of this look like? 

```js
const add = x => y => x + y;
const addTenTo = add(10);

addTenTo(5);  // -> 15
```

Don't freak out if this doesn't make a lot of sense: it is pretty weird and uncomfortable at first blush. All those fat arrows one after the other made me break out in hives the first time I saw them.

What's happening is that we've written a function which takes a value, returns a function, to which we can pass another value, which will THEN return our final computed value.

Confused yet? Feeling the burden of the New pressing down your fragile human brain? Relax! You really do understand this already if you made it this far. It may come as some surprise, but this is exactly what's going on when you pass a child to a React component. The only difference is that the composition is wrapped up in an API: 

```jsx
import React from "react";

const Calculator = props => {
  return <div>{props.number + props.children}</div>;
};

const Demo = props => {
  const AddTen = <Calculator number={10}>{props.numbers[0]}</Calculator>
  const AddTwenty = <Calculator number={20}>{props.numbers[1]}</Calculator>

  return (
    <div>
      {AddTen}
      {AddTwenty}
    </div>
  )
}

const Example = () => {
  const numbers = [10, 20]

  return <Demo numbers={numbers} />
};
```

It may not look like it, but this is a massive, earth-shatteringly powerful concept. I guarantee you will not write code the same way ever again once you grasp it: function composition is just too useful to ignore once you see the light. What composition has allowed us to do here is nail down the factors that we DO know ahead of time (the numbers 10 and 20 in our calculator example above), and hold them in waiting until the numbers that we DON'T know arrive. A simple but incredibly powerful concept. 

I could spend paragraphs waxing philosophical on topics like partial application and point-free composition and functors, but there are a lot of fantastic resources out there to show you the hows and whys of function composition, and they're going to do a better job of explaining the fundamentals than I will. Two of my favorites are [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch04.html) and [FunFunFunction](https://www.youtube.com/watch?v=iZLP4qOwY8I). I'd recommend that you check either of them out (or even both!).

## Part three: piping and mapping

We're getting close to Functional Functional React components, I swear! There's one more thing to cover first: piping. Piping is a method of function composition that treats functions as though they were steps in a list, or workers on an assembly line. 

If you've worked with jQuery before, you recognize the pattern already: 

```js
$(document).ready(function() {
  $('body')
    .css('background-color', 'red')
    .css('height', '500px')
    .css('width', '500px')
    .addClass('big-red-box')
})
```

The main idea is that we grab the body element, perform changes, and put it back on the screen. One step after the other in an unbroken chain. Each of those jQuery methods (`$.css`, `$.addClass`) takes the selected DOM element, operates on it, and passes on the transformed element to the next function. The very cool (and underappreciated) thing that jQuery achieves with this API is flexibility and interoperability. We could have done any of those steps in any order with the same result, and we can even add steps in between: 

```js
$(document).ready(function() {
  $('body')
    .css('height', '500px')
    .addClass('rotated-red-box')
    .css('transform','rotate(45deg)')
    .css('width', '500px')
    .css('background-color', 'red')
})
```

Function piping works the exact same way, just with a different syntax. Let's grab Ramda's `pipe` function and see what this looks like: 

```js
const ramda = require('ramda');
const { pipe } = ramda;

const add = x => y => x + y
const add10To = add(10)

const makeBigNumber = pipe(
  num => add10To(num),
  num => add10To(num),
  num => add10To(num)
);

console.log(makeBigNumber(5)); // -> 35
```

We could even apply it to our previous jQuery example: 

```js
$(document).ready(function() {
  const makeBigRedBoxFrom = pipe(
   element => element.css('background-color', 'red'),
   element => element.css('height', '500px'),
   element => element.css('width', '500px'),
   element => element.addClass('big-red-box')
  )

  makeBigRedBoxFrom($('body'))
})
```

Again, massively powerful tool! A utility like `pipe` (or its nerdier twin sister, `compose`) not only gives us the ability to perform these chained function calls, it also acts as a kind of mental portal into a functional universe. If you stick your head far enough inside, and take a few heaving breaths, you acquire the mindset to code in a pipeline-oriented style, which is almost more important. Using a tool adapts your mind to the tool as much as it enables you to build, so it is important to use a tool that is "good to think with" to paraphrase Claude Lévi-Strauss. 

If you're interested in going into pipelines in more depth, Christopher Okhravi does a fantastic job [in this video](https://www.youtube.com/watch?v=myGSs8lu62M). As of the time of writing, it is also under consideration to be included as a built in language feature of [Javascript](https://github.com/tc39/proposal-pipeline-operator), and IS a built in language feature in languages like [F#](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/functions/#function-composition-and-pipelining).

So, what does this have to do with React? When you render a component tree, what you're really doing is a chained function call. One that can go dozens or hundreds of function calls deep depending on the structure of your app. 

How many levels of function calls happen in the following app? 

```jsx
const neatThings = ['solar power', 'self-driving cars', 'rocket ships']

const Body = () => {
  const list = neatThings.map(thing => <li>{thing}</li>)
  return (
    <Fragment>
      <h1>Welcome to my cool application!</h1>
      <p>Here's a list of neat things:</p>
      <ol>
        {list}
      </ol>
    </Fragment>

  )
}

const Application = () => {
  return (
    <div className="app">
      <Body />
    </div>
  )
}

ReactDOM.render(document.getElementsByTagName('body')[0], Application)
```

If you said seven, you'd be correct! If we look at every function call, every component (including both custom components like `Body` and baked-in JSX components like `div`s and `ol`s) and trace things down as far as we can go, it would look like this: 

ReactDOM -> Application -> div -> Body -> Fragment -> ol -> li

Looks a bit like a pipeline right? 

```jsx
const app = pipe(
  ReactDOM, 
  Application, 
  div, 
  Body,
  Fragment, 
  ol, 
  li 
)
```

What if we wrote components and whole applications as lists of function calls, instead of nested JSX tags? It is completely possible! Remember, components at the end of the day are just functions. And anything that's "just a funciton" can be called like one too: 

```jsx
const component = arguments => {
  return (
    <div>
      Hello, {arguments.children}
    </div>
  )
}

ReactDOM.render(document.getElementsByTagName('body')[0], component('world'))
```

So, if this works, then this should work too: 

```jsx
const component = arguments => {
  return (
    <div>
      Hello, {arguments.children}
    </div>
  )
}

const application = arguments => {
  return (
    <div>
      <p>Functions are cool right?</p>
      {arguments.children({children: 'world'})}
    </div>
  )
}

const app = pipe(
  application,
  component
)

ReactDOM.render(document.getElementsByTagName('body')[0], app())
```