
// Referential Equality in React
/*
-   https://blog.bitsrc.io/understanding-referential-equality-in-react-a8fb3769be0 

-   React compares the new value against the old value for equality using the Object.is() comparison algorithm.
-   Two values are considered equal when both are objects that point to the exact memory location (Both values are Objects that point to one memory location).
-   Objects are considered equal based on their memory location and not the values.

-   Example:
    const [mySelf, setMySelf] = useState<{ name: string, age: number }>({ name: 'David', age: 30 });

    Bad practice:
    const changeNameToJohn = () => {
        mySelf.name = "John";
        mySelf.age = 30;
        setMySelf(mySelf)
    }

    Good practice:
    const changeNameToJohn = () => {
        setMySelf({ ...mySelf, name: 'John' });
    }



*/

// Memoization
/*
-   https://www.freecodecamp.org/news/memoization-in-javascript-and-react/#what-is-memoization

-   Memoization is an optimization technique that makes applications more efficient and hence faster.
-   It does this by storing computation results in cache, and retrieving that same information from the cache the next time it's needed instead of computing it again.
-   It consists of storing in cache the output of a function, and making the function check if each required computation is in the cache before computing it.

-   The concept of memoization in JavaScript relies on two concepts: Closures & Higher Order Functions (Example: Fibonacci sequence).
-   In React, we can optimize our application by avoiding unnecessary component re-render using memoization, by caching the state or props.

-   For class pure components, to implement memoization React provides the PureComponent base class, instead of Component base class.
    class Child extends React.PureComponent {
        render() {
            return (
                ////////////////
            )
        }
  }

-   For functional pure components we use higher order component (HOC) 
    export default React.memo(function Child({name}) {
        /////////////////
    })

-   Memo doesn't work if the prop being passed to the component is a function, because in reality a new function is being created on every parent component re-render.
-   So if a new function is being created, that means we have a new prop and that means our child component should re-render as well.
-   To deal with this problem, react provides the useCallback hook.
-   What useCallback does is to hold on to the value of the function despite the parent component re-rendering, so the child prop will remain the same as long as the function value remains the same as well.


*/

// useCallback ///////////////////////////////////////////////////////////////

// A React Hook that lets you cache a function definition between re-renders.

// This is a hook that will return a memoized version of the callback function that only changes if one of the dependencies has changed.
// It is useful when passing callbacks to optimized child components (with React.memo) that rely on reference equality to prevent unnecessary renders.

// Example explanation

// On page load all the 5 components render
// Without the React.useMemo higher order component, click on any button will rerender all 5 components
// If we change age, only 2 components chould rerender
// With React.useMemo the component will rerender only if there are change in its state or props
// With the click on the Increment Age button, the Increment Salary button is rerendered because the new function is being created each time when the parent component is beeing rerendered (the prop is changed in the second Button component)
// The useCallback hook will cache the incrementSalary function and will return it if salary is not incremented (the dependency is not changed). Now only Age button and Increment Age components are rerenderd.

import { useState, useCallback } from "react";
import Title from "./Title";
import Count from "./Count";
import Button from "./Button";

const ParentComponent = () => {

    const [age, setAge] = useState(28);
    const [salary, setSalary] = useState(5000);

    /*
    const incrementAge = () => {
        setAge(age + 1);
    }
    */
    
    const incrementAge = useCallback(() => {
        setAge(age + 1);
    }, [age]);
    
    // const incrementSalary = () => {
    //     setSalary(salary + 500);
    // }
    
    const incrementSalary = useCallback(() => {
        setSalary(salary + 500);
    }, [salary]);
    

    return (
        <div>
            <Title />
            <Count  text="Age" count={age}/>
            <Button handleClick={incrementAge}> Increment Age </Button>
            <Count  text="Salary" count={salary}/>
            <Button handleClick={incrementSalary}> Increment Salary </Button>
        </div>
    );
}

export default ParentComponent;