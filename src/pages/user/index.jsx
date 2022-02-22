import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Stack,
  ButtonGroup,
  Button,
  Card,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Pagination,
  Switch,
  IconButton,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  PersonAdd,
  Search,
  ViewModule,
  ViewList,
  CardMembership,
  MailOutline,
  Call,
  LocationOn,
  DateRange,
  MoreVert,
  OpenInFull as OpenInFullIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useLocation, useHistory } from "react-router-dom";
import { AppDispatch } from "../../App";

import { userList } from "../../api/user";

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const User = () => {
  const theme = useTheme();
  let location = useLocation();
  let history = useHistory();

  const { state, dispatch } = useContext(AppDispatch);
  const [listMode, setListMode] = useState(4);
  const [leftMenu, setLeftMenu] = useState("");

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);

  const [pageData, setPageData] = React.useState(undefined);

  useEffect(() => {
    requestUserList(page);
  }, [page]);

  const requestUserList = (page) => {
    userList({
      page,
      pageSize,
    }).then((res) => {
      setPageData(res.data);
    });
  };

  const onChangeSetPage = (e) => {
    setPage(e);
  };

  const handleChangeLeftMenu = (event, newAlignment) => {
    setLeftMenu(newAlignment);
  };

  const [rightMenu, setRightMenu] = useState("ViewModule");
  const handleChangeRightMenu = (event, newAlignment) => {
    if (newAlignment) {
      setRightMenu(newAlignment);
      setListMode(newAlignment === "ViewList" ? 12 : 4);
    }
  };

  const breadcrumbs = [
    <Typography
      key="1"
      variant="text"
      sx={{
        color: theme.palette.themeMode
          ? theme.palette.grey
          : theme.palette.common.white,
      }}
    >
      {"用户管理"}
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
            dispatch({
              type: "showNav.topContent",
              data: !state.showNavTopContent,
            });
            dispatch({
              type: "showNav.leftMenu",
              data: !state.showNavLeftMenu,
            });
          }}
        >
          <OpenInFullIcon
            sx={{
              color: theme.palette.themeMode
                ? theme.palette.grey
                : theme.palette.common.white,
            }}
          />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            const index = state.navTopMenu.findIndex(
              (e) => e.link === location.pathname
            );
            state.navTopMenu.splice(index, 1);

            if (state.navTopMenu.length > 0) {
              dispatch({
                type: "navTopTabIndex.update",
                data: state.navTopMenu[state.navTopMenu.length - 1].id,
              });

              dispatch({
                type: "navTopMenu.update",
                data: state.navTopMenu,
              });

              history.push(state.navTopMenu[state.navTopMenu.length - 1].link);
            } else history.push("/home");
          }}
        >
          <CloseIcon
            sx={{
              color: theme.palette.themeMode
                ? theme.palette.grey
                : theme.palette.common.white,
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );

  return (
    <Box>
      <Paper sx={{ pl: 2, pr: 1, mb: 2, borderRadius: 0 }}>{RenderNav}</Paper>

      <Stack direction="row" justifyContent="space-between">
        <ToggleButtonGroup
          size="small"
          value={leftMenu}
          exclusive
          onChange={handleChangeLeftMenu}
          sx={{
            backgroundColor: theme.palette.themeMode
              ? "transparent"
              : theme.palette.background.paper,
          }}
        >
          <CustomToggleButton value={"person"}>
            <PersonAdd
              sx={{
                color: `${
                  theme.palette.themeMode
                    ? theme.palette.grey
                    : theme.palette.common.white
                }`,
              }}
            />
          </CustomToggleButton>
          <CustomToggleButton value={"search"}>
            <Search
              sx={{
                color: `${
                  theme.palette.themeMode
                    ? theme.palette.grey
                    : theme.palette.common.white
                }`,
              }}
            />
          </CustomToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          size="small"
          value={rightMenu}
          exclusive
          onChange={handleChangeRightMenu}
          sx={{
            backgroundColor: theme.palette.themeMode
              ? "transparent"
              : theme.palette.background.paper,
          }}
        >
          <CustomToggleButton value={"ViewModule"}>
            <ViewModule
              sx={{
                color: `${
                  theme.palette.themeMode
                    ? theme.palette.grey
                    : theme.palette.common.white
                }`,
              }}
            />
          </CustomToggleButton>
          <CustomToggleButton value={"ViewList"}>
            <ViewList
              sx={{
                color: `${
                  theme.palette.themeMode
                    ? theme.palette.grey
                    : theme.palette.common.white
                }`,
              }}
            />
          </CustomToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={2} mt={0}>
        {pageData &&
          pageData.items.map((e, i) => (
            <Grid key={i} item xs={listMode}>
              <Stack flexGrow={1}>
                <Card>
                  <Box>
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                      <Box pl={2}>
                        <Typography
                          sx={{
                            fontSize: 15,
                            color: theme.palette.common.white,
                          }}
                        >
                          {e.realName}
                        </Typography>
                      </Box>
                      <IconButton>
                        <MoreVert sx={{ color: theme.palette.common.white }} />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box p={2}>
                    <Stack direction="row">
                      <Stack alignItems="center">
                        <Avatar
                          alt=""
                          src="/imgs/user.jpg"
                          sx={{ width: 84, height: 84 }}
                        />
                        <Switch />
                      </Stack>
                      <Stack direction="column" pl={2}>
                        <Stack direction="row" alignItems="center">
                          <CardMembership />
                          <Typography ml={2} sx={{ fontSize: 14 }}>
                            {e.inviterCode}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <MailOutline />
                          <Typography ml={2} sx={{ fontSize: 14 }}>
                            {e.ip}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <Call />
                          <Typography ml={2} sx={{ fontSize: 14 }}>
                            {e.mobile}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <LocationOn />
                          <Typography ml={2} sx={{ fontSize: 14 }}>
                            {e.registerRegionName}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <DateRange />
                          <Typography ml={2} sx={{ fontSize: 14 }}>
                            {e.addTimeStr}
                          </Typography>
                        </Stack>
                      </Stack>
                      {listMode === 12 && (
                        <>
                          <Stack direction="column" pl={2}>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"可用金额:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.availableAmount}(
                                {e.availableState > 0 ? "不可用" : "可用"})
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"更新时间:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.updateTime}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"用户来源:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.platform}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"所属区域:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.regionId}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"所属加盟商:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.cooperatorId}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack direction="column" pl={2}>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"身份证号:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.identification}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"最后骑行时间:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.lastRideTime}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"最后登录时间:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.loginTime}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"充值次数:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.rechargeTimes}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                              <Typography
                                ml={2}
                                sx={{ fontSize: 14, color: "#8D8D8D" }}
                              >
                                {"充值押金:"}
                              </Typography>
                              <Typography ml={2} sx={{ fontSize: 14 }}>
                                {e.rechargeDeposit}
                              </Typography>
                            </Stack>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Box>
                </Card>
              </Stack>
            </Grid>
          ))}
      </Grid>

      <Box component={Paper}>
        <Stack mt={1} p={1} direction="row" spacing={1} justifyContent="center">
          {pageData && (
            <Pagination
              variant="outlined"
              shape="rounded"
              count={parseFloat(pageData.totalPages)}
              onChange={(e, v) => onChangeSetPage(v)}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default User;
