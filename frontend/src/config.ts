const apiUrl: string = process.env.REACT_APP_API_ENDPOINT || "http://localhost:8888/api";
interface Config {
  apiUrl: string;
}

export const config: Config = {
  apiUrl,
};

export default config;
