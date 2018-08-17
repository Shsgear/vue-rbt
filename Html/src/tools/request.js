import axios from 'axios';
import qs from 'qs';
import { Notification } from 'element-ui'

/**
 *
 * @param { msg } String
 * @param { code } Number
 * @class ConfigError
 */
class ConfigError {
  constructor(code, msg) {
    this.errorEntity = { code, msg };
  }
  display() {
    Notification({
      title: `Error ${this.errorEntity.code}`,
      message: this.errorEntity.msg,
      type: 'error'
    })
  }
  outputErr() {
    return this.errorEntity;
  }
}


// 默认超时时间
axios.defaults.timeout = 15 * 1000;

const { CancelToken } = axios;
const pending = [];

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

const removePending = (config) => {
  for (const p in pending) {
    // 当当前请求在数组中存在时执行函数体 执行取消操作
    // 同时把这条记录从数组中移除
    if (pending[p].u === `${config.url}&${config.method}`) {
      pending[p].abort('throttle_abort');
      pending.splice(p, 1);
    }
  }
};


axios.interceptors.request.use((config) => {
  // 配置参数中有节流选项
  const _config = config;
  if (_config.isThrottle) {
    removePending(config);
  }
  _config.cancelToken = new CancelToken((cancel) => {
    pending.push({
      u: `${_config.url}&${_config.method}`,
      abort: cancel,
    });
  });
  // console.log(_config);
  return _config;
}, () => {
  const error = new ConfigError(100, '请求配置出错');
  error.display();
  return Promise.reject(error.outputErr);
});


axios.interceptors.response.use((res) => {
  if (res.config.isThrottle) {
    removePending(res.config);
  }
  if (res.status && parseInt(res.status, 10) === 200) {
    // 接口请求成功
    const {
      status,
      msg,
      show,
    } = res.data;
    return Promise.resolve(res);
  }
  return res;
},
(err) => {
  // 接口请求失败
  const { config, message } = err;
  console.log('err ', err);
  // 进入此错误处理函数时，若未配置重试选项，则直接reject
  if (!config || !config.retry) {
    const error = new ConfigError(101, '请求响应出错');
    error.display();
    return Promise.reject(error.outputErr);
  }
  // 返回的响应体config message带有“被节流丢弃”的信息
  if (message === 'throttle_abort') {
    const error = new ConfigError(102, '节流器开启，此请求被丢弃');
    error.display();
    return Promise.reject(error.outputErr);
    
  }
  // 为追踪重试次数 设置变量
  config.__retryCount = config.__retryCount || 0;

  // 检查是否超过重试次数
  if (config.__retryCount >= config.retry) {
    console.log(err.status);
    const error = new ConfigError(103, `已自动重试"${config.url}" ${config.retry}次，无响应`);
    error.display();
    return Promise.reject(error.outputErr);
  }

  // 增加重试次数
  config.__retryCount += 1;

  //  formula (2^c - 1 / 2) * 1000(for mS to seconds)
  // const backOffDelay = config.retryDelay
  //     ? ((1 / 2) * (Math.pow(2, config.__retryCount) - 1)) * 1000
  //     : 1;
  // 创建promise。功能相当于创建重试间隔
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1000);
  });

  // backoff执行等待重试间隔后 再去重试axios请求
  return backoff.then(() => axios(config));
});

const getConfig = (url, method, isJson, params, retry, retryDelay, isThrottle) => {
  let config = {
    headers: {},
    url,
    method,
    retry,
    retryDelay,
    isThrottle,
  };
  

  // 表单提交
  if (!isJson) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.responseType = 'text';
    config.data = qs.stringify(params);
    // request payload || JSON提交
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  // 设置get=>params  post=>data
  if (['get', 'delete'].indexOf(method) > -1) {
    config.params = params;
  } else if (['post', 'put'].indexOf(method) > -1) {
    config.data = params;
  }
  return config;
};

// get可配置请求失败后重新请求次数
// axiosRetryInterceptor返回的Promise的reject是最后一次retry后返回的
// 所以在具体的请求那里的catch是catch到最后一次请求err
/* eslint-disable object-curly-newline */
/* eslint-disable  max-len */
const get = (url, params, retry, retryDelay) => axios(getConfig(url, 'get', true, params, retry, retryDelay));

const post = (url, params, retry = undefined, retryDelay = undefined, isThrottle = false) => axios(getConfig(url, 'post', false, params, retry, retryDelay, isThrottle));

const postJson = (url, params, retry = undefined, retryDelay = undefined, isThrottle = false) => axios(getConfig(url, 'post', true, params, retry, retryDelay, isThrottle));


export { get, post, postJson };
