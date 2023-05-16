import axios from "axios";
import { useToken } from "../store";
import { AuthType } from "../types";

// export const API_URL = "http://109.174.29.40:8123/api";
export const API_URL = "http://localhost:8123/api";
export const WS_URL = "ws://109.174.29.40:8123/api/messages/ws/";

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
    const getTokens = useToken.getState;
    const config = error.config;

    if (error.response.status === 401 && config && !config.sent) {
      config.sent = true;
      try {
        const $ref = axios.create({
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getTokens().refresh}`,
            "Content-Type": "application/json",
          },
          baseURL: API_URL,
        });
        const res = await $ref.post<AuthType>(`${API_URL}/auth/refresh`);
        setToknes({
          access: res.data.access_token,
          refresh: res.data.refresh_token,
        });
        return $api.request(config);
      } catch (e) {
        console.log(e);
        setToknes({ access: "", refresh: "" });
      }
    }
    throw error;
  }
);

export const fetcher = (url: string) => $api.get(url).then((res) => res.data);

export default $api;
