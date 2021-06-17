import React, {useEffect, useState} from 'react';

import {user} from '../../api/dummyApi'
import {task} from '../../api/dummyApi'
import {song} from '../../api/dummyApi'

import {AiFillCheckCircle} from 'react-icons/ai'

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
            id: 5,
            content: content,
            general: true
        })}else if(song){
            console.log("You son of a")
            addTask({
                id: 10,
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

    
    const {generalTasks, setGeneralTasks, songs, setSongs} = props
    
    console.log(generalTasks)

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
        return generalTasks.map(task => 
        <div className="task-item" key={task._id}>
            <AiFillCheckCircle onClick={() => removeGeneralTask(task)}/>
            <li>{task.content}</li>
        </div>)
    }

    //Render songs from API
    const renderSongs = () => {
        return songs.map(song =>
        <div key={song.id}>
            <div className="song-title-item">
                <AiFillCheckCircle onClick={() => removeSong(song)}/>
                <h2>{song.title}</h2>
            </div> 
        <ul>
            {song.tasks.map(task => 
            <div className="task-item" key={task.id}>
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
        console.log(taskObj)
        setGeneralTasks([...generalTasks, taskObj])
    }

    //Remove a general task
    const removeGeneralTask = (taskObj) => {
        setGeneralTasks(generalTasks.filter(task => task.content !== taskObj.content))
    }

    //Add a song task
    const addSongTask = (taskObj, song) => {
        console.log("ahh, I'm hit!! I'm hit!")
        const foundSong = songs.find(el => el.id === song.id)
        console.log(foundSong)
        foundSong.tasks.push(taskObj)
        setSongs([...songs])
    }

    //Remove a song task 
    const removeSongTask = (songObj, taskObj) => {
        const filteredSongs = songs.filter(song => song.title !== songObj.title)
        const filteredTasks = songObj.tasks.filter(task => task.content != taskObj.content)
        songObj.tasks = filteredTasks
        filteredSongs.push(songObj)
        setSongs(filteredSongs)
    }

    //Add a song
    const songSubmitHandler = (e) => {
        e.preventDefault()
        const newSong = {
            id: songs.length + 1,
            title: songTitle,
            tasks: []
        }
        setSongs([...songs, newSong])
        openAddSongForm(false)
        setSongTitle("")
    }

    //Remove a song
    const removeSong = (songObj) => {
        setSongs(songs.filter(song => song.title !== songObj.title))
    }



    return (
        <div className="task-list">
            <h1>{user.albumTitle}</h1>
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
            <button onClick={() => openAddSongForm(true)}>Add song</button>
            {addSongFormOpen ?
            <form onSubmit={songSubmitHandler}>
                <label>Title</label>
                <input onChange={songTitleHandler} value={songTitle} label="songTitle"/>
            </form>
            :
            null
            }
        </div>
    );
}

export default TaskList;