import axios from 'axios'
import format from './format'

var instance = axios.create({
  timeout: 60000,
  method: 'post',
  headers: {
    post: {
      'Content-Type': ''
    }
  }
})

instance.interceptors.request.use(function(config) {
  let params = {
    "packageList": {
      "packages": {
        "header": {
          "requestType": "LOGIN",
          "comId": globalConfig.comId,
          "from": globalConfig.from,
          "sendTime": new Date().format('yyyy-MM-dd HH:mm:ss'),
          "orderSerial": "orderId",
          "comSerial": "comSerial"
        },
        request: DES3.encrypt('', JSON.stringify(config.data).replace(/\s/g, ""))
      }
    }
  };

  let paramStr = JSON.stringify(params)
  let sign = hex_hmac_md5(globalConfig.transfer, paramStr)

  config.url = globalConfig.rootUrl
  config.url = config.url + 'interfaceChannel?sign=' + sign + '&com_id=' + globalConfig.comId
  config.data = paramStr

  return config
}, function(error) {
  console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
  try {
    response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
  } catch (e) {
    console.log(e)
  }

  return response
}, function(error) {
  console.log(error)
  return Promise.reject(error)
})

export default {
  post: (params) => {
    return instance.post(null, params)
  }
}