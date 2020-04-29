import axios from 'axios';
import config from '../config/default.json';

const api = axios.create({baseURL : config.api.server + ":" + config.api.port});

export default api;