import React from 'react';

import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

import Album from './Album'
import ProfileInfo from './Profile/ProfileInfo'

function Profile(props) {
    const {currentUser} = props

    const renderAlbums = () => {
        return currentUser.albums.map(album =>
    
            <Album albumObj={album}/>
    
        )
    }

    const renderAlbumList = () => {
        const inProgressProjects = currentUser.albums.filter(album => !album.complete)
        const completeProjects = currentUser.albums.filter(album => album.complete)
        return currentUser.albums.map(album => 
            album.complete ?
                <h2 key={album.title}>{album.title}: Complete</h2> 
                :<h2 key={album.title}>{album.title}: In progress</h2>
        )
    }

    return (
        <div className="profile-home-page">
            <Switch>
                <Route exact path="/profile" render={() =>
                    <> 
                    <div className="profile-info-container">
                        <ProfileInfo user={currentUser} />
                    </div>
                    <div className="album-list-container">
                        {renderAlbumList()}
                    </div>
                    </>
                }/>
                <Route path="/profile/albums/1" render={() => <Album albumObj={currentUser.albums[0]}/>} />
            </Switch>
        </div>
    );
}

const msp = (state) => {
    return {currentUser: state.currentUser}
  }

export default connect(msp)(Profile);