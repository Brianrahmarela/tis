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
    };
    this.idRes = 0;
    this.noId = 0;
    this.idResMulti = []
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
  componentDidUpdate() {
    console.log("komponen UPDATE JLN");
    console.log("state.cart.length", this.state.cart.length);
    console.log('this.idResMulti', this.idResMulti)

    let qtyCheck = 0;
    for (let x in this.state.cart) {
      qtyCheck += this.state.cart[x].qty;
    }
    // console.log("qtyCheck", qtyCheck);
    // console.log("awal", this.state.cart.length === 1);
    // console.log("qtyCheck === 0", this.state.cart.length === 0);
    // console.log("this.idRes", this.idRes);
    // console.log("this.state.cart", this.state.cart);

    let carStatetId = this.state.cart.filter(
      (item, index) =>
        // console.log("item.noid", item.noid)
        item.noid === this.noId
    );
    console.log("komponen did update: ");
    console.log("item item.noid === this.noId", carStatetId);

    let idSame = 0;
    for (let x in carStatetId) {
      idSame += carStatetId[x].noid;
    }
    console.log("idSame", idSame);

    if (this.state.cart.length === 1 && qtyCheck >= 2) {
      console.log(
        "did update jalan msk if state.cart.length === 1 && qtyCheck >= 2!!",
        this.state.cart.length === 1 && qtyCheck >= 2
      );

      this.updateCart();
    } else if (this.state.cart.length === 1 && this.idRes === 0) {
      console.log(
        "did update jalan msk else if state.cart.length === 1 && this.idRes === 0!!",
        this.state.cart.length === 1 && this.idRes === 0
      );

      this.postCart(this.state.cart[0].item.name);
    } else if (
      (this.state.cart.length === 1 || this.state.cart.length === 0) &&
      this.idRes === idSame
    ) {
      console.log(
        "did update jalan msk else if, cart length === 1 or 0 && this.idRes === idSame!!",
        this.state.cart.length === 1
      );
      console.log("this.idRes", this.idRes);
      console.log("idSame", idSame);

      this.updateCart();
    } else if (this.state.cart.length === 1 && qtyCheck === 1) {
      console.log(
        "did update jalan msk else if state.cart.length === 1 & qtyCheck === 1!!",
        (this.state.cart.length === 1) & (qtyCheck === 1)
      );

      this.updateCart();
      //cek jika id ada
    } else if (this.state.cart.length === 2 && qtyCheck !== 0) {
      console.log(
        "did update jalan msk else if state.cart.length === 2 & qtyCheck !== 0!!",
        this.state.cart.length === 2 && qtyCheck !== 0
      );

      this.updateCart();
    } else {
      console.log("did update jalan msk else!!");
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
      price_account: filterPrice ? filterPrice : filterDefaultPrice,
    };

    cart = {
      noid: value.noid,
      item: value,
      qty: qty,
      buyer: data.username,
      price_account: filterPrice ? filterPrice : filterDefaultPrice,
      totalPrice: cart.price_account * cart.qty,
    };
    console.log("cart", cart);
    console.log("this.idRes", this.idRes);
    console.log("this.noId", this.noId);

    if (this.state.cart.length === 0) {
      // console.log("this.state.cart.length === 0", this.state.cart.length === 0);
      // console.log("msk arr kosong");
      this.setState((prev) => ({
        cart: [cart],
      }));
      // this.postCart();
    } else if (this.state.cart.length === 1 && this.idRes !== 0) {
      console.log("msk length === 1 & this.idRes !== 0");
      if (cart.noid !== this.noId) {
        this.setState((prev) => ({
          cart: [...prev.cart, cart],
        }));
      } else {
        let carStatetId = this.state.cart.filter(
          (item, index) =>
            // console.log("item.noid", item.noid)
            item.noid === cart.noid
        );
        // carStatetId.push(cart);
        console.log("item carStatetId", carStatetId);
        this.setState((prev) => ({
          cart: [cart],
        }));
      }
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
          cart: [carStatetId],
        }));
      } else if (idSame === cart.noid && cart.qty === 1) {
        console.log("id sama!! idSame === cart.noid && cart.qty === 1");

        this.setState((prev) => ({
          cart: [cart],
        }));
      } else {
        console.log("id TIDak sama!!");

        this.setState((prev) => ({
          cart: [...prev.cart, cart],
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
          cart: [...cartStateIdNotSame, cart],
        }));
      } else if (idSame === cart.noid) {
        console.log("else 2 id sama!!");
        carStatetId = cart;

        this.setState((prev) => ({
          cart: [...prev.cart, carStatetId],
        }));
      } else {
        console.log("else 2 id TIDak sama!!");

        this.setState((prev) => ({
          cart: [...prev.cart, cart],
        }));
      }
      // this.updateCart();
    }

    // console.log("this.state.cart.qty ", this.state.cart);

    // if (cart.qty === 1 && this.state.idRes.length === 0) {
    // 	// console.log("qty <= 1");
    // 	console.log("mskk qtyy", qty);
    // 	// console.log(
    // 	// 	cart.qty === 1 && this.state.idRes === this.state.idRes
    // 	// );
    // 	console.log(cart.qty === 1 && this.state.idRes.length === 0);
    // 	console.log("this.idRes", this.state.idRes);

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
    // 				idRes: items,
    // 				isLoading: false
    // 			}));
    // 		})
    // 		.catch((error) => {
    // 			console.log(error);
    // 		});
    // } else if (cart.qty === 1 && this.state.idRes.length !== 0) {
    // 	console.log("MASUKKKK!!");
    // 	console.log(cart.qty === 1 && this.state.idRes.length !== 0);
    // 	axios
    // 		.put(`${API_URL}/Transaction/${cart.id}`, cart)

    // 		.then((res) => {
    // 			console.log("res + qty", res);
    // 			const items = res.data;
    // 			this.setState(() => ({
    // 				idRes: items,
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
    // 				idRes: items,
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
    // 			this.setState({ idRes: [], isLoading: false });
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
    // 				idRes: items,
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
    console.log("this.state.cart.id", this.state.cart.id);
    console.log(
      "this.state.cart.id !== undefined",
      this.state.cart.id !== undefined
    );
    console.log("this.state.cart.id !== null", this.state.cart.id !== null);
    console.log(
      "this.state.cart.id !== undefined || null",
      this.state.cart.id !== undefined || null
    );

    // console.log("payload", payload);
    if (this.state.cart.id !== undefined || null) {
      console.log("state id ada", this.state.cart.id);
    } else {
      axios
        .post(`${API_URL}/Transaction`, ...this.state.cart)
        .then((res) => {
          console.log("res post", res);
          if (res.status === 201) {
            swal({
              title: "Sukses Masuk Keranjang!",
              text: `Produk ${name} sukses Masuk Keranjang`,
              icon: "success",
              button: false,
            });
          }
          const idRes = res.data.id;
          this.idRes = idRes;
          console.log("idRes", idRes);

          const noIdRes = res.data.noid;
          this.noId = noIdRes;
          console.log("noIdRes", noIdRes);
          // this.setState(() => ({
          // 	idRes: items,
          // 	isLoading: false
          // }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  updateCart = () => {
    // console.log("state dashboard:", this.state);
    console.log("msk updateCart, state cart:", this.state.cart);
    // console.log("state cek trans res", this.state.idRes);
    let qtyCheck = 0;
    for (let x in this.state.cart) {
      qtyCheck += this.state.cart[x].qty;
    }

    let cekNoId = false;
    let prev = 0;
    //now(next) id i === 0
    let now = 0;
    let last = 0;
    if(this.state.cart.length > 1){
      console.log('this.idRes', this.idRes)
      console.log('this.noId', this.noId)
      console.log('this.idResMulti', this.idResMulti)

    for (let i = 0, len = this.state.cart.length; i < len; i++) {
      if (i === 0) {
        console.log(
          "First iteration. last item is : " + this.state.cart[len - 1].noid
        );
        console.log("idx ke:", i, "(i = 0)");
        last = this.state.cart[len - 1].noid;
        prev = this.state.cart[i].noid;
        now = this.state.cart[1].noid;
      }
      if (i > 0) {
        console.log("idx ke:", i, "(i = 0)");
        console.log(
          "Now : " +
            this.state.cart[i].noid +
            " and I have access to " +
            this.state.cart[i - 1].noid
        );
        prev = this.state.cart[i - 1].noid;
        now = this.state.cart[i].noid;
      }
      console.log("prev", prev);
      console.log("now", now);
      console.log("last", last);

      if (prev !== now) {
        cekNoId = true;
      } else {
        cekNoId = false;
      }
    }
  }

    console.log("cekNoId", cekNoId);

    if (this.state.cart.length === 0) {
      console.log("kosong");
      // console.log("payload", this.payload)
    } else if (this.idRes === 0) {
      console.log("msk else if this.idRes === 0", this.idRes === 0);
      this.postCart();
    } else if (qtyCheck === 0) {
      console.log("msk else if qtyCheck === 0", qtyCheck === 0);
      this.deleteCart();
    } else if (this.state.cart.length === 2 && cekNoId) {
      console.log("msk else if! length === 2 && cekNoId");
      console.log("state", this.state.cart);
      console.log("this.idRes", this.idRes);
      console.log("this.noId", this.noId);
      let checkId = this.state.cart.find((item) => item.id === this.idRes.noid);
      let id = this.idRes;

      axios
        .delete(`${API_URL}/Transaction/${id}`, checkId)
        .then((res) => {
          console.log("RES DELETE", res);
          const items = res.data;
          console.log("items", items);
          this.setState((prev) => ({
            cart: [],
            isLoading: false,
          }));
          this.idRes = 0;
        })
        .catch((error) => {
          console.log(error);
        });

      let payload = this.state.cart;
      console.log("payload forEach", payload);

      // var resData = null;
      payload.forEach((item, idx, arr) => {
        axios
          .post(`${API_URL}/Transaction`, item)
          .then((res) => {
            console.log("res post update post", res);
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log("item", item);
      });

      axios
        .get(`${API_URL}/Transaction`)
        .then((res) => {
          console.log("res get after delete update", res);

          const items = res.data;
          console.log("item get", items);
          this.setState((prev) => ({
            cart: [...items],
          }));
          let arr = []
          items.forEach((itemId) => arr.push(itemId.id))
          console.log('arr', arr)
          this.idResMulti = [...arr]
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("msk else!");
      let checkId = this.state.cart.find((item) => item.id === this.idRes.noid);
      let id = this.idRes;
      console.log("id", id);
      console.log("checkid", checkId);
      console.log("this.idRes", this.idRes);
      console.log("this.state.cart === 2", this.state.cart.length === 2);
      console.log("this.state.cart", this.state.cart);
      console.log("this.idRes", this.idRes);
      console.log("this.idRes.noid", this.idRes.noid);

      let payload = [];
      let checkIds = null;
      if (this.state.cart.length === 2) {
        console.log(
          "msk if this.state.cart.length === 2",
          this.state.cart.length === 2
        );
        payload = this.state.cart;

        axios
          .delete(`${API_URL}/Transaction/${id}`, checkId)
          .then((res) => {
            console.log("res delete", res);
            const items = res.data;
            console.log("items", items);
            this.setState((prev) => ({
              cart: [],
              isLoading: false,
            }));
            this.idRes = 0;
          })
          .catch((error) => {
            console.log(error);
          });

        console.log("DELETE BEFORE UPDATE");
        console.log("payload", payload);

        // let objDestruc = payload
        payload.forEach((item) => {
          axios
            .post(`${API_URL}/Transaction`, item)
            .then((res) => {
              console.log("res post update post", res);
              // console.log("res.data", res.data);
              let arrData = [];
              let resData = res.data;

              arrData.push(resData);
              console.log("resData", resData);
              console.log("arrData", arrData);

              if (resData.id !== undefined) {
                console.log(
                  "msk if resData.id !== undefined",
                  resData.id !== undefined
                );
                console.log("resData.id", resData.id);

                this.setState((prev) => ({
                  cart: [...prev.cart, res.data],
                }));
                const items = resData.id;
                this.idRes = items;
                console.log("items", items);

                this.idRes = items;
              } else {
                console.log("msk else resData.id undefined", resData.id);
                console.log("resData.id", resData.id);
                this.setState((prev) => ({
                  cart: [res.data],
                }));
              }
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("item", item);
        });

        console.log("payload before post update", payload);
      } else {
        console.log("msk else checkIds", checkIds);
        console.log("payload", payload);
        console.log(" this.state.cart", this.state.cart);

        checkIds = checkId;
        axios
          .put(`${API_URL}/Transaction/${id}`, checkIds)
          .then((res) => {
            console.log("res update", res);
            const items = res.data.id;
            this.idRes = items;
            console.log("items", items);

            this.idRes = items;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const filterIncludeId = this.state.cart.filter((x) =>
        x.hasOwnProperty("id")
      );
      console.log("filterExcludeId", filterIncludeId);
      console.log("checkId", checkIds);
    }
  };

  deleteCart = () => {
    let checkId = this.state.cart.find((item) => item.id === this.idRes.noid);
    let id = this.idRes;
    console.log("msk delete cart :");
    console.log("id", id);
    console.log("checkid", checkId);

    axios
      .delete(`${API_URL}/Transaction/${id}`, checkId)
      .then((res) => {
        console.log("res delete", res);
        const items = res.data;
        console.log("items", items);
        this.setState((prev) => ({
          cart: [],
          isLoading: false,
        }));
        this.idRes = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { items, isLoading } = this.state;
    // console.log("render state cart", this.state.cart);
    console.log("STATE DASHBOARD", this.state);
    console.log("STATE this.idRes", this.idRes);
    console.log("STATE this.noid", this.noId);
    console.log('this.idResMulti', this.idResMulti)

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
            <Cart idRes={this.state.idRes} />
          </Row>
        </Container>
      </div>
    );
  }
}
