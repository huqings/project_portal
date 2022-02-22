import * as React from "react";
import { Box, Button, TextField } from "@mui/material";

const Manage = ({ articles, addArticle }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField label="地图模块" variant="standard" />
      {articles.map((e, i) => (
        <div key={i}>{e.title}</div>
      ))}
      <Button
        variant="contained"
        onClick={() => {
          addArticle({
            title: "post 100",
            body: "Quisque cursus, metus vitae pharetra 100",
          });
        }}
      >
        添加
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (article) =>
      dispatch({
        type: "add",
        data: {
          title: article.title,
          title: article.body,
        },
      }),
  };
};

export default Manage;
