import React, { Component } from "react";
import { ListCategories, Cart, Items } from "../components";
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
			cekTrans: []
		};
	}

	componentDidMount() {
		axios
			.get(`${API_URL}/Items`)
			.then((res) => {
				// console.log("res Items", res);

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
		console.log("value", value);
		// console.log("price msk addCart", price);
		// console.log("price msk qty", qty);
		// console.log("price msk setQty", setQty);

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
			price_account: filterPrice ? filterPrice : filterDefaultPrice
		};

		cart = {
			id: value.id,
			item: value,
			qty: qty,
			buyer: data.username,
			price_account: filterPrice ? filterPrice : filterDefaultPrice,
			totalPrice: cart.price_account * cart.qty
		};
		console.log("cart", cart);
		// console.log("this.cekTrans", this.state.cekTrans);
		// console.log("cart qtyy", cart.qty);

		// let newCart = [];
		// console.log("newCart atas", newCart);
		// let cartId = newCart.filter((item, index) => index === item.id);
		// console.log("cartId", cartId);
		// if (cart.id !== cartId) {
		// 	console.log("id not same");
		// }
		// newCart.push(cart);
		// console.log("newCart bwh", newCart);
		console.log("this.state", this.state);
		console.log("this.state.cart", this.state.cart);
		console.log("cart.id", cart.id);

		// let newCart = [];
		// newCart.push(carStatetId);

		if (this.state.cart.length === 0) {
			console.log("this.state.cart.length === 0", this.state.cart.length === 0);
			console.log("msk arr kosong");
			this.setState((prev) => ({
				cart: [...prev.cart, cart]
			}));
		}
		// else if (cart.qty >= 1) {
		// 	console.log("msk arr >= 1", cart.qty >= 1);

		// 	let found = this.state.cart.filter(
		// 		(item, index) =>
		// 			// console.log("item.id", item.id)
		// 			item.id === cart.id
		// 	);
		// 	found = cart;
		// 	// found.push(cart);
		// 	console.log("item found", found);
		// 	this.setState((prev) => ({
		// 		cart: cart
		// 	}));
		// }
		else if (this.state.cart.length >= 1) {
			console.log("msk arr sudah terisi");
			let carStatetId = this.state.cart.filter(
				(item, index) =>
					// console.log("item.id", item.id)
					item.id !== cart.id
			);
			carStatetId.push(cart);
			console.log("item carStatetId", carStatetId);

			this.setState((prev) => ({
				cart: carStatetId
			}));
		}

		console.log("this.state.cart.qty ", this.state.cart);

		// if (cart.qty === 1 && this.state.cekTrans.length === 0) {
		// 	// console.log("qty <= 1");
		// 	console.log("mskk qtyy", qty);
		// 	// console.log(
		// 	// 	cart.qty === 1 && this.state.cekTrans === this.state.cekTrans
		// 	// );
		// 	console.log(cart.qty === 1 && this.state.cekTrans.length === 0);
		// 	console.log("this.cekTrans", this.state.cekTrans);

		// 	axios
		// 		.post(`${API_URL}/Transaction`, cart)
		// 		.then((res) => {
		// 			console.log("res", res);
		// 			if (res.status === 201) {
		// 				swal({
		// 					title: "Sukses Masuk Keranjang!",
		// 					text: `Produk ${cart.item.name} sukses Masuk Keranjang`,
		// 					icon: "success",
		// 					button: false
		// 				});
		// 			}
		// 			const items = res.data;
		// 			this.setState(() => ({
		// 				cekTrans: items,
		// 				isLoading: false
		// 			}));
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// } else if (cart.qty === 1 && this.state.cekTrans.length !== 0) {
		// 	console.log("MASUKKKK!!");
		// 	console.log(cart.qty === 1 && this.state.cekTrans.length !== 0);
		// 	axios
		// 		.put(`${API_URL}/Transaction/${cart.id}`, cart)

		// 		.then((res) => {
		// 			console.log("res + qty", res);
		// 			const items = res.data;
		// 			this.setState(() => ({
		// 				cekTrans: items,
		// 				isLoading: false
		// 			}));
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// 	if (cart.qty === cart.qty + 1) {
		// 		console.log("plus 1!");
		// 	}
		// } else if (qty > 1) {
		// 	console.log("qty > 1");
		// 	console.log("qtyy", qty);

		// 	cart = {
		// 		id: value.id,
		// 		item: value,
		// 		qty: qty,
		// 		buyer: data.username,
		// 		price_account: filterPrice ? filterPrice : filterDefaultPrice,
		// 		totalPrice: cart.price_account * cart.qty
		// 	};
		// 	console.log("cart patch", cart);
		// 	axios
		// 		.put(`${API_URL}/Transaction/${cart.id}`, cart)

		// 		.then((res) => {
		// 			console.log("res + qty", res);
		// 			const items = res.data;
		// 			this.setState(() => ({
		// 				cekTrans: items,
		// 				isLoading: false
		// 			}));
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// } else if (qty === 0) {
		// 	console.log("qty == 0");
		// 	console.log("qtyy", qty);
		// 	axios
		// 		.delete(`${API_URL}/Transaction/${cart.id}`)
		// 		.then((res) => {
		// 			console.log("res qty == 0", res);
		// 			// const items = res.data;
		// 			this.setState({ cekTrans: [], isLoading: false });
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// } else {
		// 	axios
		// 		.post(`${API_URL}/Transaction`, cart)
		// 		.then((res) => {
		// 			console.log("res", res);
		// 			if (res.status === 201) {
		// 				swal({
		// 					title: "Sukses Masuk Keranjang!",
		// 					text: `Produk ${cart.item.name} sukses Masuk Keranjang`,
		// 					icon: "success",
		// 					button: false
		// 				});
		// 			}
		// 			const items = res.data;
		// 			this.setState(() => ({
		// 				cekTrans: items,
		// 				isLoading: false
		// 			}));
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }
	};

	render() {
		const { items, isLoading } = this.state;
		console.log("render state cart", this.state.cart);
		console.log("state dashboard", this.state);
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
						<Cart cekTrans={this.state.cekTrans} />
					</Row>
				</Container>
			</div>
		);
	}
}
