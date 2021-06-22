import React, {useState} from 'react';

import {AiFillCheckCircle} from 'react-icons/ai'
import LogoutButton from '../LogoutButton'

const BASE_API = 'http://localhost:7000'

function TaskForm(props) {
    const {addTask, song} = props

    //Form State
    // const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // const titleHandler = (e) => {
    //     setTitle(e.target.value)
    // }
 
    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("garrahh, Im hit!!")

        if (!song){
        addTask({
            content: content,
            general: true
        })}else if(song){
            console.log("You son of a")
            addTask({
                content: content,
                general: false
            }, song)
        }
        setContent('')
    }

    return (
        <div className="task-form">
            <form onSubmit={submitHandler}>
                <input onChange={contentHandler} value={content} label="content"/>
                {/* <button type="submit">Add</button> */}
            </form>
        </div>
    );
}

function TaskList(props) {

    
    const {generalTasks, setGeneralTasks, songs, setSongs, currentUser, logoutHandler} = props
    
    //Task list state
    const [generalTaskFormOpen, openGeneralTaskForm] = useState(true)
    const [songTaskFormOpen, openSongTaskForm] = useState(true)
    const [addSongFormOpen, openAddSongForm] = useState(false)
    // const [generalTasks, setGeneralTasks] = useState(task)
    // const [songs, setSongs] = useState(song)

    const [songTitle, setSongTitle] = useState("")

    const songTitleHandler = (e) => {
        setSongTitle(e.target.value)
    }


    //Render tasks from API
    const renderGeneralTasks = () => {
        if(generalTasks.length > 0){
            const filteredTasks = generalTasks.filter(task => task !== null)
            return filteredTasks.map(task => 
            <div className="task-item" key={task.content}>
                <AiFillCheckCircle onClick={() => removeGeneralTask(task)}/>
                <li>{task.content}</li>
            </div>)
        } else {
            return null
        }
    }

    //Render songs from API
    const renderSongs = () => {
        return songs?.map(song =>
        <div key={song.title}>
            <div className="song-title-item">
                <AiFillCheckCircle onClick={() => removeSong(song)}/>
                <h2>{song.title}</h2>
            </div> 
            <ul>
                {song.tasks.map(task => 
                <div className="task-item" key={task.content}>
                    <AiFillCheckCircle onClick={() => removeSongTask(song, task)}/>
                    <li>{task.content}</li>
                </div>
                )}
            </ul>
            {songTaskFormOpen ? 
                <TaskForm song={song} addTask={addSongTask}/>
            :
                null
            }
        </div>
        )
    }

    //Add a general task
    const addGeneralTask = (taskObj) => {
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(taskObj)
        }
        fetch(`${BASE_API}/users/add_gen_task/${currentUser._id}`, options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setGeneralTasks([...generalTasks, data])
        })

    }

    //Remove a general task
    const removeGeneralTask = (taskObj) => {
        fetch(`${BASE_API}/users/delete_gen_task/${currentUser._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(taskObj)
        })
        .then(r => r.json())
        .then(data => console.log(data))
        setGeneralTasks(generalTasks.filter(task => task !== null && task.content !== taskObj.content))
    }

    //Add a song task
    const addSongTask = (taskObj, song) => {
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({task: taskObj, song: song})
        }
        fetch(`${BASE_API}/users/add_song_task/${currentUser._id}`, options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            song.tasks.push(data)
            setSongs([...songs])
        })
    }

    //Remove a song task 
    const removeSongTask = (songObj, taskObj) => {
        fetch(`${BASE_API}/users/delete_song_task/${currentUser._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({song: songObj, task: taskObj})
        })
        .then(r => r.json())
        .then(data => {

            console.log(data)
            const filteredSongs = songs.filter(song => song.title !== songObj.title)
            const filteredTasks = songObj.tasks.filter(task => task.content !== taskObj.content)
            songObj.tasks = filteredTasks
            filteredSongs.push(songObj)
            setSongs(filteredSongs)
        })

    }

    //Add a song
    const songSubmitHandler = (e) => {
        e.preventDefault()
        const newSong = {
            title: songTitle,
            tasks: []
        }
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newSong)
        }
        fetch(`${BASE_API}/users/add_song/${currentUser._id}`, options)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setSongs([...songs, data])
        })
        openAddSongForm(false)
        setSongTitle("")
    }

    //Remove a song
    const removeSong = (songObj) => {
        fetch(`${BASE_API}/users/delete_song/${currentUser._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(songObj)
        })
        .then(r => r.json())
        .then(data => console.log(data))
        setSongs(songs.filter(song => song.title !== songObj.title))
    }



    return (
        <div className="task-list">
            <h1>{currentUser.albumTitle}</h1>
            <div className="tasks-subject-container">
                <div className="song-title-item">
                    <h2>General</h2>
                </div>
                <ul>
                    {renderGeneralTasks()}
                </ul>
                {generalTaskFormOpen ? 
                    <TaskForm song={false} addTask={addGeneralTask}/>
                :
                    null
                }
            </div>
            {renderSongs()}
            <div className="add-song-button">
                <button className="song-button" variant="outline-dark" onClick={() => openAddSongForm(true)}>Add song</button>
            </div>
            {addSongFormOpen ?
            <form onSubmit={songSubmitHandler}>
                <label>Title</label>
                <input onChange={songTitleHandler} value={songTitle} label="songTitle"/>
            </form>
            :
            null
            }
            <div className="logout-button">
                <LogoutButton  logoutHandler={logoutHandler}/>
            </div>
        </div>
    );
}

export default TaskList;