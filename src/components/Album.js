import React from 'react';

import {Route, Switch} from 'react-router-dom'

import Song from './Song'

function Album(props) {
    const {albumObj} = props

    const renderSongs = () => {
        return albumObj.songs.map(song => <Song key={song.title} songObj={song}/>)
    }

    return (
        <div className="album-container">
            <h2>{albumObj.title}</h2>
            {renderSongs()}
        </div>
    );
}

export default Album;