import axios from 'axios'
import { message } from 'antd';

  const createAxiosByinterceptors = (
    config
  ) => {
    const instance = axios.create({
      ...config,   
    });

  instance.interceptors.request.use(
    function (config) {
      config.url = "/cpq" + config.url
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
        message.destroy()
        const { code, data,success } = response.data;
         

        if (code === 1000 && success) return data; 
        if (code === 10007 ) {
            window.location.href=  "/login"   
        } 
        if(!success){
            message.error(response?.data?.message);
            return Promise.reject(response.data);
        }
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          window.location.href=  "/login"   

        }
        message.error(error?.response.statusText || "Server exception");
      }
      return Promise.reject(error);
    }
  );
    return instance;
};

export default createAxiosByinterceptors