import React from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../utils/constants";
// import { useLocation } from "react-router-dom";

function Login(props) {
	// const location = useLocation();
	// console.log('location.state.', location.state)    
  let navigate = useNavigate();
    const [dataUser, setdataUser] = useState({
    id: 1,
    username: "",
    password: "",
    type: "",
  });
  // const [isLogin, setIsLogin] = useState(false)
  // console.log("state dataUser", dataUser);

  const handleChange = (e) => {
    // console.log("handleChange jln");

    // console.log(e);
    setdataUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      type:
        e.target.value === "Budi"
          ? "VIP"
          : e.target.value === "Dipta"
          ? "wholesale"
          : "regular",
    }));
  };
  const handleChangePass = (e) => {
    // console.log("handleChangePass jln");
    setdataUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      type:
        dataUser.username === "Budi"
          ? "VIP"
          : dataUser.username === "Dipta"
          ? "wholesale"
          : "regular",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.setIsLogin(true);
    // console.log("data user submit", dataUser);

    setdataUser((prevState) => ({
        ...prevState,
        id: prevState.id + 1
      }));
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
    localStorage.setItem("is Login", true);
    // props.setIsLogin(true);

    axios
      .post(`${API_URL}/Buyers`, dataUser)
      .then((res) => {
        // console.log("res post", res);
        navigate("/dashboard");
 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="my-5">
      <Card.Title>Login</Card.Title>
      <Row className="justify-content-md-center">
        <Form className="mx-auto">
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={dataUser.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={dataUser.password}
              onChange={handleChangePass}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            login
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
