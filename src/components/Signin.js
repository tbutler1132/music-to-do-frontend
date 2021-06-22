import React, {useState} from 'react';

function Signin(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.signupHandler({username: username, password: password})
    }

    return (
        <div >
            <form autocomplete='off' class='form' onSubmit={submitHandler}>
                <div >
                    <div class='control block-cube block-input'>
                        <input placeholder='Username' value={username} onChange={usernameHandler} type='text'/>
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
                    Sign Up
                    </div>
                    </button>
                </div>
            </form>
        </div>
    );
}


export default Signin;