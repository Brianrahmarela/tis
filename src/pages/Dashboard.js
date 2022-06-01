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
      isLogin: false,
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

  addCart = (value, price, qty, setQty) => {
    const dataLocalStorage = localStorage.getItem("dataUser");
    const data = JSON.parse(dataLocalStorage);
    // console.log("data user addCart", data);
    // console.log("value", value);
    console.log("price msk addCart", price);
    console.log("price msk qty", qty);
    console.log("price msk setQty", setQty);

    let filteredPriceType = price.filter(
      (item, index) => item.priceFor === data.type
    );
    // console.log("filteredPriceType", filteredPriceType);

    let filterPrice = 0;
    filteredPriceType.forEach((element) => {
      return (filterPrice = element.price);
    });
    // console.log("filterPrice", filterPrice);

    let filteredPriceDefault = price.filter(
      (item, index) => item.priceFor !== data.type
    );
    // console.log("filteredPriceDefault", filteredPriceDefault);
    
    let filterDefaultPrice = 0;
    filteredPriceDefault.forEach((element) => {
      return (filterDefaultPrice = element.price);
    });
    // console.log("filterDefaultPrice", filterDefaultPrice);
    
    

    let cart = {
      qty: qty,
      price_account: filterPrice ? filterPrice : filterDefaultPrice,
    }

    cart = {
      id: value.id,
      item: value,
      qty: qty,
      buyer: data.username,
      price_account: filterPrice ? filterPrice : filterDefaultPrice,
      totalPrice: cart.price_account * cart.qty
    }
    console.log('cart', cart)
    axios
    .post(`${API_URL}/Transaction`, cart)
    .then((res) => {
      if(res.data.length === 0){

        swal({
          title: "Sukses Masuk Keranjang!",
          text: `Produk ${cart.item.name} sukses Masuk Keranjang`,
          icon: "success",
          button: false,
        });
      }

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
                    <Items key={item.name} item={item} addCart={this.addCart} />
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
