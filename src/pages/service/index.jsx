import { useEffect, useState, useCallback, memo, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Breadcrumbs,
  Typography,
  Link,
  Button,
  IconButton,
  TextField,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  HorizontalRule as HorizontalRuleIcon,
  OpenInFull as OpenInFullIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import {
  CacheSwitch,
  CacheRoute,
  useDidCache,
  useDidRecover,
  dropByCacheKey,
  clearCache,
  getCachingKeys,
} from "react-router-cache-route";

import { AppDispatch } from "../../App";

import { className } from "../../mock/services";

const PageA = memo((props) => {
  const { onClick, children } = props;
  return <div onClick={onClick}>{children}</div>;
});

const PageB = memo(({ onClick, name }) => {
  console.log(222);
  return <div onClick={onClick}>{name}</div>;
});

const Service = () => {
  const theme = useTheme();
  let location = useLocation();
  let history = useHistory();

  const { state, dispatch } = useContext(AppDispatch);

  useEffect(() => {
    questUserStatisticsProcess();
  }, []);

  const breadcrumbs = [
    <Typography key="1" variant="text">
      {"客服"}
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
          <OpenInFullIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            clearCache("service");
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
          <CloseIcon />
        </IconButton>
      </Stack>
    </Stack>
  );

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const questUserStatisticsProcess = () => {
    dispatch({
      type: "api.request",
      data: {
        url: "/user/statisticsProcess",
        method: "POST",
        data: {},
      },
    });
  };

  const handleClick1 = useCallback(() => {
    setA(a + 1);
  }, [a]);

  const handleClick2 = useCallback(() => {
    setB(b + 1);
  }, [b]);

  return (
    <Box>
      <Paper sx={{ pl: 2, pr: 1, borderRadius: 0 }}>{RenderNav}</Paper>

      <Stack flexDirection={"row"} mt={2}>
        <TextField required label="区域" variant="filled" size="small" />
        <Button variant="text">查询</Button>
      </Stack>

      <Box sx={{ display: "flex", flexWrap: "wrap" }} mt={2} mb={1}>
        {state.responseParams &&
          state.responseParams.map((e) => {
            if ((e.key = "/user/statisticsProcess")) {
              return className.map((s, i) => {
                return (
                  <Button
                    key={i}
                    variant="outlined"
                    sx={{
                      mr: 1,
                      mb: 1,
                    }}
                  >
                    {s.title}
                    <span style={{ color: "orange" }}>({e.value[s.key]})</span>
                  </Button>
                );
              });
            }
          })}
      </Box>

      {/* <PageA onClick={handleClick1}>{a}</PageA>
      <PageB onClick={handleClick2} name={b} /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>区域</TableCell>
              <TableCell align="right">车辆编号</TableCell>
              <TableCell align="right">中控编号</TableCell>
              <TableCell align="right">剩余电量</TableCell>
              <TableCell align="right">是否故障</TableCell>
              <TableCell align="right">是否上锁</TableCell>
              <TableCell align="right">是否通电</TableCell>
              <TableCell align="right">使用状态</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Service;
