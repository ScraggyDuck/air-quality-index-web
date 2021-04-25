import axios from "axios";

const Interceptors = () => {
  axios.interceptors.request.use(
    (conf) => {
      const token = localStorage.getItem("token");
      conf.headers = {
        Authorization: `Bearer ${token}`,
      };
      return conf;
    },
    (error) => {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
      return Promise.reject(error);
    }
  );
};

export default Interceptors;
