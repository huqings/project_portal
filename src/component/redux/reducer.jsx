const initialState = {
  authState: localStorage.getItem("id") ? true : false,
  showLeftMenu: true,
  showNavLeftMenu: true,
  showNavTapExtand: false,
  showNavTopContent: true,
  map: null,
  navTopMenu: [],
  navTopTabIndex: 0,
  globalWarnMessage: {
    show: false,
    content: "",
    type: "success",
  },
  snackBarBaseLayout: {
    show: false,
    content: "",
    type: "success",
    time: 0
  },
  snackBarLogin: {
    show: false,
    content: "",
    type: "success",
  },
  requestParams: undefined,
  responseParams: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "api.request":
      return {
        ...state,
        requestParams: action.data,
      };
    case "api.response":
      return {
        ...state,
        responseParams: [...state.responseParams, action.data]
      };
    case "auth.update":
      return {
        ...state,
        authState: action.data,
      };
    case "auth.logout":
      return {
        ...state,
        authState: false,
      };
    case "showNav.leftMenu":
      return {
        ...state,
        showNavLeftMenu: action.data,
      };
    case "showNav.tapExtand":
      return {
        ...state,
        showNavTapExtand: action.data,
      };
    case "showNav.topContent":
      return {
        ...state,
        showNavTopContent: action.data,
      };
    case "map.update":
      return {
        ...state,
        map: action.data,
      };
    case "navTopMenu.update":
      return {
        ...state,
        navTopMenu: action.data,
      };
    case "navTopTabIndex.update":
      return {
        ...state,
        navTopTabIndex: action.data,
      };
    case "global.warn":
      return {
        ...state,
        globalWarnMessage: {
          show: action.data.show,
          content: action.data.content,
          type: action.data.type,
        },
      };
    case "update.snackBarBaseLayout":
      return {
        ...state,
        snackBarBaseLayout: action.data,
      };
    case "update.snackBarLoginLayout":
      return {
        ...state,
        snackBarLoginLayout: action.data,
      };
    case "update.snackBarLogin": 
      return {
        ...state,
        snackBarLogin: action.data,
      };
  }
  return state;
};

export { reducer, initialState };
