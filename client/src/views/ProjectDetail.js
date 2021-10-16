import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, navigate } from '@reach/router';
import { Table, Button } from 'reactstrap';

const Detail = (props) => {
    const { id } = props;
    const [project, setProject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects/${id}`)
            .then(res => setProject({
                ...res.data
            }))
    }, [id])

    const dateSubmitted = project.dateSubmitted;
    const formattedDateSubmitted = moment(dateSubmitted).format('MMMM Do YYYY');

    const dateUpdated = project.dateUpdated;
    const formattedDateUpdated = moment(dateUpdated).format('MMMM Do YYYY');

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
                        <Link to='/projects'>Go Back To Projects</Link>
                        <Button color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
            <div className='row mt-3 text-center'>
                <div className='col p-5'>
                    <img src={`http://localhost:8000/${project.file}`} alt='Project' className="rounded-pill"/><br /><br />
                    <h1>{project.title}</h1><br />
                    <Table className="table-borderless">
                        <tbody>
                        <tr>
                            <th scope='row'>Project Number:</th>
                            <td>{project.projectNumber}</td>
                        </tr>
                        <br />
                        <tr>
                            <th scope='row'>Store Number:</th>
                            <td>{project.storeNumber}</td>
                        </tr>
                        <br />
                        <tr>
                            <th scope='row'>Project Status:</th>
                            <td>{project.status}</td>
                        </tr>
                        <br />
                        {/* <tr>
                            <th scope='row'>Submitted By:</th>
                            <td>{project.submittedBy.firstName}</td>
                        </tr>
                        <br /> */}
                        <tr>
                            <th scope='row'>Date Submitted:</th>
                            <td>{formattedDateSubmitted}</td>
                        </tr>
                        <br />
                        <tr>
                            <th scope='row'>Date Updated:</th>
                            <td>{formattedDateUpdated}</td>
                        </tr>
                        <br />
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Detail;