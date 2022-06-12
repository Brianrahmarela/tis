import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Cart = (props) => {
	// console.log("props cart", props);
	return (
		<div className="mt-3">
			<Container fluid>
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
									{props.cekTrans.item ? props.cekTrans.item.name : "No data"}
								</p>
								<p>
									<strong>Quantity : </strong>{" "}
									{props.cekTrans.qty ? props.cekTrans.qty : "No data"}
								</p>
								<p>
									<strong>
										Total Price : Rp.{" "}
										{numberWithCommas(
											props.cekTrans.totalPrice
												? props.cekTrans.totalPrice
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
			</Container>
		</div>
	);
};

export default Cart;
