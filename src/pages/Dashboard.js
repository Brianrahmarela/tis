import React, { Component } from "react";
import { ListCategories, Result, Items } from "../components";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoading: true,
      cart: [],
      isLogin: false
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/Items`)
      .then((res) => {
        const items = res.data;
        this.setState({ items: items, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addCart = (value) => {
    // console.log('value', value)
    const priceAccount = value.prices.map((item, idx) => item)
    // console.log('priceAccount', priceAccount)

    const cart = {
      id: value.id,
      item: value,
      qty: 1,
      buyer: "xx",
      price_account: priceAccount
    }
    axios
    .post(`${API_URL}/Transaction`, cart)
    .then((res) => {
      // if(res.data.length === 0){
        
      // }
      swal({
        title: "Sukses Masuk Keranjang!",
        text: `Produk ${cart.item.name} sukses Masuk Keranjang`,
        icon: "success",
        button: false,
      });

    })
    .catch((error) => {
      console.log(error);
    });
  };

  render() {
    const { items, isLoading } = this.state;
    // console.log(this.state);
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {items && isLoading === false ? (
                    items.map((item, index) => (
                      <Items key={item.name} item={item} addCart={this.addCart}/>
                    ))
                  ) : (
                    <Spinner animation="border" />
                  )}
                </Row>
              </Col>
              <Result />
            </Row>
          </Container>
        </div>
    );
  }
}
