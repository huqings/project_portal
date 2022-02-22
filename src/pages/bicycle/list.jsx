import React, { useEffect, useReducer, useContext } from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  IconButton,
  Stack,
  Paper,
  Pagination,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation, useHistory } from "react-router-dom";
import {
  HorizontalRule as HorizontalRuleIcon,
  OpenInFull as OpenInFullIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { bicycleList } from "../../api/bicyle";

import { AppDispatch } from "../../App";

const userList = () => {
  let location = useLocation();
  let history = useHistory();
  const theme = useTheme();

  const { state, dispatch } = useContext(AppDispatch);

  const [data, setData] = React.useState(undefined);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    requestBicycleList()
  }, [page]);

  const requestBicycleList = () => {
    bicycleList({
      page,
      pageSize,
    }).then((res) => {
      setData(res.data);
    });
  };

  const onChangeSetPage = (e) => {
    setPage(e);
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
      {"车辆列表"}
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
    <>
      <Paper sx={{ pl: 2, pr: 1, mb: 2, borderRadius: 0 }}>{RenderNav}</Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>区域</TableCell>
              <TableCell align="right">订单来源</TableCell>
              <TableCell align="right">订单编号</TableCell>
              <TableCell align="right">车辆编号</TableCell>
              <TableCell align="right">中控编号</TableCell>
              <TableCell align="right">手机号</TableCell>
              <TableCell align="right">状态</TableCell>
              <TableCell align="right">下单时间</TableCell>
              <TableCell align="right">结束时间</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.items.map((row, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell>{row.regionName}</TableCell>
                  <TableCell align="right">{row.fromClient}</TableCell>
                  <TableCell align="right">{row.orderSn}</TableCell>
                  <TableCell align="right">{row.bicycleSn}</TableCell>
                  <TableCell align="right">{row.lockSn}</TableCell>
                  <TableCell align="right">{row.mobile}</TableCell>
                  <TableCell align="right">
                    <Chip label={row.orderStateName} color="primary" />
                  </TableCell>
                  <TableCell align="right">{row.addTimeStr}</TableCell>
                  <TableCell align="right">{row.endTimeStr}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        // setOpen(!open);
                      }}
                    >
                      查看
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack component={Paper} direction="row" justifyContent="center" pt={1} pb={1}>
        {data && (
          <Pagination
            variant="outlined"
            shape="rounded"
            count={parseFloat(data.totalPages)}
            onChange={(e, v) => onChangeSetPage(v)}
          />
        )}
      </Stack>
      {/* <Paper
        style={{
          transition: theme.transitions.create(["height", "width", "left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          position: "fixed",
          bottom: 0,
          left: showNavLeftMenu ? 240 + 12 : 12,
          right: 12,
          height: open ? `calc( 100vh - 75px)` : 42,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          textAlign: "center",
          backgroundColor: theme.palette.background.black,
        }}
        elevation={3}
      >
        <IconButton
          onClick={() => {
            open && setOpen(!open);
          }}
          size="small"
        >
          <HorizontalRuleIcon fontSize="large" sx={{ color: grey[400] }} />
        </IconButton>
      </Paper> */}
    </>
  );
};

export default userList;
