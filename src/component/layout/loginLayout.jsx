import React, { Fragment, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { useTheme, styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  useLocation,
  Link,
  useHistory,
  Redirect,
  Route,
} from "react-router-dom";

import Login from "../../pages/login";
import { AppDispatch } from "../../App";

const LoginLayout = () => {
  return (
    <>
        <Route component={Login} />
        <Redirect to="/login" />
    </>
  );
};

export default LoginLayout;
