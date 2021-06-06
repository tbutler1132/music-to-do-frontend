import React from 'react';

function ProfileInfo(props) {
    const {user} = props

    const totalSongs = () => {
       return user.albums.map(album => album.songs.length).reduce((a, b) => a + b, 0)
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <ul>
                <li>Total projects: {user.albums.length}</li>
                <li>Total songs: {totalSongs()}</li>
            </ul>
        </div>
    );
}

export default ProfileInfo;