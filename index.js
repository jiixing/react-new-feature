import React, { useReducer, useState, useContext, createContext } from 'react';
import { render } from 'react-dom';
import './style.css';

function Hello({name}) {
  return (<div>hello {name}</div>)
}
const Actions = {
  Update: "SET"
}

const set = name => ({ type: Actions.Update, payload: { name } })

const reducer = (state, { type, payload }) => {
  switch (type) {
    case Actions.Update:
      return payload
    default:
      return state
  }
}

const Context = createContext(null);

// Hooks can only be called inside the body of a function component.
// const value = useContext(Context)

const INITIAL_NAME = 'Guest0'
const initialState = { name: INITIAL_NAME }

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
    const [value, setState] = useState(state.name)
console.log('hey',...state)
  return (
    <Context.Provider value={state.name}>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(set(value))
      }}>
        <Hello {...state} />
        <Hello name={state.name} />
        <Context.Consumer>
          {contextValue => <p>my name is {contextValue}</p>}
        </Context.Consumer>
        <input value={value} onChange={({ target: { value } }) => setState(value)} />
        <input type="submit" value="Change Name" />
      </form>
      data in input text:&nbsp;{value}
    </Context.Provider>
  )
}

render(<App />, document.getElementById('root'));
