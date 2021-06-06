import React from 'react';

function Song(props) {
    const {songObj} = props
    return (
        <div>
            <p>{songObj.title}</p>
        </div>
    );
}

export default Song;