
class Config{
    static restUrl: string;
    static onPay: boolean;
    constructor(){

    }
}

Config.restUrl = 'http://192.168.0.209:8088/api/v1/';
Config.onPay=true;  //是否启用支付

export {Config};