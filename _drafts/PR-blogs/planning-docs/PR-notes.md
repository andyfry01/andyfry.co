# PR blog ideas

## Notes
- Bullet points are generally in top-to-bottom order as I read through the PRs.
- Start an http server in the "processed" folder to view files. Linked PRs are served from `localhost:8080`

## Juicy-looking PRs
These are PRs which have been skimmed to seek out the best comments and examples. Making a list now to avoid having to go through one by one. 
- [http://localhost:8080/design-language-react-pull-requests-99-.html](http://localhost:8080/design-language-react-pull-requests-99-.html)


## PR-specific insights

### [DLR PR 2: Button](http://localhost:8080/design-language-react-pull-requests-2-.html)
- destructuring instead of dotting into an object, shorter and more readable. <br /> Shorter code is more readable. <br/> Fine line between brevity and overly terse. 
    - `isIconType`: good example of brevity, 
    - `hasIconCls`: using excessive restructuring for `props.className` and `props.ClassName.indexOf` would be overkill. 
- Breaking one big function into smaller functions. `isIcon` was performing a lot of jobs before, but chunking up the individual "parts" of that big function into their own named functions makes the code simpler and faster to understand. You can "navigate" and "parse" the code in your mind according to the named functions, and don't have to actually walk through the logic of a big mondo function to parse out what they're doing. 
- Know your tools: Immad suggested refactoring from `enzyme.mount` to `enzyme.shallow` because it was better suited to the task. `mount` is good for testing a stateful component and running through its whole functionality, `shallow` is better for spitting out the rendered HTML and asserting against it. 

### [DLR PR 3: Dropdown](http://localhost:8080/design-language-react-pull-requests-3-.html)
- Have state live as high in your hierarchy as possible (but not too high). Putting state in the Dropdown component made the component more complex and less flexible for unforseen scenarios (loading a dropdown in an app with a pre-selected value, or programmatically setting the value according to something other than user input)
- When a component is stateful, it presents complicated questions: when it reports the contents of its internal state, what should it report? And when? 
- How small is too small when it comes to componentization? Error component: it's really just an element and a classname, but if that solves issues in your organization (standardization, confusion, developer education), then it's worth it. Then again, the name "Error" is limiting: there are inline errors, errors in form fields, modal-style errors. Make sure the box you're putting a concept into isn't too big. 
- Auto-assigned IDs. Some problems are so common, trivial, and annoying that you can solve them and people will be grateful. But offer a backdoor in case they need something custom (auto-ids for form elements are cool, but what if someone needs a custom ID for automated testing?)
- Keep your most descriptive words in reserve for the most important parts of your code. E.g.: use the `aria` prop for the root element, and use things like `labelAria` or `errorAria` for secondary and tertiary aspects. 
- Consistency in naming goes a long way, especially for library code. Reduces friction, increases trust and familiarity and a sense of competence. Nobody likes surprises. Everybody has to memorize a bunch of APIs, and many of them have hairy edge cases and gotchas. Strive to eliminate the obvious ones within your own code. 
- Organizational aspects matter: doesn't matter what the convention is, but stick to it (ordering event handler props at the bottom of a list instead of alphabetically)
- Get rid of dead code. No sense leaving something around that isn't doing anything. Leads to confusion for uninitiated readers. Make your bed. 
- Don't be excessively restrictive with a component. You have to draw lines somewhere, otherwise what's the point of componentization, but excessive restrictions make valid edge cases difficult or impossible to implement without hacks, and implies distrust in the users of your components. Loose fist, not tight fist. 
- Comments: be judicious. Sometimes they are helpful, often they are distracting ,(`getInitialValue` function comments). If your code needs a comment, it is either
    - Too complicated and needs to be refactored
    - Too vague in its functionality and needs to be broken up
    - A hack because you're lazy or because of pragmatic and/or costly realities of the broader context that the code is functioning within. If you're lazy ... shape up man, people are paying you to do this. If it is a pragmatic necessity, comment away. 
- Newlines before return statements: a little judicious whitespace makes comprehension that much easier. Syntax is noise. Cramped code is noise. Code is written the way it is so humans can comprehend it, whitespace is a tool you can use to make your code easier to understand.
- Newlines between variable declarations and control flow. "This is what we have to work with, and this is what we're going to do with it." 
- Humor is ok! Jabberwocky code example. There's a long, proud history of inside jokes and obscure references in computer programs. As long as it doesn't impede understanding, go for it. 
- Subtleties of the `className` and `style` props: should they override the base styles or supplement them? If you make it so they override what's already there, then this provides more freedom, but maybe people simply want to supplement the existing classes and styles with little tweaks instead of blowing them totally away. Consider your context. 
- Excessive verbosity (`errorContent` vs `error`). Don't use too many words to explain what you mean. It forces us to take longer to comprehend what your doodad is doing. Maybe an extra half second here and there isn't so significant in isolation, but compounded over a large codebase, it can mean a much longer time trying to understand the code, and leads to fatigue and frustration.
- Use truthy and falsey values to cut down on excessive configuration. Must be careful however. Having a `hasError` and `errorContent` prop makes a simple problem complicated: you could just pass an `errorContent` prop and choose to display the error node based on the presence of that prop. However, you now have to choose between different types of complexity: "complecting" the `errorContent` prop by tying it to multiple concepts (a presence of an error node + the error itself), or by multiplying the number of execution paths of your code by adding more variables to it (adding an execution path doubles complexity, removing an execution path halves complexity). Eric Normand video on computational complexity, Rich Hickey video on complexity. 
- Use the right tool for the right job. `const` implies immutabilty, `let` implies mutability. Using a `let` for a variable that will never change introduces uncertainty AND the possibility that someone down the line will mutate it by accident, while other code is expecting that it will be immutable. 
- Your variable names are like hints. `preSelectedOption` in the `Dropdown` component may implly that it expects an `<option>` tag to be passed to it. `initialValue`, on the other hand, makes no such implications.

### [DLR PR 4: Cards](http://localhost:8080/design-language-react-pull-requests-4-overview.html)
- Know what to review and what to ignore. JD never made a comment on a storybook file because it's just documentation code. He had limited time, and focused on the component itself. 
- Be terse when you can, but not too terse. `bodyClassName` is pretty long, `bodyCls` is short. `Cls` is fairly obvious to people with a little frontend knowledge as "class" or "className." It's a frequent part of a custom react component. But more obscure abbreviations (like `SUT`: "system under test") should perhaps be avoided or explained with a comment.
- `<Component className={CardWrapperClassNames} href={href || null}>`: `|| null` isn't required, seeing as React just won't do anything with a prop if the value it's been passed is `null` or `undefined`. But whether to be implicit or explicit? Implicit makes code shorter, explicit makes it clearer. Both represent the poles of what makes code readable, but where you draw the line is a matter of taste, experience and culture. 
- Using simple data structures to cut down on repeated code: 
    ```js
    // not this: 
    Card.propTypes = {
        accent: PropTypes.oneOf(["green" "purple" "blue"])
    }

    // yes this: 
    const AccentColors = { BLUE: "blue", GREEN: "green": PURPLE: "purple" }

    Card.propTypes = {
        accent: PropTypes.oneOf(Object.values(AccentColors))
    }
    ```

### [DL PR #10: Icon component](http://localhost:8080/processed/design-language-react-pull-requests-10-.html)
- Save repeated strings in a variable. It's cheap, typing is hard and error prone, it costs you nothing. DRY is a tricky thing sometimes: too DRY and your code is brittle, too WET and it's a sloppy verbose mess. Saving strings in a variable is a cheap and foolproof way to DRY things up. 
- Strategic whitespace helps aid comprehension. Breaking things up into well-defined sections and grouping related things together can draw correlations and aid understanding (variable declarations in one section, actions in another). 
- Comprehensive unit tests: if these things are going to be maximally useful, then they should strive to encompass everything you know about what a component can do (testing `.material-icons.dark` but not `.et-icon.dark`)
- Using if blocks to call functions with different arguments, as opposed to calling the function in a single place and logically determining what the arguments are. The former is super verbose, the latter takes up way less space. Perhaps it takes a little more thinking to read: you're not looking at the values of the arguments themselves anymore, and instead are looking at variable references to those values, which are calculated elsewhere. It all comes down to whether you can use that strategy to make the code both shorter and easier to understand. 
    ```js
    // not this
    if (poorTaste === true) {
        mySpecialFunction({ zelda: "sucks", javascript: "is the greatest language" })
    } else if (poorTaste === false) {
        mySpecialFunction({ zelda: "rocks", javascript: "is alright, but there are cooler langs" })
    }

    // this
    const opinionOnZelda = poorTaste === true ? "sucks" : "rocks"
    const opinionOnJS = poorTaste === true ? "is the greatest language" : "is alright, but there are cooler langs"

    mySpecialFunction({ zelda: opinionOnZelda, javascript: opinionOnJavascript })
    ```
- Use ternaries to cut down on verbose `if` logic and unneccessary mutation. Ternaries make the code faster to read, absence of mutation gives the reader confidence that strange, unexpected nonsense isn't going to occur.
    ```js
    // not this
    let tasteInVideogames;
    if (zelda === "awesome") {
        tasteInVideogames = "good"
    } else {
        tasteInVideogames = "bad"
    }

    // this
    const tasteInVideogames = zelda === "awesome" ? "good" : "bad"
    ```
- Use defaults as a way to avoid excessive logic. It will cut down on the thinking required to understand a function, and it will help outsiders to the code understand it more quickly, seeing as you're taking advantage of idioms in the language to convey meaning. ... but keep in mind that some features don't work in some browsers. 
    ```js
    // not this
    const zeldaSays = (something) => {
        if (something == null) {
            console.log("Link! Save Hyrule!")
        } else {
            console.log(something)
        }
    }

    zeldaSays("Link, use the hookshot!") // Link, use the hookshot!
    zeldaSays() // Link! Save Hyrule!

    // yes this

    const zeldaSays = (something = "Link! Save Hyrule!") => {
        console.log(something)
    }

    zeldaSays("Link, use the hookshot!") // Link, use the hookshot!
    zeldaSays() // Link! Save Hyrule!
    ```
- Name things consistently. Doesn't matter what convention you're using: pick one and follow it. 

### [DLR PR #12: Table](http://localhost:8080/design-language-react-pull-requests-12-.html)
- Defaults work for functions too!
    ```js
    // not this
    const demoFunc = (arg, callback) => {
        doWork(arg)
        if (callback) {
            callback()
        }
    }

    demoFunc("yadda yadda") // does the work
    demoFunc("yadda yadda", updateLog) // does work, and makes a log entry

    // yes this
    // callback will run every time, but if a callback argument isn't provided it just performs some kind of trivial task like returning null
    const demoFunc = (arg, callback = () => null) => {
        doWork(arg)
        callback()
    }
    ```
- Don't be excessively defensive. This is language dependent, and requires a good grasp of what happens or doesn't happen when values are missing or have an unexpected value. If you've got that good grasp, code confidently: excessive defensiveness is at best a signal that the writers of the code lack confidence (and makes future readers of that code less confident as a result), and at worst it's a performance hit (both "computer performance" and "human performance," i.e., the speed at which a person can understand the code), seeing as you're performing all kinds of useless work. Specific example: 
    ```js
    const cls = classNames({
        'text-left': hAlign && hAlign === HAlign.LEFT,
        'text-center': hAlign && hAlign === HAlign.CENTER,
        'text-right': hAlign && hAlign === HAlign.RIGHT
    })
    ```
### [DLR PR 99: Sticky header refactor](http://localhost:8080/design-language-react-pull-requests-99-.html)
- Take advantage of scopes and closures when you can. React gives us the Context API, which means you don't have to pass variables endlessly down through your functions and bloat your code with a bunch of props or arguments. Writing functions within the closure of another gives them access to values inside that closure. See also [https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-2-react-3c5662b997ab](https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-2-react-3c5662b997ab) 
    ```js
    // this
    const f = x => g(x)
    const g = x => h(x)
    const h = x => finally(x)

    // vs this

    const f = x => {
        const h = () => finally(x)
        const g = () => h()

        g()
    }
    ```

## General ideas
(note, writing these things will be easier if you have specific examples to draw on)

- PRs are a place for learning and knowledge sharing to happen. 
 [dropdown ](http://localhost:8080/design-language-react-pull-requests-3-.html))
- Early returns, use them! Early returns PHP video.
- PRs are a means of communication, use the tools at your disposal to communicate: inline comments, a PR description, PR title: these all carry context and help outsiders understand your code. 
- Be nice. If it's a team member making a PR, like hey dude ... he's on your team, be nice so the team stays cohesive. If it's an outsider making a PR into the library, then they've taken time away from their own work to contribute to your work, and you have a duty to treat their time and good faith with respect. 
- Emotional code would be good to reference: https://www.youtube.com/watch?v=uloVXmSHiSo