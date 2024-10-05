import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form'; // Make sure to import useForm
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    display_name: Yup.string()
        .required("Display Name is required"),
    host: Yup.string()
        .required("Host Name is required"),
    schema: Yup.string()
        .required("Schema is required"),
});

const AddSchema = () => {
    const params = useParams()
    const entityId = params.id

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.ameerpetit.com/api/entities/schemas/${window.location.hostname}/${entityId}`
                );
                const data = await response.json();
                const entityData = data

                setValue("name", entityData?.type)
                setValue("display_name", entityData?.display_name)
                setValue("host", entityData?.host)
                setValue("schema", JSON.stringify(entityData?.schema, null, 2))
                setValue("uischema", JSON.stringify(entityData?.uischema, null, 2))
                setValue("data", JSON.stringify(entityData?.data, null, 2))

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (entityId) fetchData();
    }, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data);
        const reqData = {
            type: data?.name,
            name: data?.name,
            display_name: data?.display_name,
            schema: data?.schema ? JSON.parse(data?.schema) : null,
            uischema: data?.uischema ? JSON.parse(data?.uischema) : null,
            data: data?.data ? JSON.parse(data?.data) : {},
            host: data?.host,
        };
        if (entityId) {
            axios
                .put(`https://api.ameerpetit.com/api/entities/schemas/${entityId}/`, reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                })
                .then((response) => {
                    console.log("Response:", response.data);
                    alert("Schema Updated successfully!");
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        }
        else {
            axios
                .post(`https://api.ameerpetit.com/api/entities/schemas`, reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                })
                .then((response) => {
                    console.log("Response:", response.data);
                    alert("Schema successfully!");
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        }
    };

    return (
        <Container>
            {loading ? "Loading..." : <div className="shadow-sm p-3 my-5">
                <h1 className="text-center text-theme">
                    Add a New Schema
                </h1>

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-3" controlId="formGroupName">
                        <FormLabel>Name/Type</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your name..."
                            {...register("name")}
                            isInvalid={!!errors.name}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.name?.message}
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formGroupName">
                        <FormLabel>Display Name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your display_name..."
                            {...register("display_name")}
                            isInvalid={!!errors.display_name}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.display_name?.message}
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formGroupName">
                        <FormLabel>Host Name</FormLabel>
                        <FormControl
                            defaultValue={window.location.hostname}
                            type="text"
                            placeholder="Enter your host..."
                            {...register("host")}
                            isInvalid={!!errors.host}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.host?.message}
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formGroupSchema">
                        <FormLabel>Schema</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={5}
                            placeholder="Enter your schema..."
                            {...register("schema")}
                            isInvalid={!!errors.schema}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.schema?.message}
                        </FormControl.Feedback>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formGroupUiSchema">
                        <FormLabel>UI Schema</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={5}
                            type="schema"  // Changed type to "schema"
                            placeholder="Enter your uischema..."
                            {...register("uischema")}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formGroupData">
                        <FormLabel>Data</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={5}
                            type="data"  // Changed type to "data"
                            placeholder="Enter your data confirmation..."
                            {...register("data")}
                        />
                    </FormGroup>

                    <div className="d-grid my-5">
                        <Button variant="primary" className='btn bth-theme' type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>}
        </Container>
    );
}

export default AddSchema;
