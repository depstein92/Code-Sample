import * as React from "react";
import {
  fetchUtils,
  Admin,
  Resource,
  Login,
} from "react-admin";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import authProvider from "./authProvider";
import restProvider from "ra-data-simple-rest";
import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import manufacturers from "./manufacturers";
import products from "./products";
import packages from "./packages";
import scans from "./scans";
import MyLayout from './MyLayout';
import Dashboard from './Dashboard';
import Map from './map/Map';
import customRoutes from './routes';
import apiUri from './components/ApiUri'
import CustomLogin from './CustomLoginPage';
import { 
    ManufacturerIcon, 
    PackageIcon, 
    ScanIcon, 
    ProductIcon 
} from './images/nav/convertedSVG';


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = restProvider(apiUri(), httpClient);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#ffffff",
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  shadows: Array(25).fill("none"),
  typography: {
    fontFamily: [
      "Silka",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        color: "white", 
      },
    },
    MuiMenuButton: {
      root: {
        color: "white", 
        padding: "50px",
        background: "red",
      },
    },
    MuiAppBar: {
      colorSecondary: {
        backgroundColor: "rgba(255,255,255,0.4)",
        padding: '10px',
        height: '80px',
      },
    },
    RaMenuItemLink: {
      active: {
        opacity: "1"
      },
      root: {
        padding: "20px 25px",
        opacity: "0.8",
        textTransform: "capitalize",
        fontSize: "20px"
      },
    },
    RaSidebar: {
      root: {
        zIndex: 100,
        padding: '40px 10px'
      }
    },
    RaLayout: {
      content: {
        padding: "40px !important"
      }
    },
    MuiTableRow: {
      root: {
        minHeight: "60px"
      }
    }
  },
});

const MyLoginPage = () => (
  <Login
      backgroundImage="./login-background.jpg"
      backgroundcolor="#fff"
  />
);

const App = () => (
  // <Admin authProvider={authProvider} dataProvider={dataProvider} theme={theme} layout={MyLayout} dashboard={Dashboard} loginPage={MyLoginPage} customRoutes={customRoutes}>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Admin authProvider={authProvider} dataProvider={dataProvider} theme={theme} layout={MyLayout} dashboard={Map} loginPage={CustomLogin} customRoutes={customRoutes}>
      { permissions => [
        permissions === 'admin' ? <Resource name="manufacturers" icon={ManufacturerIcon} {...manufacturers} /> : null,
        <Resource name="products" {...products} icon={ProductIcon} />,
        <Resource name="packages" {...packages} icon={PackageIcon} />,
        <Resource name="scans" {...scans} icon={ScanIcon} />
      ]}
    </Admin>
  </MuiPickersUtilsProvider>
);

export default App;
