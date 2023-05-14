import axios from "axios";
import { useToken } from "../store";
import { AuthType } from "../types";

export const API_URL = "http://localhost:8123/api";

const $api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const access = useToken.getState().access;
  config.headers.Authorization = `Bearer ${access}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const setToknes = useToken.setState;
    const origRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry
    ) {
      origRequest._isRetry = true;
      try {
        const res = await axios.post<AuthType>(`${API_URL}/auth/refresh`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setToknes({
          access: res.data.access_token,
          refresh: res.data.refresh_token,
        });
        return $api.request(origRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export const fetcher = (url: string) => $api.get(url).then((res) => res.data);

export default $api;
