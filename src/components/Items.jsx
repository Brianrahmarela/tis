import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const Items = ({ item, addCart }) => {
  // console.log("item", item);
  // console.log("addCart", addCart);
  const dataLocalStorage = localStorage.getItem("dataUser");
  const data = JSON.parse(dataLocalStorage);
  // console.log('data', data)

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

  return (
    <Col>
      <Card className="shadow" onClick={() => addCart(item)}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>
            <strong>{item.name}</strong>
          </Card.Title>
          <Card.Text>{item.description}</Card.Text>
          {data.type === "VIP"
            ? filteredVIP.map((prices, index) => (
                <Card.Text>
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
                <Card.Text>
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
                <Card.Text>
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
              ))}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Items;
