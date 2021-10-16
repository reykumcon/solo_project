import React from 'react';
import { Link } from '@reach/router'
import { Button } from 'reactstrap';

const Welcome = (props) => {

    return (
        <div className='container'>
            <div className='row d-flex vh-100 justify-content-between align-items-center'>
                <div className='col'>
                    <h1 className='text-center'>Welcome To METalk</h1>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to='/register'>
                            <Button color='success'>Register</Button>
                        </Link>
                        &nbsp; | &nbsp;
                        <Link to='login'>
                            <Button color='success'>LogIn</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;