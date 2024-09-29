import React, { useState } from "react"

export function App() {

    const [count, updateCount] = useState(0);

    const parentUpdateCount = () => {
        updateCount(count + 1);
    }

    return (
        <>
            <h1>This is parent count: {count}</h1>
            <MyButton name="Button1" parentCount = {count} updateParentCount = {parentUpdateCount}></MyButton>
            <MyButton name="Button2" parentCount = {count} updateParentCount = {parentUpdateCount}></MyButton>
        </>
    )
}


function MyButton({name, parentCount, updateParentCount}) {
    const [count, updateCount] = useState(0);

    const buttonClicked = () => {
        updateParentCount();
        updateCount(count + 1);
    }

    return (
        <>
            The button is called {count} times.
            <br />
            <button onClick={buttonClicked}>Click {name}</button>
            <br />
        </>
    )
}