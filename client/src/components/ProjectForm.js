import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ProjectForm = (props) => {
    const {
        initialTitle,
        initialProjectNumber,
        initialStoreNumber,
        initialStatus,
        initialFile,
        onSubmitProp,
        errors
    } = props;
    
    const [title, setTitle] = useState(initialTitle);
    const [projectNumber, setProjectNumber] = useState(initialProjectNumber);
    const [storeNumber, setStoreNumber] = useState(initialStoreNumber);
    const [status, setStatus] = useState(initialStatus);
    const [file, setFile] = useState(initialFile);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({
            title,
            projectNumber,
            storeNumber,
            status,
            file,
        })
    }

    return (
        <Form className='border p-5' onSubmit={onSubmitHandler} enctype="multipart/form-data">
            {/* {errors.map((err, index) => <p className='text-danger text-center' key={index}>{err}</p>)} */}
            {
                errors ? Object.keys(errors).map((objKey, index) => (
                    // <p key={index}>{errors[objKey].message}</p>
                    <p className='text-danger text-center' key={index}>{errors[objKey].message}</p>
                ))
                : null
            }
            <div className='mb-3 row d-flex justify-content-center'>
                <div className='col'>
                    <FormGroup>
                        <Label for="title">Title:</Label><br />
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        /><br />
                        {/* { errors.title ? 
                                <p>{errors.title.message}</p>
                                : null
                        } */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="projectNumber">Project Number:</Label><br />
                        <Input
                            type="number"
                            name="projectNumber"
                            id="projectNumber"
                            value={projectNumber}
                            onChange={(e) => setProjectNumber(e.target.value)}
                        /><br />
                        {/* { errors.projectNumber ? 
                                <p>{errors.projectNumber.message}</p>
                                : null
                        } */}
                    </FormGroup>
                    <FormGroup>   
                    <Label for="storeNumber">Store Number:</Label><br />
                    <Input
                        type="select"
                        name="storeNumber"
                        id="storeNumber"
                        value={storeNumber}
                        onChange={(e) => setStoreNumber(e.target.value)}
                    >
                        <option selected>No Store Number Selected</option>
                        <option value={"1701"}>1701</option>
                        <option value="1702">1702</option>
                        <option value="1706">1706</option>
                    </Input><br />
                        {/* { errors.storeNumber ? 
                                <p>{errors.storeNumber.message}</p>
                                : null
                        } */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status:</Label><br />
                        <Input
                            type="select"
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option selected>No Status Selected</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Input><br />
                        {/* { errors.status ? 
                                <p>{errors.status.message}</p>
                                : null
                        } */}
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="file">Image:</Label><br />
                        <Input
                            type="file"
                            name="file"
                            id="file"
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
                        /><br /> */}
                        {/* { errors.file ? 
                                <p>{errors.file.message}</p>
                                : null
                        } */}
                    {/* </FormGroup> */}
                </div>
                <div className='text-center'>
                    <Button color='primary' type='submit' value='submit'>Submit</Button>
                </div>
            </div>
        </Form>
    )
}

export default ProjectForm;