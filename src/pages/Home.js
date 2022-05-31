import React, { Component } from "react";
import { ListCategories, NavbarComponent, Result, Items } from "../components";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import {Switch, Route, Redirect} from 'react-router-dom'
import { API_URL } from "../utils/constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { getValue } from "@testing-library/user-event/dist/utils";
import swal from "sweetalert";

//pages
import Login from "../pages/Login";

function Home() {

    const history = useHistory();

 const handleSubmit = () => {
    
        history.push("/login");
 
  };


    return (
        <div className="mt-3">
        <div onClick={handleSubmit}>

          <p>login here</p>
        </div>
        </div>
    );
}

export default Home;

