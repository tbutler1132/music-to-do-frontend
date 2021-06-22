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
            <form autocomplete='off' class='form' onSubmit={submitHandler}>
                <div >
                    <div class='control block-cube block-input'>
                        <input placeholder='Username' value={username} onChange={userNameHandler} type='text'/>
                            <div class='bg-top'>
                                <div class='bg-inner'></div>
                            </div>
                            <div class='bg-right'>
                                <div class='bg-inner'></div>
                            </div>
                            <div class='bg'>
                                <div class='bg-inner'></div>
                            </div>
                    </div>
                    <div class='control block-cube block-input'>
                        <label>Password please</label>
                        <input value={password} onChange={passwordHandler}  placeholder='Password' type='password'/>
                            <div class='bg-top'>
                                <div class='bg-inner'></div>
                            </div>
                            <div class='bg-right'>
                                <div class='bg-inner'></div>
                            </div>
                            <div class='bg'>
                                <div class='bg-inner'></div>
                            </div>
                        </div>
                        {/* <button type="submit">Submit</button> */}
                    <button class='btn block-cube block-cube-hover' type='submit'>
                    <div class='bg-top'>
                        <div class='bg-inner'></div>
                    </div>
                    <div class='bg-right'>
                        <div class='bg-inner'></div>
                    </div>
                    <div class='bg'>
                    <div class='bg-inner'></div>
                    </div>
                    <div class='text'>
                    Log In
                    </div>
                    </button>
                </div>
            </form>
            <h3 onClick={() => props.history.push('/signin')}>Sign Up</h3>
        </div>
    );
}

export default Login;