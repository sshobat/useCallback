
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

    /*
    const incrementSalary = () => {
        setSalary(salary + 500);
    }
    */

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