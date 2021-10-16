import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { navigate } from '@reach/router';

const Register = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const registerUser = (e) => {
        e.preventDefault();

        const postData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        };
        
        axios.post("http://localhost:8000/api/register", postData)
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                // const errorResponse = err.response.data.errors;
                // const errorArr = [];
                // for (const key of Object.keys(errorResponse)) {
                //     errorArr.push(errorResponse[key].message)
                // }
                // setErrors(errorArr);
                setErrors(err.response.data.errors);
            })
    };

    return (
        <div className='container'>
            <div className='row d-flex vh-100 justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 border border-2 border-secondary rounded p-5'>
                    <Form onSubmit={registerUser}>
                        {/* {errors.map((err, index) => <p className='text-danger text-center' key={index}>{err}</p>)} */}
                        {
                            errors ? Object.keys(errors).map((objKey, index) => (
                                // <p key={index}>{errors[objKey].message}</p>
                                <p className='text-danger text-center' key={index}>{errors[objKey].message}</p>
                            ))
                            : null
                        }
                        <h2 className='text-center'>Register</h2><br />
                        <FormGroup>
                            <Label for="firstName">First Name:</Label><br />
                            <Input
                                type="text"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            /><br />
                            {/* { errors.firstName ? 
                                <p>{errors.firstName.message}</p>
                                : null
                            } */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name:</Label><br />
                            <Input
                                type="text"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            /><br />
                            {/* { errors.lastName ? 
                                <p>{errors.lastName.message}</p>
                                : null
                            } */}
                        </FormGroup>
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
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password:</Label><br />
                            <Input
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            /><br />
                            {/* { errors.confirmPassword ? 
                                <p>{errors.confirmPassword.message}</p>
                                : null
                            } */}
                        </FormGroup>
                        <div className='text-center'>
                            <Button color="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;