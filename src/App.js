import './App.css';

import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'

import Profile from './components/Profile'
import TaskList from './components/TaskList/TaskList'

import {users} from './api/dummyApi'
import { connect } from 'react-redux';
// import {setCurrentUser} from './redux/actions'


function App(props) {


  useEffect(() => {
    const userObj = users.find(user => user.id === "1")
    props.setCurrentUser(userObj)
  }, [])

  console.log(props.currentUser)
  

  return (
    props.currentUser ?
    <div className="App">
      <TaskList />
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
