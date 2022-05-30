import React, { Component } from "react";
import { ListCategories, NavbarComponent, Result, Items } from "./components";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { API_URL } from "./utils/constants";
import axios from "axios";
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			isLoading: true,
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

	render() {
		const { items, isLoading } = this.state;
		console.log(this.state);
		return (
			<div className="App">
				<NavbarComponent />
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
											<Items key={item.name} item={item} />
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
			</div>
		);
	}
}
