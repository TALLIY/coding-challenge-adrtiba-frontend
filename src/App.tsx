import React from "react";
import { Route, Routes } from "react-router";
import routes from "./config/routes";
import IRoute from "./constants/routes";
import "./app.css";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Routes>
      {routes?.map((route: IRoute, index: number) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default App;
