import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from 'react-router-dom';

function ListCategories() {
  let navigate = useNavigate();

  const dataLocalStorage = localStorage.getItem("dataUser");
  let dataLocalStorageIsLogin = localStorage.getItem("is Login");
  dataLocalStorageIsLogin = !!dataLocalStorageIsLogin;
  const data = JSON.parse(dataLocalStorage);
  // console.log("dataLocalStorageIsLogin", dataLocalStorageIsLogin);
  // console.log("List Categories");
  // console.log("data", data);

  const handleLogout = () => {
    console.log('ke klik')
    
    axios.delete(`${API_URL}/Buyers/${data.id}`)
    .then((res) => {
      console.log('res', res)
      localStorage.clear();
      navigate("/");


    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <Col md={2} mt="2">
      <h4>
        <p>
          Hi <strong>{data.username}!</strong>
        </p>
        <p>
          Akun anda: <strong>{data.type}</strong>
        </p>
      </h4>
      {dataLocalStorageIsLogin ? (
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      ) : (
        ""
      )}

      <hr />
    </Col>
  );
}

export default ListCategories;
