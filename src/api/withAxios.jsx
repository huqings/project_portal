import { useContext, useEffect } from "react";
import axios from "axios";
import storage from "../tools/storage";

import { AppDispatch } from "../App";

const base_url = process.env.NODE_ENV === "production" ? env.url : "";

const randomNumber = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return (
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89 + 100).toString()
  );
};

const WithAxios = (params) => {
  const { state, dispatch } = useContext(AppDispatch);

  useEffect(() => {
    const instance = axios.create({
      baseURL: base_url,
      timeout: 10000,
    });

    instance.interceptors.request.use(
      (request) => {
        request.headers = {
          trackId: randomNumber(),
          fromApp: "pc",
          version: "1.0",
          timestamp: parseInt(new Date().getTime() / 1000, 10),
        };
        const userInfo = storage.get("id");
        if (userInfo) {
          request.headers.sessionId = JSON.parse(userInfo).sessionId;
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        if (response && response.status) {
          switch (response.status) {
            case 200:
              if (response.data.errorCode === "0") {
                if (state.requestParams.url.indexOf("/user/login") !== -1) {
                  storage.set("id", JSON.stringify(response.data.data));
                  dispatch({
                    type: "update.snackBarLogin",
                    data: {
                      show: true,
                      content: "登录成功!",
                      type: "success",
                    },
                  });
                } else {
                  dispatch({
                    type: "api.response",
                    data: {
                      key: state.requestParams.url,
                      value: response.data.data,
                    },
                  });
                }
              } else {
                if (state.requestParams.url.indexOf("/user/login") !== -1) {
                  dispatch({
                    type: "update.snackBarLogin",
                    data: {
                      show: true,
                      content: response.data.msg,
                      type: "warning",
                    },
                  });
                } else {
                  dispatch({
                    type: "update.snackBarBaseLayout",
                    data: {
                      show: true,
                      content: response.data.msg,
                      type: "warning",
                      time: null,
                    },
                  });
                  Promise.reject(response.data.msg);
                }
              }
            case 404:
              break;
            default:
              break;
          }
        }
      },
      (error) => {
        Promise.reject(error);
      }
    );

    state.requestParams &&
      instance({
        url: state.requestParams?.url,
        method: state.requestParams?.method,
        data: state.requestParams?.data,
      });
  }, [state.requestParams]);

  return params.children;
};

export default WithAxios;
