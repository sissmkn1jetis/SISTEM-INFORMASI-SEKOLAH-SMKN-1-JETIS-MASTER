import axiosInstance from "./api";
import TokenService from "./token.service";
import router from "../router";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          store.dispatch('auth/logout');
          router.push("/login");
          try {
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            store.dispatch('auth/refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            // if (store.dispatch('auth/logout')) {
            //   router.push("/login");
            // }
            // store.dispatch('auth/logout');
            // router.push("/login");
            return Promise.reject(_error);
          }

        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;