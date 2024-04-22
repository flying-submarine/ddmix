import createAxiosByinterceptors from "@/utils/axios";
import { stringify } from 'qs';
import isEmpty from 'lodash/isEmpty';

const request = createAxiosByinterceptors({
});

const get=  async function(url, params = {}) {
    let path = url;
    if (!isEmpty(params)) {
      path = `${path}?${stringify(params)}`;
    }
    return request(path);
}
const post=  function post(url, params = {}) {
    return request(url, {
      method: 'post',
      data: params,
    });
}

const postFormData=  function post(url, params = {}) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    data: params,
  });
}

export { get , post, postFormData }
