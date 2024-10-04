import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { BsClock } from 'react-icons/bs'
import { FaFacebookF, FaSkype, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Users = () => {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.ameerpetit.com/api/entities/items/user`
                );
                const jsonResponse = await response.json();
                setUserData(jsonResponse);
            } catch (error) {
                console.error("Error fetching userData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className="py-5">
            <div className='d-flex justify-content-between align-items-center'>   <h1 className='text-theme mb-3'>Users</h1>

                <Link to={`/user/add`} className='bth-theme btn'>Add User</Link>
            </div>
            <Row className="d-flex justify-content-center align-items-center">
                {userData?.length > 0 ? userData?.map((data) => (

                    <Col md={6} xl={4}>
                        <Card className="text-center" style={{ borderRadius: '15px' }}>
                            <Card.Body>
                                <div className="mt-3 mb-4">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle img-fluid"
                                        style={{ width: '100px' }}
                                        alt="Profile"
                                    />
                                </div>
                                <h4 className="mb-2">{data?.data?.first_name} {data?.data?.last_name}</h4>
                                <p className="text-muted mb-4">
                                    @Programmer ~{data?.data?.age}
                                </p>

                                <div className="mb-4 pb-2">
                                    <Button variant="outline-primary" className="btn-floating me-2">
                                        <FaFacebookF className="fa-lg" />
                                    </Button>
                                    <Link to={data?.data?.email} target='_blank' className="btn btn-floating me-2">
                                        <BiEnvelope className="fa-lg" />
                                    </Link>
                                    <Button variant="outline-primary" className="btn-floating">
                                        <FaSkype className="fa-lg" />
                                    </Button>
                                </div>

                                <Button variant="primary" className="btn-rounded btn bth-theme">
                                    View Profile
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                )
                    : <p>No Users Found</p>}
            </Row>
        </Container>

    )
}

export default Users
