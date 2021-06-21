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
            <h3 onClick={() => props.history.push('/signin')}>Don't have an account? Click here to sign on up!</h3>
        </div>
    );
}

export default Login;