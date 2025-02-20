import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import department from "../Component/departdata";
import Image from "next/image";
import { useRouter } from "next/router";
import { useStateValue } from "../Component/StateProvider";
const axios = require("axios");

function books() {
  const [dept, setdept] = useState([]);
  const [{ cart }, dispatch] = useStateValue();
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState();
  const { query } = useRouter();
  const router = useRouter();

  const findCount = (_id) => {
    const index =  cart.findIndex((item) => {
      return (item.id == _id)
    })
    console.log(cart)
    if(index != -1) {
      return cart[index].count;

    }else {
      return 0;
    }
    // console.log(index);

    // return 0;
  };

  const findIndex = (_id) => {
    const index =  cart.findIndex((item) => {
      return (item.id == _id)
    })
    // console.log(cart)
    return index;
  }

  useEffect(() => {
    // const para = String(query.dep);
    if (query.dep) {
      run(query.dep, 1);
    }
    // router.replace(`/books#${query.dep}`)
    console.log(query.dep);

    // setRefresh(false);
  }, [query.dep]);

  useEffect(() => {
    // setRefresh(false);
  }, []);

  const run = async (na, id) => {
    const depname = String(na);
    console.log(depname);
    document.getElementById(depname).scrollIntoView();

    const response = await axios.get(
      `http://localhost:3000/api/hello?dep=${na}&sem=${id}`
    );
    setSelected(na + "_" + id);
    setdept(response.data.data);
    console.log(depname);
  };
  return (
    <>
      <div className={styles.booksmain}>
        <div className={styles.sidemenu}>
          {department.map((name) => {
            return (
              <>
                <ul
                  style={{ fontSize: "14px" }}
                  id={name}
                  className={name}
                  // className={styles.sidemenuUl}
                >
                  <h3>{name}</h3>
                  <li
                    key={`${name}` + "_1"}
                    id={name + "_1"}
                    style={{
                      color: name + "_1" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_1" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 1)}
                  >
                    Sem-&#x2160; &#38; Sem-&#x2161;
                  </li>
                  <li
                    key={`${name}` + "_3"}
                    id={name + "_3"}
                    style={{
                      color: name + "_3" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_3" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 3)}
                  >
                    Sem-&#x2162;
                  </li>
                  <li
                    key={`${name}` + "_4"}
                    id={name + "_4"}
                    style={{
                      color: name + "_4" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_4" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 4)}
                  >
                    Sem-&#x2163;
                  </li>
                  <li
                    key={`${name}` + "_5"}
                    id={name + "_5"}
                    style={{
                      color: name + "_5" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_5" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 5)}
                  >
                    Sem-&#x2164;
                  </li>
                  <li
                    key={`${name}` + "_6"}
                    id={name + "_6"}
                    style={{
                      color: name + "_6" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_6" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 6)}
                  >
                    Sem-&#x2165;
                  </li>
                  <li
                    key={`${name}` + "_7"}
                    id={name + "_7"}
                    style={{
                      color: name + "_7" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_7" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 7)}
                  >
                    Sem-&#x2166;
                  </li>
                  <li
                    key={`${name}` + "_8"}
                    id={name + "_8"}
                    style={{
                      color: name + "_8" == selected ? "white" : "black",
                      backgroundColor:
                        name + "_8" == selected ? "black" : "white",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                    onClick={() => run(name, 8)}
                  >
                    Sem-&#x2167;
                  </li>
                </ul>
              </>
            );
          })}
        </div>
        <div
          onClick={() => {
            console.log("hii");
          }}
          className={styles.booksbody}
        >
          {dept.map(({ price, b_name, _id }) => {
            {
              /* const count = cart.filter((item) => {
              return (item.id == _id)
            }) */
            }

            {
              /* console.log(count.length()) */
            }
            return (
              <div className={styles.book}>
                <div>
                  <Image src={"/Images/CSDS.jpg"} width={300} height={300} />
                </div>
                <div style={{ fontSize: "16px" }}>{b_name}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                  }}
                >
                  <span>Price</span> &#8377; {price}/-
                </div>
                <div
                  className={styles.bookscart}
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      item: {
                        id: _id,
                        b_name: b_name,
                        price: price,
                        count: findCount(_id) + 1,
                        index: findIndex(_id)
                      },
                    });
                  }}
                >
                  ({(findIndex(_id) == -1) ? "add to cart" : <div>+ </div> + cart[findIndex(_id)].count})
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default books;
