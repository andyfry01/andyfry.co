---
layout: post
title: Accessible Multistep Forms in React with Awesome UX – Validation
permalink: /multi-step-form-validation/
author_profile: true
read_time: true
comments: true
share: true
related: true
---
<link rel="stylesheet" href="/public/css/prism.css">



## Validation

The last piece of a great multi-step form experience is *validation*, or the detection and communication of form errors before submission. Input validation is helpful for all parties involved: people make errors all the time, and website owners want nice, clean data in their databases. 

However, before we get into the "how"s of validation, let's take a step back and note that the "what"s of validation can be way more complicated than they first appear.

### Avoid overzealous input validation
I'd advise you to be as permissive as possible when it comes to validating input. Computers don't handle unexpected input very well, so there usually has to be *some* kind of validation performed before data enters your database. However, excessively restrictive validation can negatively impact your visitors. People with unique names (like "Jennifer Null") get flagged as invalid all the time, and [can be locked out of using some services entirely](https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems). Street address formats [vary drastically across the world](https://ux.shopify.com/designing-address-forms-for-everyone-everywhere-f481f6baf513), as do [phone numbers](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers). 

There are way too many edge cases out there to account for all of the unknown unknowns. You may think you've got them all figured out, but chances are that you haven't accounted for every single one. Chances are *very* good, in fact, that your cultural, regional, and language biases for what constitutes "correct" and "incorrect" input have been implicitly encoded into your validation code, and this has the potential to lock huge swathes of the world out of your website. 

In the best case scenario, you've simply annoyed someone by ensnaring them in a validation check which doesn't take their particular edge case into account. In the worst case scenario, you've disenfranchised a person for being unique, or perhaps simply for not being from your country. 

It's a big world full of unstandardized information out there, and it's always changing. Be as permissive with your validations as your ethical sensibilities, technological limitations, and business needs will permit.

### What to validate

So, now that we know that we should validate responsibly, we should define *what* to validate. Two broad categories are:

1. Wrong input, such as can be reliably determined
2. Missing input

Names and phone numbers are notoriously hard to validate in all their variety and complexity, but fortunately things like email addresses have a [well-defined spec](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1) that we can rely on for validation purposes. "Age is just a number" is both a cliche and a logical truism: the numerical representation of the number of times you've been around the sun isn't debatable or format-dependent. Wrong input, in these limited instances, is relatively easy to detect and can be strictly validated. 

There are other dimensions to "correct" input as well. If a field needs to be unique, like a username or an email address, then you can reliably know whether one string matches another (although once upon a time, [this was not the case!](https://youtu.be/MijmeoH9LT4)).

Missing input is also fortunately an easy one to cover. An empty string in a required field is simple and foolproof to detect, as is an unchecked radio button or unselected dropdown item. 

### When to validate

Once you've identified what to validate, the question is *when* to communicate this to a visitor. You've got a few options:

1. When a visitor clicks "next" to move onto the next part of the form, or "submit" when they've finished
2. When a visitor has finished entering a value in a field and has moved on to the next (our friend `onBlur` from the "Persistent state" chapter)
3. Instantly, as a visitor enters in information. While the field is in an error state, you display the message. When the input is correct, you remove the error state.

The merits of these strategies are debatable and context-dependent. You can find research which claim that [visitors make more errors with inline onBlur validation](https://uxmovement.com/forms/why-users-make-more-errors-with-instant-inline-validation/), and you can find other research which [claim that onBlur validation leads to faster form completion and higher satisfaction](https://alistapart.com/article/inline-validation-in-web-forms). Many best practice guides will tell you not to validate as a visitor is actively typing, but in some limited contexts that instant feedback can be beneficial, like for password fields with rules on minimum length and types of characters.

There isn't a ton of hard evidence to lean on, most of the research has been performed on very small sample sizes, and much of the literature is opinion-based. 

However, there *is* one part of your flow where you *have* to validate no matter what, and that is on submit of the completed form. It's our last chance before we send the data off, smoke em if you got em. 

So to keep things simple, let's focus on validating on submit. Because this is all about multi-step forms, we'll extend that definition just a bit to mean after each completed step of the form too. 

### How to validate

There are a lot of moving pieces to this, so let's break them down one by one. 

#### Validation logic and error messages

Firstly, what are we validating? In this example, we'll verify that our "name" field is not empty, and that our "age" field is at least 18. Let's write some validator functions and error messages: 

```js
const hasValidName = str => str.length > 0
const hasValidAge = age => age >= 18

const errors = { name: "Error: name field cannot be empty", 
                 age: "Error: you must be 18 or older." }

const validators = { name: hasValidName, age: hasValidAge }
```

#### The Input component

Next, we need the inputs for the form itself. We've got multiple inputs this time, so let's whip up a quick reusable component. The whole shebang looks like this: 

```jsx
const Input = props => {
    const { children, id, message, status, type, onBlur, onChange } = props

    const error = <label for={id}>{message}</label>
    const inputMessage = status === "error" ? error : null

    return (
        <fieldset>
            <label for={id}>{children}</label>
            <input class={cls} id={id} type={type} onChange={onChange} onBlur={onBlur} />
            <div aria-live="polite">
                {inputMessage}
            </div>
        </fieldset>
    )
}
```

There are a few things of note here: 

- `aria-live="polite"`: this is an accessibility feature for our error states. Much like with accessible routing, we need to give the browser some hints when we dynamically update the error messages for our inputs. You can read more about live regions [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).
- `label`s and `id`s. Properly labeled form elements are critical for accessibility. You not only need descriptive label content to inform a visitor what belongs in each form field, but the `label` elements themselves need to be tied to their respective `input`s with unique ids. This goes both for the form label itself and for the error label, if any.
- The `message` and `status` props. Many React components will use the presence or absence of a prop as the indicator of a component's state. We could just pass a `message` prop to the component, and use the presence or absence of a `message` to determine whether the component is in an error state or not, but what if we need more states in the future? Like "weak" or "strong" for password strength. By separating out the "fact" that the component is in a particular state from the message text of the state itself, we can avoid this kind of [duck typing](https://en.wikipedia.org/wiki/Duck_typing) and leave our future selves with more breathing room if and when we need to make changes to the component. 

#### The app state

Speaking of states, let's get those set up too: 

```js
const [formState, setFormState] = useState({ name: "", age: null })
const [inputStatus, setInputStatus] = useState({ name: "none", age: "none" })
const [errorMessages, setErrorMessages] = useState({ name: "", age: "" })
```

`formState` will hold our actual inputs, `inputStatus` will represent the state that the inputs are in (either `"none"` or `"error"` for now), and `errorMessages` will contain the error message text itself, where appropriate.

#### Interactivity

And now the fun part! Tying everything together. We can break the process of validation into the following parts: 
- Grabbing each input, running it through its respective validator, and marking it as valid or invalid
- Setting error states and messages depending on whether the inputs are valid or invalid
- Blocking submission of the form if it's invalid, or permitting submission if it's all good
- Resetting an input error state when a visitor returns to correct it

You could put this into one big, messy event handler, but breaking things into discrete parts and working on the basis of return values wherever possible will encourage a nice, functional architecture, with easily swappable and refactorable code. That way you can focus on the "calculations" within your code separately from the "actions". [More on that idea here](https://lispcast.com/what-is-an-action/).

This part of the guide will make frequent use of [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), and [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), which are awesome ES5 and ES6 language features. If you're unfamiliar with how these work, you should brush up on them first.

##### Checking inputs
We've got our form values tied into an object, so let's keep that structure when marking them as valid or invalid to grease the wheels of this machine. This function will take our form state and will return an object marking each input as either valid (`true`) or invalid (`false`).

```js
const checkInputs = formState => {
    return Object.keys(formState).reduce((acc, next) => {
        const validate = validators[next]
        const currentState = formState[next];
        const isValid = validate(currentState)
        
        return isValid ? {...acc, [next]: true} : {...acc, [next]: false}
    }, {})
};

// Calling with this state:
checkInputs({ name: "Baba O'Riley", age: 15 })

// Yields this return value:
{ name: true, age: false }

// The name is ok, but you're too young Baba! This ain't no teenage wasteland.
```

##### Setting error states

Based on the object returned from `checkInputs`, we can now go into our `inputStatus` and `errorMessages` objects and reassign the keys respectively. All of our objects conform to the same `{inputOne: value, inputTwo: value}` schema, which enables us to write nice, general code: 

```js
const setErrorState = inputStatus => {    
  const inputStatus = Object.keys(inputStatus).reduce((acc, next) => {
    return inputStatus[next] === true 
      ? {...acc, [next]: "none"} 
      : {...acc, [next] : "error"}
  }, {})

  const errorMessages = Object.keys(inputStatus).reduce((acc, next) => { 
    return inputStatus[next] === true 
      ? {...acc, [next]: ""} 
      : {...acc, [next]: errors[next]}
  }, {})

  setInputStatus(inputStatus);
  setErrorMessages(errorMessages);
};

// If we send this object to `setErrorState`: 
setErrorState({ name: true, age: false })
// It will set these states: 
inputStatus = { name: "none", age: "error" }
errorMessages = { name: "", age: "Error: you must be 18 or older."}
```

##### Blocking or permitting submission of the form

Now that we've gotten our functions written, we need to call them. If the form has errors, we can set them, and if not, we can submit the form! ... or in this case, just call an `alert`, but you get the point:

```js
const handleSubmit = e => {
  	// preventing default, because this is a JS-driven form
    e.preventDefault();

    const inputStatus = checkInputs(formState)

    if (!hasValidInputs(inputStatus)) {
        return setErrorState(inputStatus)
    }

    return alert("Inputs are valid!")
};
```

##### Resetting an input when a visitor returns to correct it

Finally, at the end of our flow: resetting the error message when the visitor has corrected their faulty input. The error message should persist until it is corrected, which means that we'll have to check for input validity in the `onChange` event listener of the input. Here's what that looks like:

```js
const resetErrorState = id => {
    setInputStatus({ ...inputStatus, [id]: "none" });
    setErrorMessages({ ...errorMessages, [id]: "" });
};

const handleInput = e => {
    const { id, value } = e.target;
    const validate = validators[id]
    const wasInError = inputStatus[id] === "error"
    const nowHasValidInput = validate(value)

    if (wasInError && nowHasValidInput) {
        resetErrorState(id)
    }

    setFormState({ ...formState, [id]: value });
};
```

### Complete example

Whew! That was a lot, and may have been a bit confusing out of context. Here is the complete working example of the above code:

```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";

const hasValidName = str => str.length > 0;
const hasValidAge = age => age >= 18;
const hasValidInputs = inputs => Object.values(inputs).every(x => x === true);

const validators = { name: hasValidName, age: hasValidAge };
const errors = {
  name: "Error: name field cannot be empty",
  age: "Error: you must be 18 or older.",
};

const Input = props => {
  const { children, id, message, status, type, onBlur, onChange } = props;

  const error = <label for={id}>{message}</label>;
  const inputMessage = status === "error" ? error : null;

  return (
    <fieldset>
      <label for={id}>{children}</label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
      <div aria-live="polite">{inputMessage}</div>
    </fieldset>
  );
};

const Demo = () => {
  const [formState, setFormState] = useState({ name: "", age: null });
  const [inputStatus, setInputStatus] = useState({ name: "none", age: "none" });
  const [errorMessages, setErrorMessages] = useState({ name: "", age: "" });

  const setErrorState = inputStatus => {
    const inputStates = Object.keys(inputStatus).reduce((acc, next) => {
      return inputStatus[next] === true
        ? { ...acc, [next]: "none" }
        : { ...acc, [next]: "error" };
    }, {});

    const errorMessages = Object.keys(inputStatus).reduce((acc, next) => {
      return inputStatus[next] === true
        ? { ...acc, [next]: "" }
        : { ...acc, [next]: errors[next] };
    }, {});

    setInputStatus(inputStates);
    setErrorMessages(errorMessages);
  };

  const resetErrorState = id => {
    setInputStatus({ ...inputStatus, [id]: "none" });
    setErrorMessages({ ...errorMessages, [id]: "" });
  };

  const checkInputs = formState => {
    return Object.keys(formState).reduce((acc, next) => {
      const validate = validators[next];
      const currentState = formState[next];
      const isValid = validate(currentState);

      return isValid ? { ...acc, [next]: true } : { ...acc, [next]: false };
    }, {});
  };

  const handleSubmit = e => {
    e.preventDefault();

    const inputStatus = checkInputs(formState);

    if (!hasValidInputs(inputStatus)) {
      return setErrorState(inputStatus);
    }

    return alert("Inputs are valid!");
  };

  const handleInput = e => {
    const { id, value } = e.target;
    const validate = validators[id];
    const wasInError = inputStatus[id] === "error"
    const nowHasValidInput = validate(value)

    if (hasError && hasValidInput) {
      resetErrorState(id);
    }

    setFormState({ ...formState, [id]: value });
  };

  return (
    <form>
      <Input
        id="name"
        type="text"
        message={errorMessages["name"]}
        status={inputStatus["name"]}
        value={formState.name}
        onChange={handleInput}
        onBlur={resetErrorState}
      >
        What is your name?
      </Input>

      <Input
        id="age"
        type="number"
        message={errorMessages["age"]}
        status={inputStatus["age"]}
        value={formState.age}
        onChange={handleInput}
        onBlur={resetErrorState}
      >
        What is your age?
      </Input>

      <button onClick={handleSubmit}>Click to submit the form</button>
    </form>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
```

<script src="/public/js/prism.js"></script>