import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DynamicForm } from "./DynamicForm";
import "./App.css";
import axios from "axios";

const App = () => {
  const [schemas, setSchemas] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData();
  }, []);



  const id = `66fdc0a2600909ecccb2296b`

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.ameerpetit.com/api/entities/items/schema/${id}`);
      const data = await response.json();
      setSchemas(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };





  const handleSubmit = (formData) => {
    const reqData = {
      type: schemas?.name,
      name: "submitted_data",
      data: formData,
      "header": {
        host: window.location.hostname,
        "userId": "superadmin@ameerpetit.com"
      },
    }

    axios.post(`https://api.ameerpetit.com/api/entities/items`, reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*',
        },
      }
    ).then((response) => {
      console.log("Response:", response.data);
      alert("Form submitted successfully!")
    }).catch((error) => { console.error("Error submitting form:", error); })
  };



  return (
    <Container fluid="lg" className="shadow-lg py-4 px-5 my-5">
      <Row>
        <Col md={12}>
          <h1 className="text-center text-theme"> {schemas?.name ?? "JSON FORM"}</h1>
          {loading ? "Loading Data Please wait..." : <DynamicForm schemas={schemas} onSubmit={handleSubmit} />}
        </Col>
      </Row>
    </Container>
  );
};

export default App;

