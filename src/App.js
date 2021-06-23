import './App.css';

import {useEffect, useState} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import axios from 'axios'

import TaskList from './components/TaskList/TaskList'
import Login from './components/Login'
import Signin from './components/Signin'


const BASE_API = 'https://tbutler1132-music-to-do-backend.zeet.app'


function App(props) {

  const [generalTasks, setGeneralTasks] = useState(false)
  const [songs, setSongs] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    const profile = localStorage.getItem("profile")
    const token = localStorage.getItem("token")

    if(profile) {

      const profileObj = JSON.parse(profile)

      axios({
        method: 'GET',
        url: `${BASE_API}/users/${profileObj._id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(data => 
        {
            setGeneralTasks(data.data.tasks)
            setSongs(data.data.songs)
            setCurrentUser(data.data)
          }
        )
    }
  }, [])


  const loginHandler = (userInfo) => {


    axios({
      url: `${BASE_API}/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: userInfo
    })
    .then(data => {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("profile", JSON.stringify({...data.data.result}))
        setGeneralTasks(data.data.result.tasks)
        setSongs(data.data.result.songs)
        setCurrentUser(data.data.result)
        props.history.push('/tasklist')
      })

  }

  const signupHandler = (userInfo) => {


    axios({
      method: 'POST',
      url: `${BASE_API}/users/signup`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: userInfo
    })
    .then(data => {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("profile", JSON.stringify({...data.data.result}))
        setGeneralTasks(data.data.result.tasks)
        setSongs(data.data.result.songs)
        setCurrentUser(data.data.result)
        props.history.push('/tasklist')
      })
  }

  const logoutHandler = () => {
    localStorage.removeItem('profile')
    localStorage.removeItem('token')
    setCurrentUser(false)
    props.history.push('/login')
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Redirect to="login"/></Route>
        <Route path="/login" render={() => <Login history={props.history} loginHandler={loginHandler}/>} />
        <Route path="/signin" render={() => <Signin signupHandler={signupHandler}/>} />
        {currentUser ?
        <Route path="/tasklist" render={() => <TaskList logoutHandler={logoutHandler} songs={songs} setSongs={setSongs} generalTasks={generalTasks} setGeneralTasks={setGeneralTasks} currentUser={currentUser}/>} />
        :
        null}
      </Switch>
      {/* <Route path="/profile" render={() => <Profile />}/> */}
    </div>
  );
}

export default withRouter(App);
