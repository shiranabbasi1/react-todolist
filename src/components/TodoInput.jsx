import { React, useState } from 'react';

export default function TodoInput(props) {

    const { handleAddTodo, todo, setTodo } = props;

    return (
        <header>
            <input type="text" value={todo} onChange={(ev) => {
                setTodo(ev.target.value);
            }} placeholder="Enter todo..." />
            <button onClick={() => {
                handleAddTodo(todo);
                setTodo("");
            }}>Add</button>
        </header>
    );
}
