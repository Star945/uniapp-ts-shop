// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from './config';

class Token {
    tokenUrl: string
    verifyUrl: string
    constructor() {
        this.verifyUrl = Config.restUrl + 'token/verify';
        this.tokenUrl = Config.restUrl + 'token/user';
    }
    getProvider() {
        uni.getProvider({
            service: 'oauth',
            success: function (res: UniApp.GetProviderRes) {
                if (res.provider && ~res.provider.indexOf('qq')) {
                    uni.setStorageSync('provider', 'qq');
                } else if (res.provider && ~res.provider.indexOf('weixin')) {
                    uni.setStorageSync('provider', 'weixin');

                }else if(res.provider && ~res.provider.indexOf('sinaweibo')){
                    uni.setStorageSync('provider', 'sinaweibo');
                }else if(res.provider && ~res.provider.indexOf('xiaomi')){
                    uni.setStorageSync('provider','xiaomi')
                }else if(res.provider && ~res.provider.indexOf('apple')){
                    uni.setStorageSync('provider','apple')
                }else{
                    uni.setStorageSync('provider','undefinded')
                }
            }
        });
    }
    verify() {
        let token = uni.getStorageSync('token');
        let provider = uni.getStorageSync('provider')
        if (!provider) {
            this.getProvider()
        }
        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._veirfyFromServer(token);
        }
    }

    _veirfyFromServer(token: string) {
        let that = this;
        uni.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res: UniApp.RequestSuccessCallbackResult) {
                let data: any = res.data
                let valid = data.isValid;
                if (!valid) {
                    that.getTokenFromServer();
                }
            }
        })
    }

    getTokenFromServer(callBack?: Function) {
        let that = this;
        uni.login({
            provider: uni.getStorageSync('provider'),
            success: function (res: UniApp.LoginRes) {
                uni.request({
                    url: that.tokenUrl,
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: function (res: UniApp.RequestSuccessCallbackResult) {
                        if (res && res.data) {
                            let data: any = res.data
                            uni.setStorageSync('token', data.token);
                            callBack && callBack(data.token);
                        }

                    }
                })
            }
        })
    }
}

export { Token };