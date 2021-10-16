import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import { Table } from 'reactstrap';
import DeleteButton from './DeleteButton';

const ProjectList = (props) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => setProjects(res.data));
    }, [projects])

    const removeFromDom = _id => {
        setProjects(projects.filter(project => project._id !== _id))
    }

    return (
        <Table className='table-bordered table-striped align-middle text-center'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Project Number</th>
                    <th>Store Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, idx) => {
                    return (
                        <tr key={idx}>
                            <td>
                                <Link to={`/projects/${project._id}`}>{project.title}</Link>
                            </td>
                            <td>{project.projectNumber}</td>
                            <td>{project.storeNumber}</td>
                            <td>{project.status}</td>
                            <td>
                                <Link to={`/projects/${project._id}/edit`}>
                                    Edit
                                </Link>
                                &nbsp; | &nbsp;
                                <DeleteButton 
                                    projectId={project._id}
                                    successCallback={()=>removeFromDom(project._id)}
                                />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default ProjectList;