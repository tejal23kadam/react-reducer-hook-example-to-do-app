import { useReducer, useState } from 'react';

function createInitialState() {


  return {
    todoId: '',
    draft: '',
    todos: [],
  };
}

let nextID = 0;
function reducer(state, action) {
  switch (action.type) {
    case 'input_draft': {
      return {
        ...state,
        draft: action.nextDraft,
      };
    }
    case 'added_todo': {
      nextID += 1;
      console.log("to do array" + JSON.stringify(state.todos));
      return {
        draft: '',
        todos: [{ todoId: nextID, draft: state.draft }, ...state.todos]
      };

    }

    case 'update_todo': {
      return {
        ...state,
        todos: [...state.todos.map((todo) => {
          if (todo.todoId === action.toUpdateId) {
            // setEditing(true);
            return { ...todo, draft: action.task };
          } else {
            return todo;
          }
        })]
      }
    }
    case 'delete_todo': {
      return {
        ...state,
        todos: [...state.todos.filter(item => item.todoId !== action.toDeleteId)]
      }

    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

export default function ToDoComponent() {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const [editing, setEditing] = useState(false); //to set edit mode  or view mode (enable disable input for update)
  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = 'none'
  }
  else {
    editMode.display = 'none';
  }  
  return (
    <>
      <input value={state.draft} onChange={e => { dispatch({ type: 'input_draft', nextDraft: e.target.value }); }} />
      <button onClick={() => { dispatch({ type: 'added_todo' }); }}>Add</button>
       <ul>
        {state.todos.map(item => (
           <li key={item.todoId}>
             <div style={{display: 'flex'}}>
              <div style={viewMode} >                
                {item.draft}
                <button onClick={() => setEditing(true)}>Update</button>                
              </div>
              <div style={editMode}>
                <input type='text' value={item.draft}
                  onChange={(e) => { dispatch({ type: 'update_todo', task: e.target.value, toUpdateId: item.todoId }) }} />  
                  <button onClick={() => setEditing(false)}>save</button>                    
              </div>
              <button onClick={() => { dispatch({ type: 'delete_todo', toDeleteId: item.todoId }); }}>Delete</button>
            </div>
           
           </li>
          ))}
      </ul> 
    </>
  );
}
