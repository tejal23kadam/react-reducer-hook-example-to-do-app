import React from 'react';
import { useReducer } from 'react';

function IncDec() {

    const createInitialState = {
        age: 1
    }
    
    function reducer(state, action) {
        if (action.type === 'increment')
            return { age: state.age + 1 };

        if (action.type === 'decrement')
            return { age: state.age - 1 };
    }
    const [state, dispatch] = useReducer(reducer, createInitialState);
    return (
        <div>

            <button onClick={() => { dispatch({ type: 'increment' }) }} > + </button>
            <button onClick={() => { dispatch({ type: 'decrement' }) }} > - </button>

            <h1>{state.age}</h1>
        </div>
    )
}
export default IncDec