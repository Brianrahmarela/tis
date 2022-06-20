import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Cart = (props) => {
	// console.log("props cart", props);
	return (
		<div className="mt-3">
			{/* <Container fluid>
				<Row>
					<Col>
						<h4>
							<strong>Cart</strong>
						</h4>
						<hr />
						{props ? (
							<Row className="d-flex flex-direction-column">
								<p>
									<strong>Item Name : </strong>{" "}
									{props.idRes.item ? props.idRes.item.name : "No data"}
								</p>
								<p>
									<strong>Quantity : </strong>{" "}
									{props.idRes.qty ? props.idRes.qty : "No data"}
								</p>
								<p>
									<strong>
										Total Price : Rp.{" "}
										{numberWithCommas(
											props.idRes.totalPrice
												? props.idRes.totalPrice
												: "No data"
										)}{" "}
									</strong>
								</p>
							</Row>
						) : (
							<></>
						)}
					</Col>
				</Row>
			</Container> */}
		</div>
	);
};

export default Cart;
