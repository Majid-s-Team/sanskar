import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css"; // Use this to reset Ant Design styles
import "./css/index.css";
import "./lang/i18n.ts";
import "@ant-design/v5-patch-for-react-19";
import { UserProvider } from "./component/higherOrder/UserProvider";
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
