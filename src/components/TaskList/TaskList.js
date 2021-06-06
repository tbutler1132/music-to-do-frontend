import React from 'react';

import {user} from '../../api/dummyApi'
import {tasks} from '../../api/dummyApi'

function TaskList(props) {
    return (
        <div>
            <h1>{user.albumTitle}</h1>
            <h2>general</h2>
        </div>
    );
}

export default TaskList;