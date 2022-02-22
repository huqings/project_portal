import React, { useReducer } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, indigo } from "@mui/material/colors";

import { storage } from "./tools";
import BaseLayout from "./component/layout/baseLayout";
import LoginLayout from "./component/layout/loginLayout";
import { reducer, initialState } from "./component/redux/reducer";
import WithAxios from "./api/withAxios";

export const AppDispatch = React.createContext({});

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
    },
    secondary: {
      main: red[600],
    },
    themeMode: true,
  },
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppDispatch.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <WithAxios>
          {state.authState ? <BaseLayout /> : <LoginLayout />}
        </WithAxios>
      </ThemeProvider>
    </AppDispatch.Provider>
  );
};

export default App;
