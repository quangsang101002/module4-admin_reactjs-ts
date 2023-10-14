import { Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";
import clsx from "clsx";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import Sidebar from "../components/partials/Sidebars";

const DefaultLayout = () => {
  return (
    <div className={clsx(styles.wrapper, "row")}>
      <Header />
      <div className={clsx(styles.content, "col-2")}>
        <Sidebar />
      </div>
      <div className={clsx(styles.content_dashboard, "col-10")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
