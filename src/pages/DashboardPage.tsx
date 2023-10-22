import styles from "./DashboardPage.module.scss";
import Sidebars from "../components/partials/Sidebars";
import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import productAPI from "../apis/products/products.api";
import clsx from "clsx";
function DashboardPage() {
  const [displayProduct, setDisplayProduct] = useState<string[]>([]);
  const [totalProduct, setTotalProduct] = useState<string>("");
  useEffect(() => {
    searchProducts();
  }, []);
  const navigate = useNavigate();
  const searchProducts = async () => {
    try {
      const response = await productAPI.SearchProduct("", 7, 1);
      console.log(response);
      if (response) {
        setDisplayProduct(response.result.recount);
        setTotalProduct(response.result.totalProduct);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  return <div className={styles.wrapper}></div>;
}

export default DashboardPage;
