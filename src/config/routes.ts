import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";
import IRoute from "../constants/routes";

/**
 * define routes
 */

const SourceRoutes: IRoute[] = [
  {
    name: `Dashboard`,
    path: `/:source`,
    component: Dashboard,
    auth: false,
  },
];

const MainRoutes: IRoute[] = [
  {
    name: "Main Page",
    path: "/",
    component: MainPage,
    auth: false,
  },
];

const routes: IRoute[] = [...SourceRoutes, ...MainRoutes];

export default routes;
