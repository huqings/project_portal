import React, { Fragment, useEffect, useContext } from "react";
import {
  Tab,
  Tabs,
  Stack,
  Grid,
  Paper,
  Avatar,
  Badge,
  Fade,
  Snackbar,
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  List,
  Backdrop,
  Menu,
  MenuItem,
  ListItemButton,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiAlert from "@mui/material/Alert";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CircleIcon from "@mui/icons-material/Circle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import Notifications from "@mui/icons-material/Notifications";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useTheme, styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";

import {
  useLocation,
  Link,
  useHistory,
  Redirect,
  Route,
} from "react-router-dom";
import {
  CacheSwitch,
  CacheRoute,
  useDidCache,
  useDidRecover,
  dropByCacheKey,
  clearCache,
  getCachingKeys,
} from "react-router-cache-route";

import Router from "../../router/router";

import { navLink, appName } from "../../mock/layout";
import { storage } from "../../tools/index";

import { AppDispatch } from "../../App";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme, open }) => {
  return {
    transition: theme.transitions.create(["width", "margin-top"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${open.extand ? drawerWidth : 0}px)`,
    marginTop: open.content ? 0 : -64 - 12,
  };
});

const CustomDrawer = styled("div")(({ open, theme }) => {
  return {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${open ? 0 : -drawerWidth}px`,
    height: `100vh`,
    width: drawerWidth,
    position: "fixed",
    top: 0,
    left: 0,
    right: "auto",
    zIndex: 2000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  };
});

const DrawerHeader = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar,
  };
});

const DrawerUserInfo = styled("div")(({ open, theme }) => {
  return {
    transition: theme.transitions.create(["margin-top"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: open ? 0 : -152,
    position: "absolute",
    zIndex: -1,
    width: drawerWidth,
  };
});

const PageContent = styled("div")(({ open, theme }) => {
  return {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open.content ? (open.extand ? drawerWidth : 0) : 0,
    marginTop: open.content ? theme.mixins.toolbar.minHeight + 8 : 8,
    padding: 12
  };
});

const BaseLayout = () => {
  let location = useLocation();
  let history = useHistory();
  let theme = useTheme();

  const { state, dispatch } = useContext(AppDispatch);

  useEffect(() => {
    initRouter(navLink);
  }, []);

  // 初始化路由
  const initRouter = (link) => {
    setMenu(link);
    if (link.length > 0) {
      const value = link.find((e) => e.link === location.pathname);
      if (value && value !== link[0]) {
        dispatch({
          type: "navTopMenu.update",
          data: [
            ...state.navTopMenu,
            {
              id: link[0].id,
              name: link[0].name,
              link: link[0].link,
            },
            {
              id: value.id,
              name: value.name,
              link: value.link,
            },
          ],
        });
        dispatch({
          type: "navTopTabIndex.update",
          data: value.id,
        });
        history.push(value.link);
      } else {
        dispatch({
          type: "navTopMenu.update",
          data: [
            // ...navTopMenu,
            {
              id: link[0].id,
              name: link[0].name,
              link: link[0].link,
            },
          ],
        });
        dispatch({
          type: "navTopTabIndex.update",
          data: link[0].id,
        });
        value !== link[0] && history.push(link[0].link);
      }
    }
  };

  // 导航菜单
  const [menu, setMenu] = React.useState([]);

  const [pinButton, setPinButton] = React.useState(false);

  // 个人资料 or 邮件信息
  const [fadeInfo, setFadeInfo] = React.useState("");

  // 主题颜色
  const [themeMode, setThemeMode] = React.useState(false);

  // Drawer用户信息面板
  const [drawerUserInfo, setDrawerUserInfo] = React.useState(true);

  const [changeMenuState, setChangeMenuState] = React.useState(false);

  // 菜单扩展ID标识
  const [extendId, setExtendId] = React.useState(-1);

  // navTop动态路由列表
  const handleRouteLinkList = (text) => {
    const value = state.navTopMenu.findIndex((v) => v.id === text.id);
    if (value === -1) {
      history.push(text.link);
      dispatch({
        type: "navTopTabIndex.update",
        data: text.id,
      });

      dispatch({
        type: "navTopMenu.update",
        data: [
          ...state.navTopMenu,
          {
            id: text.id,
            name: text.name,
            link: text.link,
          },
        ],
      });
    } else if (value > -1) {
      if (state.navTopTabIndex !== text.id) {
        dispatch({
          type: "navTopTabIndex.update",
          data: text.id,
        });
        history.push(text.link);
      }
      dispatch({
        type: "navTopMenu.update",
        data: state.navTopMenu,
      });
    }
  };

  // 选项卡页面路由值
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 通知选项卡
  const [notificationsValue, setNotificationsValue] = React.useState(0);

  // 通知菜单
  const [anchorNotifications, setAnchorNotifications] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerLeftMenu = () => {
    if (changeMenuState) {
      handleHideBackdrop();
    } else {
      dispatch({
        type: "showNav.leftMenu",
        data: !state.showNavLeftMenu,
      });
      dispatch({
        type: "showNav.tapExtand",
        data: !state.showNavTapExtand,
      });
    }
  };

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleChangeLeftMenuLock = () => {
    setOpenBackdrop(!openBackdrop);
    setChangeMenuState(!changeMenuState);
    dispatch({
      type: "showNav.tapExtand",
      data: !state.showNavTapExtand,
    });
    setPinButton(!pinButton);
  };

  const handleHideBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
    dispatch({
      type: "showNav.leftMenu",
      data: !state.showNavLeftMenu,
    });
  };

  const handleChangeTabs = (text) => {
    if (state.navTopTabIndex !== text.id) {
      dispatch({
        type: "navTopTabIndex.update",
        data: text.id,
      });
      history.push(text.link);
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (state.snackBarBaseLayout.time) {
      storage.remove("id");
      dispatch({
        type: "auth.update",
        data: false,
      });
      dispatch({
        type: "navTopMenu.update",
        data: [
          {
            id: state.navTopMenu[0].id,
            name: state.navTopMenu[0].name,
            link: state.navTopMenu[0].link,
          },
        ],
      });
      dispatch({
        type: "navTopTabIndex.update",
        data: state.navTopMenu[0].id,
      });
    }
    dispatch({
      type: "update.snackBarBaseLayout",
      data: {
        show: false,
        content: "",
        type: "warning",
      },
    });
  };

  const renderMainPage = () => {
    return (
      <Box>
        <AppBar
          position="fixed"
          open={{
            extand: !state.showNavTapExtand,
            content: state.showNavTopContent,
          }}
        >
          <Toolbar>
            <Stack direction="row">
              <IconButton
                size="large"
                color="inherit"
                onClick={handleDrawerLeftMenu}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setDrawerUserInfo(!drawerUserInfo);
                }}
              >
                <Person />
              </IconButton>
            </Stack>
            <Stack
              style={{
                transition: theme.transitions.create(["width"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                width: `calc(100% - ${drawerWidth}px - 50px)`,
              }}
            >
              <Tabs
                value={state.navTopTabIndex}
                variant="scrollable"
                scrollButtons="auto"
                style={{ backgroundColor: "rgb(238 241 245 / 6%)" }}
              >
                {state.navTopMenu.map((e) => {
                  return (
                    <Tab
                      key={e.id}
                      value={e.id}
                      label={e.name}
                      style={{
                        color: theme.palette.common.white,
                        backgroundColor:
                          e.id === state.navTopTabIndex
                            ? "rgb(238 241 245 / 8%)"
                            : "transparent",
                      }}
                      onClick={() => handleChangeTabs(e)}
                    />
                  );
                })}
              </Tabs>
            </Stack>
            <Stack direction="row">
              <IconButton size="large" color="inherit">
                <Search />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={(e) => setAnchorNotifications(e.currentTarget)}
              >
                <Notifications />
              </IconButton>
              <Menu
                anchorEl={anchorNotifications}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& ul": {
                    padding: 0,
                  },
                }}
                open={Boolean(anchorNotifications)}
                onClose={() => setAnchorNotifications(null)}
              >
                <Tabs
                  value={notificationsValue}
                  onChange={(e) => setNotificationsValue(e)}
                >
                  <Tab icon={<MessageIcon />} />
                  <Tab icon={<DescriptionIcon />} />
                  <Tab icon={<EventIcon />} />
                </Tabs>
              </Menu>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  const rootNode = document.getElementsByTagName("body")[0];
                  rootNode.style.backgroundColor = themeMode
                    ? theme.palette.common.white
                    : "#303030";
                  setThemeMode(!themeMode);
                  if (themeMode) {
                    theme.palette.background.paper = "#fff";
                    theme.palette.text.primary = "#000";
                    theme.palette.themeMode = true;
                    state.map && state.map.setMapStyleId("style1");
                  } else {
                    theme.palette.background.paper = "#424242";
                    theme.palette.text.primary = "#fff";
                    theme.palette.themeMode = false;
                    state.map && state.map.setMapStyleId("style2");
                  }
                }}
              >
                {themeMode ? <CircleIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    setFadeInfo("personInfo");
                    setAnchorEl(null);
                  }}
                >
                  个人资料
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    dispatch({
                      type: "update.snackBarBaseLayout",
                      data: {
                        show: true,
                        content: "注销成功!",
                        type: "success",
                        time: 2000
                      },
                    });
                  }}
                >
                  退出系统
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>
        <CustomDrawer open={state.showNavLeftMenu}>
          <DrawerHeader>
            <Avatar sx={{ bgcolor: "white" }} variant="rounded">
              <AssignmentIcon sx={{ color: theme.palette.primary.main }} />
            </Avatar>
            <Typography
              variant="h6"
              color={"white"}
              style={{ marginLeft: 12, fontWeight: "bold" }}
            >
              {appName}
            </Typography>
            <IconButton color="inherit" onClick={handleChangeLeftMenuLock}>
              {pinButton ? (
                <PushPinOutlinedIcon sx={{ color: "white" }} />
              ) : (
                <PushPinIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <DrawerUserInfo open={drawerUserInfo}>
            <Box>
              <Stack
                direction="row"
                style={{
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  justifyContent: "space-evenly",
                }}
              >
                <Avatar
                  alt=""
                  src="/imgs/user.jpg"
                  sx={{ width: 72, height: 72 }}
                />
                <Stack
                  direction="column"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {"慕言"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {"城市经理"}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {"🏷 2021-12-12"}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setFadeInfo("personInfo");
                  }}
                >
                  <PersonOutlineIcon sx={{ color: theme.palette.grey[500] }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setFadeInfo("mailInfo");
                  }}
                >
                  <MailOutlineIcon sx={{ color: theme.palette.grey[500] }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    dispatch({
                      type: "update.snackBarBaseLayout",
                      data: {
                        show: false,
                        content: "注销成功!",
                        type: "success",
                        time: 2000
                      },
                    });
                  }}
                >
                  <PowerSettingsNewIcon
                    sx={{ color: theme.palette.grey[500] }}
                  />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
            <Fade
              in={!(fadeInfo === "personInfo") && !(fadeInfo === "mailInfo")}
            >
              <List
                sx={{
                  position: "absolute",
                  overflow: "auto",
                  width: drawerWidth,
                  height: drawerUserInfo
                    ? "calc(100vh - 235px)"
                    : "calc(100vh - 80px)",
                }}
              >
                {menu.map((text, index) => (
                  <Fragment key={index}>
                    <ListItemButton
                      onClick={() => {
                        if (text.expand) {
                          if (extendId === text.id) {
                            setExtendId(-1);
                          } else {
                            setExtendId(text.id);
                          }
                        } else {
                          handleRouteLinkList(text);
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                        {text.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: theme.palette.text.primary }}
                        primary={text.name}
                      />
                      {text.expand &&
                        (extendId === text.id ? (
                          <ExpandLess
                            sx={{ color: theme.palette.text.primary }}
                          />
                        ) : (
                          <ExpandMore
                            sx={{ color: theme.palette.text.primary }}
                          />
                        ))}
                    </ListItemButton>
                    {text.expand && (
                      <Collapse
                        in={extendId === text.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        {text.children.map((element, index) => (
                          <List key={index} component="div" disablePadding>
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() => {
                                handleRouteLinkList(element);
                              }}
                            >
                              <ListItemIcon
                                sx={{ color: theme.palette.text.primary }}
                              >
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText
                                sx={{ color: theme.palette.text.primary }}
                                primary={element.name}
                              />
                            </ListItemButton>
                          </List>
                        ))}
                      </Collapse>
                    )}
                  </Fragment>
                ))}
              </List>
            </Fade>
            <Box>
              <Fade in={fadeInfo === "personInfo"}>
                <Box
                  sx={{
                    position: "absolute",
                    width: drawerWidth,
                  }}
                >
                  <Stack p={1} flexDirection="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setFadeInfo("");
                      }}
                    >
                      <NavigateBeforeIcon
                        sx={{ color: theme.palette.grey[600] }}
                      />
                    </IconButton>
                  </Stack>
                  <Box pl={2} pr={2}>
                    <Typography variant="h5" component="div">
                      {"用户名"}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {"职位名称"}
                    </Typography>
                    <Typography variant="body2">
                      {"标签"}
                      <br />
                      {'"a smile"'}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
              <Fade in={fadeInfo === "mailInfo"}>
                <Box
                  sx={{
                    position: "absolute",
                    width: drawerWidth,
                  }}
                >
                  <Stack p={1} flexDirection="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setFadeInfo("");
                      }}
                    >
                      <NavigateBeforeIcon
                        sx={{ color: theme.palette.grey[600] }}
                      />
                    </IconButton>
                  </Stack>
                  <Box pl={2} pr={2}>
                    <Typography variant="h6" component="div">
                      {"message 1"}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {"message 2"}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </DrawerUserInfo>
        </CustomDrawer>
        <PageContent
          open={{
            extand: !state.showNavTapExtand,
            content: state.showNavTopContent,
          }}
        >
          <Router />
        </PageContent>
        <Snackbar
          open={state.snackBarBaseLayout.show}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={state.snackBarBaseLayout.time}
          onClose={() => handleCloseSnackBar()}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={state.snackBarBaseLayout.type}
            sx={{ width: "100%" }}
          >
            {state.snackBarBaseLayout.content}
          </MuiAlert>
        </Snackbar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleHideBackdrop}
        ></Backdrop>
      </Box>
    );
  };

  return <CacheSwitch>{renderMainPage()}</CacheSwitch>;
};

export default BaseLayout;
