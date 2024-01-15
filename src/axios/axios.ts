import axios from 'axios';

import type { CreateAxiosDefaults } from 'axios';

const BFF_URL = 'http://localhost:3000/';

const requestConfig: CreateAxiosDefaults = {
  baseURL: BFF_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};

const axiosInstance = axios.create(requestConfig);

export { axiosInstance };
