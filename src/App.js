import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

import {useEffect, useState} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import axios from 'axios'

// import Profile from './components/Profile'
import TaskList from './components/TaskList/TaskList'
import Login from './components/Login'
import Signin from './components/Signin'

// import {setCurrentUser} from './redux/actions'

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


      // fetch(`${BASE_API}/users/${profileObj._id}`, {
      //   method: 'GET',
      //   headers: { 
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   }
      // })
      // .then(r => r.json())
      // .then(data => {
      //   setGeneralTasks(data.tasks)
      //   setSongs(data.songs)
      //   setCurrentUser(data)
      // }
      // )
      
    }
  }, [])


  // useEffect(() => {
  //   fetch('http://localhost:7000/users')
  //   .then(r => r.json())
  //   .then(data => {
  //     setGeneralTasks(data[0].tasks)
  //     setSongs(data[0].songs)
  //     setCurrentUser(data[0])
  //   }
  //   )
  // }, [])

  // console.log(localStorage.getItem(JSON.parseZ))

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
        console.log(data)
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("profile", JSON.stringify({...data.data.result}))
        setGeneralTasks(data.data.result.tasks)
        setSongs(data.data.result.songs)
        setCurrentUser(data.data.result)
        props.history.push('/tasklist')
      })


    // fetch(`${BASE_API}/users/signin`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify(userInfo)
    // })
    // .then(r => r.json())
    // .then(data => {
    //   console.log(data)
    //   localStorage.setItem("token", data.token)
    //   localStorage.setItem("profile", JSON.stringify({...data.result}))
    //   setGeneralTasks(data.result.tasks)
    //   setSongs(data.result.songs)
    //   setCurrentUser(data.result)
    //   props.history.push('/tasklist')
    // })
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

    // fetch(`${BASE_API}/users/signup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify(userInfo)
    // })
    // .then(r => r.json())
    // .then(data => {
    //   localStorage.setItem("token", data.token)
    //   localStorage.setItem("profile", JSON.stringify({...data.result}))
    //   setGeneralTasks(data.result.tasks)
    //   setSongs(data.result.songs)
    //   setCurrentUser(data.result)
    //   props.history.push('/tasklist')
    // })
  }

  const logoutHandler = () => {
    console.log('clicked')
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

// const msp = (state) => {
//   return {currentUser: state.currentUser}
// }

// const mdp = (dispatch) => {
//   return {setCurrentUser: (userObj) => dispatch({type: "set_current_user", payload: userObj})}
// }

export default withRouter(App);
