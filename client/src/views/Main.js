import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import ProjectList from '../components/ProjectList';
import axios from 'axios';
import { Button } from 'reactstrap';

const Main = (props) => {
    const [projects, setProjects] = useState([])
    const [loaded, setLoaded] = useState([])
    
    useEffect(() => {
        axios.get('https://localhost:8000/api/projects')
            .then(res => {
                setProjects(res.data);
                setLoaded(true);
            })
    }, [projects]);

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/logout")
            .then((res) => console.log(res))
            .then(navigate('/'))
            .catch((err) => console.log(err));
    };
    
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-between'>
                        <Link to='/projects/new'>Submit a new project</Link>
                        <Button color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                    <h1 className="text-center">Project List</h1>
                    { loaded && <ProjectList /> }
                </div>
            </div>
        </div>
    )
}

export default Main;