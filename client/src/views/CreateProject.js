import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';
import { Button } from 'reactstrap';

const CreateProject = (props) => {
    const [projects, setProjects] = useState([]);
    const [errors, setErrors] = useState([]);

    const createProject = project => {
        axios.post('http://localhost:8000/api/projects', project)
            .then(res => {
                setProjects([...projects, res.data]);
                navigate('/projects');
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
    }

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => console.log(res))
            .then(navigate('/'))
            .catch((err) => console.log(err));
    };
    
    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/projects'>Go Back To Projects</Link>
                        <Button color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                    <h3 className='mt-3 mb-3'>Submit A Project</h3>
                    <ProjectForm 
                        initialTitle = {''}
                        initialProjectNumber = {''}
                        initialStoreNumber = {''}
                        initialStatus = {''}
                        initialImage = {''}
                        onSubmitProp = {createProject}
                        errors = {errors}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateProject;