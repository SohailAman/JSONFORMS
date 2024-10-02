import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

export const DynamicForm = ({ formData, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <JsonForms
        data={formData.data}
        schema={formData.schema}
        uischema={formData.uischema}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => onSubmit(data)}
      />
      <Button className="bth-theme ms-auto d-block w-auto" type="submit">
        Submit
      </Button>
    </Form>
  );
};
