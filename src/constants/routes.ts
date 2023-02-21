//data to be provided to fetch from backend
const serverURL = "http://127.0.0.1:5000/";

export default {
  serverURL,
};

export default interface IRoute {
  path: string;
  name: string;
  component: any;
  props?: any;
  auth?: boolean;
}
