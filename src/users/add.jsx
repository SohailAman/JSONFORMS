import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DynamicForm } from "../DynamicForm";
import axios from "axios";

const AddUsers = () => {
    const params = useParams();

    const entityType = params.type;


    const [schemas, setSchemas] = useState({});
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(
                    `https://api.ameerpetit.com/api/entities/schemas/${entityType}/`
                ).them((data) => {
                    setSchemas(data);
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (entityType) fetchData();
    }, [entityType]);

    const handleSubmit = (formData) => {
        const reqData = {
            type: entityType,
            name: "submitted_data",
            data: formData,
            host: window.location.hostname,
            header: {
                host: window.location.hostname,
                userId: "superadmin@ameerpetit.com",
            },
        };

        axios
            .post(`https://api.ameerpetit.com/api/entities/items/`, reqData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
            })
            .then((response) => {
                console.log("Response:", response.data);
                alert("Form submitted successfully!");
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
            });
    };

    return (
        <Container fluid="lg" className="shadow-lg py-4 px-5 my-5">
            <Row>
                <Col md={12}>
                    <h1 className="text-center text-theme">
                        Add a
                        {" "}
                        {schemas?.display_name ?? schemas?.name ?? entityType ?? "JSON FORM"}
                    </h1>
                </Col>
                <Col md={12}>
                    {loading ? (
                        <p className="text-center p-3">Loading Data Please wait...</p>
                    ) : (
                        <DynamicForm schemas={schemas ?? null} onSubmit={handleSubmit} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AddUsers;
