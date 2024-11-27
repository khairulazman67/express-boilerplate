import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const baseAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  config.headers = {
    ...config.headers,
    "X-Custom-Header": "CustomHeaderValue",
  };

  // Logging request details
  console.log("Request Config:", config);

  const response = await axios({
    ...config,
    adapter: undefined,
  });

  // Logging response details
  console.log("Response:", response);

  return response;
};
