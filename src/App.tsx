import './App.css';

import  {useState, useEffect} from 'react';
import {Button,TextField} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { updateDoc,setDoc,query,doc,collection, getDocs,addDoc,deleteDoc,serverTimestamp } from 'firebase/firestore';
import {ListItem, List, ListItemText} from '@material-ui/core';
import {db} from './firebase';

function App() {
  interface ITodo {
    createdAt: string;
    title: string;
    updated: boolean;
}
  
  const [todos, setTodos] = useState<ITodo[]>([{title:"",createdAt:"", updated:false}]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const collectionName = 'todo_list';
  const collectionRef = collection(db,collectionName);
  
  useEffect( ()=>{
    console.log("fetching......");
    fetchData();
  }, []);

  async function fetchData(){
    const queryStatement = query(collectionRef)   
    const querySnapshots = await getDocs(queryStatement);
    let data:ITodo[] = [];
    querySnapshots.forEach((doc)=>{
      data.push(doc.data() as ITodo);
      console.log(data)
    });
    setTodos(data);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      {<ul>{todos.map(todo =>{
          return <List key={todo.title} className="todo_list" >
            <ListItem>
             <ListItemText primary={todo.title} secondary={todo.title}/>
            </ListItem>
            <EditIcon/>
            <DeleteForeverIcon/>
          </List>})}
        </ul>}
    </div>
  );
}

export default App;
