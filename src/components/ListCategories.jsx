import React, { Component } from "react";
import { Col } from "react-bootstrap";

function ListCategories() {
  const dataLocalStorage = localStorage.getItem("dataUser");
  const data = JSON.parse(dataLocalStorage);
  // console.log("List Categories");
  // console.log("data", data);
  return (
    <Col md={2} mt="2">
      <h4>
        <p>
          Hi <strong>{data.username}!</strong>
        </p>
          <p>Akun anda:  <strong>
		{data.type}
        </strong></p> 
       
      </h4>
      <hr />
    </Col>
  );
}

export default ListCategories;
