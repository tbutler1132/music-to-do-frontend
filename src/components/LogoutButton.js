import React from 'react';

function LogoutButton(props) {
    return (
        <div>
            <button className="button-logout" onClick={() => props.logoutHandler()}>Logout</button>
        </div>
    );
}

export default LogoutButton;