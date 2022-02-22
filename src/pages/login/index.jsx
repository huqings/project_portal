import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Tabs,
  CardMedia,
  Typography,
  Button,
  CardContent,
  Box,
  Card,
  TextField,
  Snackbar,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { userLogin } from "../../api/login";
import { baseInfo } from "../../mock/login";
import { storage } from "../../tools";
import loginBG from "../../assets/images/loginBG.jpg";
import loginLogo from "../../assets/images/loginLogo.png";

import { AppDispatch } from "../../App";

const Login = (props) => {
  const theme = useTheme();
  const history = useHistory();

  const { state, dispatch } = useContext(AppDispatch);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const requestLogin = () => {
    if ((username ?? "") === "" || (password ?? "") === "") {
      return;
    }

    dispatch({
      type: "api.request",
      data: {
        url: "/user/login",
        method: "POST",
        data: {
          userName: username,
          passWord: password,
        },
      },
    });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "update.snackBarLogin",
      data: {
        show: false,
        content: "",
        type: "warning",
      },
    });
    dispatch({
      type: "auth.update",
      data: true,
    });
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          // backgroundImage: `url(${loginBG})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "100% 100%",
          backgroundColor: theme.palette.themeMode
            ? "#fafafa"
            : theme.palette.background.paper,
        }}
      >
        <Card
          elevation={16}
          style={{
            width: 720,
            height: 380,
            borderRadius: 0,
            // background: "rgba(255, 255, 255, .3)",
            // backgroundColor: "white",
            // boxShadow: "3px 3px 6px 3px rgba(0, 0, 0, .2)",
          }}
        >
          <Box
            sx={{
              height: 70,
              background: theme.palette.primary.main,
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography component="div" variant="h5" color={"white"}>
              {baseInfo.appName}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 290,
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia component="img" image={loginLogo} alt="" />
            </Box>
            <Box
              sx={{
                width: "50%",
              }}
            >
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    color: theme.palette.themeMode
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                  }}
                >
                  {baseInfo.appDescription}
                </Typography>
              </Box>
              <Box pl={3} pr={4}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }} pt={1}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    label="请输入用户名"
                    variant="standard"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      color: theme.palette.themeMode
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }} pt={1}>
                  <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    label="请输入密码"
                    variant="standard"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      color: theme.palette.themeMode
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"center"} mt={3}>
                <Button
                  variant="outlined"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    requestLogin();
                  }}
                >
                  登录
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </div>
      <Snackbar
        open={state.snackBarLogin.show}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => handleCloseSnackBar()}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={state.snackBarLogin.type}
          sx={{ width: "100%" }}
        >
          {state.snackBarLogin.content}
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

export default Login;
