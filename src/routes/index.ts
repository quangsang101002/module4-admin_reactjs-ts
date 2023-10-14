import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Router } from "@remix-run/router";

import DefaultLayout from "../layouts/DefaultLayout";
// import DefaultLayout from "../layouts/DefaultLayout";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ProductList from "../pages/products/ProductList";
import UserList from "../pages/users/UserList";
import OrderList from "../pages/orders/OrderList";
import Header from "../components/partials/Header";
import ProductAdd from "../pages/products/productActions/productAdd/ProductAdd";
import ProductEdit from "../pages/products/productActions/productEdit/ProductEdit";
const routes: RouteObject[] = [
  {
    Component: Header,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin/product",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: ProductList,
      },
    ],
  },
  {
    path: "/admin/product_add",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: ProductAdd,
      },
    ],
  },
  {
    path: "/admin/product_edit",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: ProductEdit,
      },
    ],
  },
  {
    path: "/admin/order",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: OrderList,
      },
    ],
  },
  {
    path: "/admin/user",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: UserList,
      },
    ],
  },
  {
    id: "root",
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
    ],
  },
];

const router: Router = createBrowserRouter(routes);

export default router;
