
import { Config } from "./config"
import { Token } from "./token"
import { getType } from "./tools"

interface IParams {
    url: string
    type?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
    setUpUrl?: boolean
    data?: any
}
class BaseRequest {
    baseRestUrl: string
    onPay: boolean
    constructor() {
        this.baseRestUrl = Config.restUrl;
        this.onPay = Config.onPay;
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params: IParams, noRefetch?: boolean): Promise<any> | undefined {
        
        let that = this;
        let url = this.baseRestUrl + params.url;

        if (!params.type) {
            params.type = 'GET'
        }
        //不需要再次组装地址
        if (params.setUpUrl == false) {
            url = params.url
        }
        try {
            return new Promise((resolve, reject) => {

                uni.request({
                    url: url,
                    data: params.data,
                    method: params.type,
                    header: {
                        "content-type": "application/json",
                        token: uni.getStorageSync("token"),
                    },
                    success: function (res: UniApp.RequestSuccessCallbackResult) {
                        let code: string = ''
                        if (res.statusCode) {
                            code = res.statusCode.toString()
                        }
                        var startChar = code.charAt(0)
                        if (startChar == "2") {
                            resolve(res.data)
                        }
                        else {
                            if (code == "401") {
                                if (!noRefetch) {
                                    that._refetch(params)
                                }
                            }
                            reject(res.data)
                        }
                    },
                    fail: function (err) {
                        reject(err)
                    },
                })
            })
        }
        catch (err) {
            that._processError(err)
        }
    }
    _refetch(param: IParams) {
        var token = new Token();
        token.getTokenFromServer((token: string) => {
            this.request(param, true);
        });
    }

    _processError(err: UniApp.GeneralCallbackResult) {
        let errMsg: string | undefined = ''
        if (getType(err) === 'Object') {
            errMsg = err.errMsg
        }
        uni.showToast({
            title: errMsg || '网络错误',
            icon: 'none',
            duration: 1500
        })
    }
}

export { BaseRequest }