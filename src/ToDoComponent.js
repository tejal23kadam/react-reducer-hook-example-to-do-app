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
      //handleEditing();     
      return {
        ...state,
        todos: [...state.todos.map((todo) => {

          console.log("object : " + JSON.stringify(action));
          console.log("id :" + JSON.stringify(todo.todoId));
          if (todo.todoId === action.toUpdateId.todoId) {

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
  const [selectedId, setSelectedID] = useState(-1);
  const [idEdit, setIdEdit] = useState(null); //<== Create this state
  const [dixing, setDixing] = useState(false);
  let dix = {};
  const seteditmode = () => {
    if (dixing) {
      dix.display = 'none';
      setIdEdit(null);
    }
    else {
      dix.display = 'block';
      setIdEdit(null);
    }
  }

  // return (
  //   <>
  //     <input value={state.draft} onChange={e => { dispatch({ type: 'input_draft', nextDraft: e.target.value }) }} />
  //     <button onClick={() => { dispatch({ type: 'added_todo' }); }}>Add</button>
  //     <ul>
  //       {state.todos.map(item => (
  //         <li key={item.todoId}>
  //           <div style={{ display: 'flex' }}>
  //             <div style={viewMode} >
  //               {item.draft}
  //               <button onClick={() => setEditing(true)} onChange={(e) => dispatch({ type: 'update_todo', task: e.target.value, toUpdateId: item })}>Update</button>
  //             </div>
  //             <div style={editMode}>
  //               <input type='text' value={item.draft} onChange={e => { dispatch({ draft: e.target.value }) }} />
  //               <button onClick={() => setEditing(false)}>save</button>
  //             </div>
  //             <button onClick={() => { dispatch({ type: 'delete_todo', toDeleteId: item.todoId }); }}>Delete</button>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </>

  // );



  return (
    <>
      <input value={state.draft} onChange={e => { dispatch({ type: 'input_draft', nextDraft: e.target.value }) }} />
      <button onClick={() => { dispatch({ type: 'added_todo' }); }}>Add</button>
      <ul>
        {state.todos.map((item, idx) => (
          <li key={item.todoId} style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
              {
                (selectedId === idx) ? (
                  <div style={{ display: 'flex' }} >
                    <input type='text'
                      style={{ display: idEdit === item.todoId ? 'block' : 'none' }}
                      value={item.draft}
                      onChange={(e) => dispatch({ type: 'update_todo', task: e.target.value, toUpdateId: item })}
                    />
                    <h2 style={{ display: idEdit === item.todoId ? 'none' : 'block' }}>{item.draft}</h2>
                    {
                      (dixing) ? (
                        <button style={{ 'margin-top': '30px' }} onClick={() => { seteditmode(); setDixing(false) }}  >save</button>
                      )
                     :
                      (                      
                        <button style={{ 'margin-top': '30px' }} onClick={() => { setSelectedID(idx); setIdEdit(item.todoId); setDixing(true) }}
                            onChange={(e) => dispatch({ type: 'update_todo', task: e.target.value, toUpdateId: item })}>edit</button>
                      )
                    }

                  </div>
                ) : (
                  <div style={{ display: 'flex', dixing }}>
                    <div >
                      <h2>{item.draft}</h2>
                    </div>
                    <div style={{ 'padding-top': '30px' }} >
                      <button onClick={() => { setSelectedID(idx); setIdEdit(item.todoId); setDixing(true) }}
                        onChange={(e) => dispatch({ type: 'update_todo', task: e.target.value, toUpdateId: item })}>edit</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div style={{ 'padding-top': '30px' }}>
              <button onClick={() => { dispatch({ type: 'delete_todo', toDeleteId: item.todoId }); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul >
    </>
  );
}
