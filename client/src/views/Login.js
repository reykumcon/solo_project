import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const loginUser = (e) => {
        e.preventDefault();
        
        setErrors("");
        setSuccessMsg("");

        const postData = {
            email,
            password
        };
        
        axios.post("http://localhost:8000/api/login", postData)
            .then(res => {
                setSuccessMsg(res.data.message);
                navigate('/projects');
            })
            .catch(err=>{
                setErrors(err.response.data.errors);
            })            
    };

    return (
        <div className='container'>
            <div className='row d-flex vh-100 justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 border border-2 border-secondary rounded p-5'>
                    <Form onSubmit={loginUser}>
                        {errors && <p className='text-danger text-center'>{errors}</p>}
                        {successMsg.length > 0 && (
                            <h3 style={{ color: "green" }}>{successMsg}</h3>
                        )}
                        {/* {errors.map((err, index) => <p className='text-danger text-center' key={index}>{err}</p>)} */}
                        <h2 className='text-center'>Login</h2><br />
                        <FormGroup>
                            <Label for="email">Email:</Label><br />
                            <Input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            /><br />
                            {/* { errors.email ? 
                                <p>{errors.email.message}</p>
                                : null
                            } */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label><br />
                            <Input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            /><br />
                            {/* { errors.password ? 
                                <p>{errors.password.message}</p>
                                : null
                            } */}
                        </FormGroup>
                        <div className='text-center'>
                            <Button color="primary" type="submit">Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;