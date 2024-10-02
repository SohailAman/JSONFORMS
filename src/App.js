import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DynamicForm } from "./DynamicForm";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://api.ameerpetit.com/api/entities/items/jsonform/66fcf4fd3a366a8c48d82d3b");
      const data = await response.json();
      setFormData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };



  return (
    <Container fluid="lg" className="shadow-lg py-4 px-5 my-5">
      <Row>
        <Col md={12}>
          <h1 className="text-center text-theme">JSON FORM</h1>
          {loading ? "Loading Data Please wait..." : <DynamicForm formData={formData} onSubmit={handleSubmit} />}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
