import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Breadcrumbs,
  Typography,
  Link,
  IconButton,
} from "@mui/material";

import Notifications from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const Work = ({
  showNavLeftMenu,
  showNavTopContent,
  navTopMenu,
  updateShowNavLeftMenu,
  updateShowNavTopContent,
  updateNavTopMenu,
  navTopTabIndex,
  updateNavTopTabIndex
}) => {
  let location = useLocation();
  let history = useHistory();

  const breadcrumbs = [
    <Typography key="1" variant="text">
      {"办公台"}
    </Typography>,
  ];

  const RenderNav = (
    <Stack
      flexDirection="row"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Stack flexDirection="row" alignItems={"center"}>
        <IconButton
          size="small"
          onClick={() => {
            updateShowNavTopContent(!showNavTopContent);
            updateShowNavLeftMenu(!showNavLeftMenu);
          }}
        >
          <OpenInFullIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            const index = navTopMenu.findIndex((e) => e.link === location.pathname)
            navTopMenu.splice(
              index,
              1
            );

            if (navTopMenu.length > 0) {
              updateNavTopTabIndex(navTopMenu[navTopMenu.length - 1].id)
              updateNavTopMenu(navTopMenu);
              history.push(navTopMenu[navTopMenu.length - 1].link);
            } else history.push("/home");
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </Stack>
  );

  return (
    <Box>
      <Paper sx={{ pl: 2, pr: 1, borderRadius: 0 }}>{RenderNav}</Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    showNavTopContent: state.showNavTopContent,
    showNavLeftMenu: state.showNavLeftMenu,
    navTopMenu: state.navTopMenu,
    navTopTabIndex: state.navTopTabIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMap: (value) =>
      dispatch({
        type: "map.update",
        data: value,
      }),

    updateShowNavTopContent: (value) =>
      dispatch({
        type: "showNav.topContent",
        data: value,
      }),
    updateShowNavLeftMenu: (value) =>
      dispatch({
        type: "showNav.leftMenu",
        data: value,
      }),
    updateNavTopMenu: (value) =>
      dispatch({
        type: "navTopMenu.update",
        data: value,
      }),
    updateNavTopTabIndex: (value) =>
      dispatch({
        type: "navTopTabIndex.update",
        data: value,
      }),
  };
};

export default Work;
