import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import {Provider} from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store= {store}
  >
    <ConfigProvider 
      theme={{
        token:{
           colorPrimary: '#2e3840',
           colorBorder: "#2E3840",
        },
      }
      
      }>
        <App/>
    </ConfigProvider>
 
  </Provider>
);


reportWebVitals();
