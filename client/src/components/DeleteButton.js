import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const DeleteButton = (props) => {
    const { projectId, successCallback } = props;

    const deleteProject = (e) => {
        axios.delete(`http://localhost:8000/api/projects/${projectId}`)
            .then(res => {
                successCallback();
            })
    }

    return (
        <Button color='danger' className='text-white' onClick={deleteProject}>
            Delete
        </Button>
    )
}

export default DeleteButton;