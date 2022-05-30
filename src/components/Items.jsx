import React from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const Items = ({ item }) => {
	console.log("item", item);
	return (
		<Col>
			<Card className="shadow">
				<Card.Img variant="top" src={item.image} />
				<Card.Body>
					<Card.Title>
						<strong>{item.name}</strong>
					</Card.Title>
					<Card.Text>{item.description}</Card.Text>
					{item.prices.map((prices, index) =>
						prices.priceFor === "VIP" ? (
							<Card.Text>Rp. {numberWithCommas(prices.price)} (VIP)</Card.Text>
						) : prices.priceFor === "regular" ? (
							<Card.Text>
								Rp. {numberWithCommas(prices.price)} (Regular)
							</Card.Text>
						) : prices.priceFor === "wholesale" ? (
							<Card.Text>
								Rp. {numberWithCommas(prices.price)} (Wholesale)
							</Card.Text>
						) : (
							""
						)
					)}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Items;
