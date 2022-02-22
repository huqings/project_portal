import React, { Fragment } from "react";
import {
  CacheSwitch,
  CacheRoute,
  useDidCache,
  useDidRecover,
  dropByCacheKey,
  clearCache,
  getCachingKeys,
} from "react-router-cache-route";
import { Route } from 'react-router-dom'
import Home from "../pages/home";
import Login from "../pages/login";
import Manage from "../pages/manage";
import User from "../pages/user";
import Finance from "../pages/finance"
import Order from "../pages/order"
import Work from "../pages/work"
import Service from "../pages/service"
import Profile from "../pages/profile"

import BicycleList from "../pages/bicycle/list"

import Error from "../pages/error";

export default function Router() {
  return (
    <Fragment>
      <CacheRoute
        exact
        path="/home"
        component={Home}
        cacheKey="home"
      />
      <CacheRoute
        exact
        path="/manage"
        component={Manage}
        cacheKey="manage"
      />
      <CacheRoute
        exact
        path="/user/list"
        component={User}
        cacheKey="user"
      />
      <CacheRoute
        exact
        path="/finance"
        component={Finance}
        cacheKey="finance"
      />
      <CacheRoute
        exact
        path="/work"
        component={Work}
        cacheKey="work"
      />
      <CacheRoute
        exact
        path="/service"
        component={Service}
        cacheKey="service"
      />
      <CacheRoute
        exact
        path="/login"
        component={Login}
        cacheKey="login"
      />
      <CacheRoute
        exact
        path="/order"
        component={Order}
        cacheKey="order"
      />
      <CacheRoute
        exact
        path="/profile"
        component={Profile}
        cacheKey="profile"
      />
      <CacheRoute
        exact
        path="/bicycle/list"
        component={BicycleList}
        cacheKey="bicyclelist"
      />
      {/* <CacheRoute component={Error} /> */}
    </Fragment>
  );
}
