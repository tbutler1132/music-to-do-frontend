import React from 'react';

function LogoutButton(props) {
    return (
        <div>
            <button onClick={() => props.logoutHandler()}>Logout</button>
        </div>
    );
}

export default LogoutButton;