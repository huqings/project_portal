import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Breadcrumbs,
  IconButton,
  Paper,
} from "@mui/material";
import {
  OpenInFull as OpenInFullIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { AppDispatch } from "../../App";

import { homeInit } from "../../api/bicyle";

var map = null;

const Home = () => {
  const theme = useTheme();

  const { state, dispatch } = useContext(AppDispatch);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    init();
  }, []);

  function init() {
    // const map = new qq.maps.Map(document.getElementById("map"), {
    //   center: new qq.maps.LatLng(39.916527, 116.397128),
    //   zoom: 12,
    //   draggableCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c1.cur',
    //   draggingCursor : 'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/c2.cur'
    // });

    try {
      map = new TMap.Map("map", {
        zoom: 12,
        draggable: true,
        scrollable: true,
      });
      map.setMapStyleId(theme.palette.themeMode ? "style1" : "style2");
      dispatch({
        type: "map.update",
        data: map,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const requestHomeInit = () => {

    dispatch({
      type: "api.request",
      data: {
        url: "/home/init",
        method: "POST",
        data: {
          cooperatorId: 32,
          regionId: 29,
        },
      },
    });

    // homeInit({
    //   cooperatorId: 32,
    //   regionId: 29,
    // }).then((res) => {
    //   // setData(res.data);
    //   // handleMarkerCluster(res.data);
    //   handleMultiMarker(res.data);
    // });
  };

  const handleMultiMarker = (item) => {
    const centerPoint = getCenterPoint(item.judgeRegionBounds);

    map.setCenter(new TMap.LatLng(centerPoint.lat, centerPoint.lng));
    const geometries = item.resultData.map((e) => {
      return {
        styleId: 'marker',
        position: new TMap.LatLng(e.lat, e.lng)
      };
    });

    new TMap.MultiMarker({
      map: map,
      styles: {
        marker: new TMap.MarkerStyle({
          width: 30,
          height: 30,
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerNew.png',
        }),
      },
      geometries
    });
  }

  const handleMarkerCluster = (item) => {
    const centerPoint = getCenterPoint(item.judgeRegionBounds);
    map.setZoom(9)
    map.setCenter(new TMap.LatLng(centerPoint.lat, centerPoint.lng));
    const geometries = item.resultData.map((e) => {
      return {
        position: new TMap.LatLng(e.lat, e.lng),
      };
    });

    new TMap.MarkerCluster({
      id: "cluster",
      map: map,
      enableDefaultStyle: true, // 启用默认样式
      minimumClusterSize: 2, // 形成聚合簇的最小个数
      geometries,
      zoomOnClick: true
    });
  };

  const getCenterPoint = (items) => {
    const data = JSON.parse(items);
    var lng = 0.0,
      lat = 0.0;
    for (var i = 0; i < data.length; i++) {
      lng = lng + parseFloat(data[i][0]);
      lat = lat + parseFloat(data[i][1]);
    }
    lng = lng / data.length;
    lat = lat / data.length;
    return { lng: lng, lat: lat };
  };

  return (
    <>
      <Stack flexDirection={"row"} mb={1}>
        <TextField required label="区域" variant="filled" size="small" />
        <Button variant="text" onClick={requestHomeInit}>
          查询
        </Button>
      </Stack>
      <Box id="map" sx={{ width: "100%", height: "calc(100vh - 150px)" }}></Box>
    </>
  );
};

export default Home;
