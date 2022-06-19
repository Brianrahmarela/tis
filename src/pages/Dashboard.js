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
			isLogin: false
			// cekTrans: 0
		};
		this.cekTrans = 0;
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
	componentDidUpdate() {
		console.log("komponen UPDATE JLN");
		console.log(this.state.cart.length);
		console.log("this.state.cart.length === 1", this.state.cart.length === 1);
		console.log(" this.state.cart[0].qty === 1", this.state.cart);
		// console.log(' this.state.cart[0].qty === 1',  this.state.cart[0].qty)
		let qtyCheck = 0;
		for (let x in this.state.cart) {
			qtyCheck += this.state.cart[x].qty;
		}
		console.log("qtyCheck", qtyCheck);
		console.log("awal", this.state.cart.length === 1);
		console.log("qtyCheck === 0", this.state.cart.length === 0);
		console.log("this.cekTrans", this.cekTrans);
		console.log("this.state.cart", this.state.cart);
		console.log("this.state.cart.noid", this.state.cart.noid);
		console.log(
			this.state.cart.length === 1 && this.cekTrans === this.state.cart.noid
		);
		let carStatetId = this.state.cart.filter(
			(item, index) =>
				// console.log("item.noid", item.noid)
				item.noid === this.cekTrans
		);
		// carStatetId.push(cart);
		console.log("komponen did update: ");
		console.log("item carStatetId", carStatetId);

		let idSame = 0;
		for (let x in carStatetId) {
			idSame += carStatetId[x].noid;
		}
		console.log("idSame", idSame);

		if (this.state.cart.length === 1 && qtyCheck >= 2) {
			console.log(
				"komponen did update jalan msk if!!",
				this.state.cart.length === 1
			);

			this.updateCart();
		} else if (this.state.cart.length === 1 && this.cekTrans === 0) {
			console.log(
				"komponen did update jalan msk else if!!",
				this.state.cart.length === 1
			);

			this.postCart(this.state.cart[0].item.name);
		} else if (this.state.cart.length === 1 && this.cekTrans === idSame) {
			console.log(
				"komponen did update jalan msk else if!!",
				this.state.cart.length === 1
			);

			this.updateCart();
		} else if ((this.state.cart.length === 1) & (qtyCheck === 1)) {
			console.log(
				"komponen did update jalan msk else if!!",
				(this.state.cart.length === 1) & (qtyCheck === 0)
			);

			this.updateCart();
		} else {
			console.log("komponen did update jalan msk else!!");
			this.updateCart();
		}
	}

	addCart = (value, price, qty, setQty) => {
		const dataLocalStorage = localStorage.getItem("dataUser");
		const data = JSON.parse(dataLocalStorage);
		// console.log("data user addCart", data);
		// console.log("value", value);
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
			noid: value.noid,
			item: value,
			qty: qty,
			buyer: data.username,
			price_account: filterPrice ? filterPrice : filterDefaultPrice,
			totalPrice: cart.price_account * cart.qty
		};
		console.log("cart", cart);
		// console.log("this.state", this.state);
		// console.log("this.state.cart", this.state.cart);
		// console.log("cart.id", cart.id);

		if (this.state.cart.length === 0) {
			// console.log("this.state.cart.length === 0", this.state.cart.length === 0);
			// console.log("msk arr kosong");
			this.setState((prev) => ({
				cart: [cart]
			}));
			// this.postCart();
		} else if ((this.state.cart.length === 1) & (this.cekTrans === 1)) {
			console.log("msk length === 1 & this.cekTrans === 2");
			let carStatetId = this.state.cart.filter(
				(item, index) =>
					// console.log("item.noid", item.noid)
					item.noid === cart.noid
			);
			// carStatetId.push(cart);
			console.log("item carStatetId", carStatetId);
			this.setState((prev) => ({
				cart: [cart]
			}));
		} else if (this.state.cart.length === 1) {
			console.log("msk arr sudah terisi");
			let carStatetId = this.state.cart.filter(
				(item, index) =>
					// console.log("item.noid", item.noid)
					item.noid === cart.noid
			);
			// carStatetId.push(cart);
			console.log("item carStatetId", carStatetId);
			console.log("item carStatetId", carStatetId.id);
			console.log("cart.noid", cart.noid);

			let idSame = 0;
			for (let x in carStatetId) {
				idSame += carStatetId[x].noid;
			}
			console.log("idsame", idSame);
			if (idSame === cart.noid && cart.qty >= 2) {
				console.log("id sama, cart.qty === 2!!", cart.qty === 2);
				carStatetId = cart;
				console.log("item carStatetIddd", carStatetId);
				this.setState((prev) => ({
					cart: [carStatetId]
				}));
			} else if (idSame === cart.noid && cart.qty === 1) {
				console.log("id sama!! idSame === cart.noid && cart.qty === 1");

				this.setState((prev) => ({
					cart: [cart]
				}));
			} else {
				console.log("id TIDak sama!!");

				this.setState((prev) => ({
					cart: [...prev.cart, cart]
				}));
			}
			// this.updateCart();
		} else if (this.state.cart.length > 1) {
			console.log("msk length > 1");
			let carStatetId = this.state.cart.filter(
				(item, index) =>
					// console.log("item.noid", item.noid)
					item.noid === cart.noid
			);
			// carStatetId.push(cart);
			console.log("item carStatetId", carStatetId);
			console.log("item carStatetId", carStatetId.id);
			console.log("cart.noid", cart.noid);

			let idSame = 0;
			for (let x in carStatetId) {
				idSame += carStatetId[x].noid;
			}
			console.log("idsame", idSame);
			if (idSame === cart.noid) {
				console.log("else 2 id sama!! & length > 1");

				let cartStateIdNotSame = this.state.cart.filter(
					(item, index) => item.noid !== cart.noid
				);
				console.log("cartStateIdNotSame", cartStateIdNotSame);

				this.setState((prev) => ({
					cart: [...cartStateIdNotSame, cart]
				}));
			} else if (idSame === cart.noid) {
				console.log("else 2 id sama!!");
				carStatetId = cart;

				this.setState((prev) => ({
					cart: [...prev.cart, carStatetId]
				}));
			} else {
				console.log("else 2 id TIDak sama!!");

				this.setState((prev) => ({
					cart: [...prev.cart, cart]
				}));
			}
			// this.updateCart();
		}

		// console.log("this.state.cart.qty ", this.state.cart);

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

	postCart = (name) => {
		console.log("msk postCart, statenya:", this.state.cart);
		console.log("tes des", ...this.state.cart);
		// let payload = [...this.state.cart];

		// console.log("payload", payload);

		axios
			.post(`${API_URL}/Transaction`, ...this.state.cart)
			.then((res) => {
				console.log("res", res);
				if (res.status === 201) {
					swal({
						title: "Sukses Masuk Keranjang!",
						text: `Produk ${name} sukses Masuk Keranjang`,
						icon: "success",
						button: false
					});
				}
				const items = res.data.id;
				this.cekTrans = items;
				console.log("items", items);
				// this.setState(() => ({
				// 	cekTrans: items,
				// 	isLoading: false
				// }));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	updateCart = () => {
		console.log("state dashboard:", this.state);
		console.log("msk updateCart, state cart:", this.state.cart);
		// console.log("state cek trans res", this.state.cekTrans);
		if (this.state.cart.length === 0) {
			console.log("kosong");
		} else if (this.cekTrans === 0) {
			this.postCart();
		} else {
			let checkId = this.state.cart.find(
				(item) => item.id === this.cekTrans.noid
			);
			let id = checkId.noid;
			console.log("id", id);
			console.log("checkid", checkId);
			axios
				.put(`${API_URL}/Transaction/${id}`, checkId)
				.then((res) => {
					console.log("res update", res);
					// const items = res.data.id;
					// this.cekTrans = items
					// console.log('items', items)

					// this.setState(() => ({
					// 	cekTrans: items,
					// 	isLoading: false
					// }));
				})
				.catch((error) => {
					console.log(error);
				});
		}

		// let id = 0;
		// checkId.forEach((element) => {
		// 	return (id = element.id);
		// });
		// console.log("checkId", checkId);
		// let { id } = checkId;
		// console.log("id found", id);
		// console.log("checkId.id", checkId.buyer);
		// if (
		// 	this.state.cart.length > 1 &&
		// 	this.state.cekTrans.id === this.state.cart[0]
		// ) {
		// 	console.log("MASUKKKK!!");

		// 	axios
		// 		.put(
		// 			`${API_URL}/Transaction/${this.state.cekTrans.id}`,
		// 			...this.state.cart
		// 		)
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
		// }
	};

	render() {
		const { items, isLoading } = this.state;
		console.log("render state cart", this.state.cart);
		console.log("STATE DASHBOARD", this.state);
		console.log("this.cekTrans", this.cekTrans);

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
