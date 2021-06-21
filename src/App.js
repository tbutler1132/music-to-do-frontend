import './App.css';

import {useEffect, useState} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

// import Profile from './components/Profile'
import TaskList from './components/TaskList/TaskList'
import Login from './components/Login'
import Signin from './components/Signin'
import LogoutButton from './components/LogoutButton'
import { connect } from 'react-redux';
// import {setCurrentUser} from './redux/actions'

const BASE_API = 'http://localhost:7000'


function App(props) {

  const [generalTasks, setGeneralTasks] = useState(false)
  const [songs, setSongs] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    const profile = localStorage.getItem("profile")

    if(profile) {
      const profileObj = JSON.parse(profile)
      console.log(profileObj)
      setGeneralTasks(profileObj.tasks)
      setSongs(profileObj.songs)
      setCurrentUser(profileObj)
    }
  }, [])


  // useEffect(() => {
  //   fetch('http://localhost:7000/users')
  //   .then(r => r.json())
  //   .then(data => {
  //     setGeneralTasks(data[0].tasks)
  //     setSongs(data[0].songs)
  //     props.setCurrentUser(data[0])
  //   }
  //   )
  // }, [])

  // console.log(localStorage.getItem(JSON.parseZ))

  const loginHandler = (userInfo) => {
    fetch(`${BASE_API}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      localStorage.setItem("token", data.token)
      localStorage.setItem("profile", JSON.stringify({...data.result}))
      setCurrentUser(data.result)
      props.history.push('/tasklist')
    })
  }

  const signupHandler = (userInfo) => {
    fetch(`${BASE_API}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      localStorage.setItem("token", data.token)
      localStorage.setItem("profile", JSON.stringify({...data.result}))
      setCurrentUser(data.result)
      props.history.push('/tasklist')
    })
  }

  const logoutHandler = () => {
    console.log('clicked')
    localStorage.removeItem('profile')
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/login" render={() => <Login history={props.history} loginHandler={loginHandler}/>} />
        <Route path="/signin" render={() => <Signin signupHandler={signupHandler}/>} />
        {currentUser ?
        <>
        <Route path="/tasklist" render={() => <TaskList songs={songs} setSongs={setSongs} generalTasks={generalTasks} setGeneralTasks={setGeneralTasks} currentUser={currentUser}/>} />
        <LogoutButton logoutHandler={logoutHandler}/>
        </>
        :
        null}
      </Switch>
      {/* <Route path="/profile" render={() => <Profile />}/> */}
    </div>
  );
}

// const msp = (state) => {
//   return {currentUser: state.currentUser}
// }

// const mdp = (dispatch) => {
//   return {setCurrentUser: (userObj) => dispatch({type: "set_current_user", payload: userObj})}
// }

export default withRouter(App);
