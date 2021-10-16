import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import ProjectForm from '../components/ProjectForm';
import { Button } from 'reactstrap';

const UpdateProject = (props) => {
    const { id } = props;
    const [project, setProject] = useState();
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects/${id}`)
            .then(res => {
                setProject(res.data);
                setLoaded(true);
            })
    }, [id])

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => console.log(res))
            .then(navigate('/'))
            .catch((err) => console.log(err));
    };

    const updateProject = project => {
        axios.put(`http://localhost:8000/api/projects/${id}`, project)
            .then(res => {
                console.log(res);
                navigate('/projects');
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/projects'>Go Back To Projects</Link>
                        <Button color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                    <h3 className='mt-3 mb-3'>Edit Project</h3>
                    { loaded && (  
                        <ProjectForm 
                            initialTitle = {project.title}
                            initialProjectNumber = {project.projectNumber}
                            initialStoreNumber = {project.storeNumber}
                            initialStatus = {project.status}
                            onSubmitProp = {updateProject}
                            errors = {errors}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpdateProject;