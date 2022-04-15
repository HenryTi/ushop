import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './tonwa.css';
import { BrowserRouter } from 'react-router-dom';
import { UqConfig } from 'tonwa-uq';
import { AppConfig, UqAppRoot } from 'tonwa-com-uq';
import { AppRoutes } from 'App/AppWithPageStack';
import { UqApp } from 'App';
import uqConfigs from './uqconfig.json';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

const appConfig: AppConfig = {
  version: '0.1.0',
  uqs: uqsFromConfigs(),
  noUnit: true,
  oem: undefined,
  htmlTitle: 'UShop',
};

function uqsFromConfigs(): UqConfig[] {
  let { devs, uqs } = uqConfigs;
  return uqs.map(v => {
    let { dev, name, alias } = v;
    return {
      dev: (devs as any)[dev],
      name,
      alias,
    };
  });
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UqAppRoot uqApp={new UqApp(appConfig)}>
        <AppRoutes />
      </UqAppRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
