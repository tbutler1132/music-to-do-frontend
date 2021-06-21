import React, {useState} from 'react';

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const userNameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.loginHandler({
            username: username,
            password: password
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Username please</label>
                <input value={username} onChange={userNameHandler}/>
                <label>Password please</label>
                <input value={password} onChange={passwordHandler}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;