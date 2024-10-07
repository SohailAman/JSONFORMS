import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { BiEdit, BiEnvelope, BiTrash } from 'react-icons/bi'
import { FaFacebookF, FaSkype } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

const EntityListing = () => {
    const params = useParams();
    const entityType = params.entityType;


    const [entityData, setEntityData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.ameerpetit.com/api/entities/items/${entityType}`
            );
            const jsonResponse = await response.json();
            setEntityData(jsonResponse);
        } catch (error) {
            console.error("Error fetching ${entityType}Data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [entityType]);

    // function to delete item from database
    const deleteItem = async (id) => {

        const confirm = window.confirm("Are you sure you want to delete this item?")

        if (confirm) {
            axios.delete(
                `https://api.ameerpetit.com/api/entities/items/${entityType}/${id}`
            ).then(() => {
                alert("Item deleted successfully");
                fetchData();
            }).catch((error) => {
                console.error("Error deleting item:", error);
            });

        }
    };

    return (
        <Container className="py-4">
            <div className='d-flex justify-content-between align-items-center'>   <h1 className='text-theme mb-3 text-capitalize'>{entityType}s</h1>

                <Link to={`/${entityType}/add`} className='bth-theme btn text-capitalize'>Add {entityType}</Link>
            </div>

            {loading ? <p>Loading...</p> :
                <Row className="d-flex justify-content-center align-items-center">
                    {entityData?.length > 0 ? entityData?.map((data) => (

                        <Col sm={6} md={4} xl={3} className='py-2'>
                            <Card className="text-center" style={{ borderRadius: '15px' }}>
                                <Card.Body>
                                    <div className="mt-3 mb-4">
                                        <img
                                            src={data?.data?.profile_img ?? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"}
                                            className="rounded-circle img-fluid"
                                            style={{ width: '100px' }}
                                            alt="Profile"
                                        />
                                    </div>
                                    <h4 className="mb-2">{data?.data?.firstname} {data?.data?.lastname}</h4>
                                    <p className="text-muted mb-4">
                                        @Programmer ~{data?.data?.age}
                                    </p>

                                    <div className="mb-4 pb-2 d-flex justify-content-center gap-2">
                                        <Button className="bth-theme-outline px-2 py-1">
                                            <FaFacebookF className="fs-6" />
                                        </Button>
                                        <Link to={data?.data?.email} target='_blank' className="btn bth-theme-outline px-2 py-1">
                                            <BiEnvelope className="fs-6" />
                                        </Link>
                                        <Button className="bth-theme-outline px-2 py-1">
                                            <FaSkype className="fs-6" />
                                        </Button>
                                    </div>

                                    <div className='d-flex gap-2 justify-content-center'>
                                        <Button onClick={() => deleteItem(data?.id)} className="btn-rounded py-1 d-flex align-items-center justify-content-center btn btn-danger px-2">
                                            <BiTrash className='fs-6' />
                                        </Button>
                                        <Button variant="primary" className="btn-rounded py-1 d-flex align-items-center justify-content-center btn bth-theme">
                                            View Profile
                                        </Button>
                                        <Link to={`/${entityType}/edit/${data?.id}`} className="btn-rounded py-1 d-flex align-items-center justify-content-center btn bth-theme w-auto px-2">
                                            <BiEdit className='fs-6' />
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                    )
                        : <p>No data Found</p>}
                </Row>
            }
        </Container>

    )
}

export default EntityListing
