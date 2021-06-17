import './App.css';

import {useEffect, useState} from 'react'
// import {Route, Switch} from 'react-router-dom'

// import Profile from './components/Profile'
import TaskList from './components/TaskList/TaskList'
import { connect } from 'react-redux';
// import {setCurrentUser} from './redux/actions'


function App(props) {

  const [generalTasks, setGeneralTasks] = useState(false)
  const [songs, setSongs] = useState(false)


  useEffect(() => {
    fetch('http://localhost:7000/users')
    .then(r => r.json())
    .then(data => {
      console.log(data) 
      setGeneralTasks(data[0].tasks)
      setSongs(data[0].songs)
      props.setCurrentUser(data[0])
    }
      )
  }, [])

  return (
    props.currentUser ?
    <div className="App">
      <TaskList songs={songs} setSongs={setSongs} generalTasks={generalTasks} setGeneralTasks={setGeneralTasks} currentUser={props.currentUser}/>
      {/* <Route path="/profile" render={() => <Profile />}/> */}
    </div>
    :
    null
  );
}

const msp = (state) => {
  return {currentUser: state.currentUser}
}

const mdp = (dispatch) => {
  return {setCurrentUser: (userObj) => dispatch({type: "set_current_user", payload: userObj})}
}

export default connect(msp,mdp)(App);
