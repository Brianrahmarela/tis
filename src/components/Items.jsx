import React, { useState } from "react";
import { Col, Card, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const Items = ({ item, addCart }) => {
  // console.log("item", item);
  // console.log("addCart", addCart);
  const dataLocalStorage = localStorage.getItem("dataUser");
  const data = JSON.parse(dataLocalStorage);
  // console.log('data local', data)

  let [qty, setQty] = useState(0);
  console.log("STATE qty", qty);

  let filteredVIP = item.prices.filter(
    (item, index) => item.priceFor !== "wholesale"
  );
  // console.log("filteredVIP", filteredVIP);

  let filteredWhole = item.prices.filter(
    (item, index) => item.priceFor !== "VIP"
  );
  // console.log("filteredWhole", filteredWhole);

  let filteredRegular = item.prices.filter(
    (item, index) => item.priceFor === "regular"
  );
  // console.log("filteredWhole", filteredWhole);

  let handeQtyPlus = () => {
    setQty((qty += 1));
  };
  let handeQtyMin = () => {
    if (qty > 0) {
      setQty((qty -= 1));
    }
  };

  return (
    <Col>
      <Card
        className="shadow mb-4"
        onClick={() =>
          addCart(
            item,
            data.type === "VIP"
              ? filteredVIP
              : data.type === "wholesale"
              ? filteredWhole
              : filteredRegular,
            qty,
            setQty
          )
        }
      >
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>
            <strong>{item.name}</strong>
          </Card.Title>
          <Card.Text>{item.description}</Card.Text>
          {data.type === "VIP"
            ? filteredVIP.map((prices, index) => (
                <Card.Text key={index}>
                  {prices.priceFor === "VIP" ? (
                    <strong>Rp. {numberWithCommas(prices.price)}</strong>
                  ) : (
                    <>Rp. {numberWithCommas(prices.price)}</>
                  )}{" "}
                  {prices.priceFor === "VIP" ? (
                    <strong>({prices.priceFor})</strong>
                  ) : (
                    prices.priceFor
                  )}
                </Card.Text>
              ))
            : data.type === "wholesale"
            ? filteredWhole.map((prices, index) => (
                <Card.Text key={index}>
                  {prices.priceFor === "wholesale" ? (
                    <strong>Rp. {numberWithCommas(prices.price)}</strong>
                  ) : (
                    <>Rp. {numberWithCommas(prices.price)}</>
                  )}{" "}
                  {prices.priceFor === "wholesale" ? (
                    <strong>({prices.priceFor})</strong>
                  ) : (
                    prices.priceFor
                  )}
                </Card.Text>
              ))
            : filteredRegular.map((prices, index) => (
                <>
                  <Card.Text key={index}>
                    {prices.priceFor === "regular" ? (
                      <strong>Rp. {numberWithCommas(prices.price)}</strong>
                    ) : (
                      <>Rp. {numberWithCommas(prices.price)}</>
                    )}{" "}
                    {prices.priceFor === "regular" ? (
                      <strong>({prices.priceFor})</strong>
                    ) : (
                      prices.priceFor
                    )}
                  </Card.Text>
                </>
              ))}
          <div className="d-flex flex-row align-items-center pr-2">
            <div style={{ paddingRight: 10 }}>
              {" "}
              <button onClick={handeQtyPlus}>
                <strong>+</strong>
              </button>
            </div>
            <div style={{ paddingRight: 10 }}>
              <h5 style={{ margin: 0, padding: 0 }}>{qty}</h5>
            </div>
            <div>
              {" "}
              <button onClick={handeQtyMin}>
                <strong>-</strong>
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Items;
