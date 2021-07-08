import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute path="/admin/create/category" component={AddCategory} />
        <AdminRoute path="/admin/create/product" component={AddProduct} />
        <AdminRoute path="/admin/categories" component={ManageCategories} />
        <AdminRoute path="/admin/products" component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </Router>
  );
}
