import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const DynamicForm = ({ schemas, onSubmit }) => {


  const [formData, setFormData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <JsonForms
        data={schemas?.data && Object.keys(schemas?.data).length > 0 ? schemas?.data : undefined}
        schema={schemas?.schema && Object.keys(schemas?.schema).length > 0 ? schemas?.schema : undefined}
        uischema={schemas?.uischema && Object.keys(schemas?.uischema).length > 0 ? schemas?.uischema : undefined}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => { if (data) setFormData(data) }}
      />

      <Button className="bth-theme ms-auto d-block w-auto" type="submit">
        Submit
      </Button>
    </Form>
  );
};
