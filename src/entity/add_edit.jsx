import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DynamicForm } from "../DynamicForm";
import axios from "axios";

const EntityAddEdit = () => {
    const params = useParams();
    const entityType = params.type;
    const entityId = params.id;

    const navigate = useNavigate()

    const [schemas, setSchemas] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);


    const currentHost = window.location.hostname;


    useEffect(() => {
        const fetchSchema = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.ameerpetit.com/api/entities/schemas/${currentHost}/${entityType}/`
                ).then(response => {
                    setSchemas(response?.data);
                    if (entityType && entityId) populateForm();
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (entityType) fetchSchema();

        const populateForm = async () => {
            setLoadingData(true);
            try {
                const response = await axios.get(
                    `https://api.ameerpetit.com/api/entities/items/${entityType}/${entityId}`
                )
                console.log(response?.data.data);
                setSchemas((prev) => ({
                    ...prev,
                    data: response?.data.data
                }));

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingData(false);
            }
        };




    }, [entityType, entityId]);

    const handleSubmit = (formData) => {
        const reqData = {
            type: entityType,
            name: "submitted_data",
            data: formData,
            host: currentHost,
        };


        if (entityId) {
            axios
                .put(`https://api.ameerpetit.com/api/entities/items/${entityType}/${entityId}`, reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                })
                .then((response) => {
                    console.log("Response:", response.data);
                    navigate(`/${entityType}/listing`)
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        } else {
            axios
                .post(`https://api.ameerpetit.com/api/entities/items/`, reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                })
                .then((response) => {
                    console.log("Response:", response.data);
                    navigate(`/${entityType}/listing`)
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        }
    };




    return (
        <Container fluid="lg" className="shadow-lg py-4 px-5 my-5">
            <Row>
                <Col md={12}>
                    <h1 className="text-center text-theme text-capitalize">
                        {entityId ? "Edit" : "Add a"}&nbsp;{schemas?.display_name ?? schemas?.name ?? entityType ?? ""}
                    </h1>
                </Col>
                <Col md={12}>
                    {loadingData || loading ? (
                        <p className="text-center p-3">Loading Data Please wait...</p>
                    ) : (
                        <DynamicForm schemas={schemas} onSubmit={handleSubmit} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EntityAddEdit;
