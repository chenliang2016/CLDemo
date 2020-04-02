import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import { message } from 'antd'

import history from '../common/history'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  options.url = url
  options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      const { success, code, data,message } = response

      let result = {}
      result = data;

      if (result.success) {
         return Promise.resolve(result.data)
      }else{
        if (code == 401){
          history.replace('/login');
        }else{
          message.error(`[${result.code}]${result.message}`)
          return Promise.reject({
            success: false,
            data:{},
            code:result.code,
            message: result.message,
          })      
        }
      }
    })
    .catch(error => {
      const { response, message } = error

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      message.error(`${msg}`)
      /* eslint-disable */
      return Promise.reject({
        success: false,
        code:statusCode,
        message: msg,
      })
    })
}
