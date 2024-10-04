import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DynamicForm } from "./DynamicForm";
import "./App.css";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Schemas from "./users/listing";

const App = () => {
  return (
    <>
      <Schemas />
    </>
  )
}

export default App;

