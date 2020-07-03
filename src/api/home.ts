import { BaseRequest } from "@/utils/request"
const homeBse = ""
class Home extends BaseRequest {
    constructor() {
        super()
    }
    /*banner图片信息 */
    public getBannerData() {
        return this.request({
            url: 'banner/1'
        })
    }
    /*首页主题*/
    public getThemeData() {
        var param = {
            url: 'theme?ids=1,2,3',
        };
        return this.request(param);
    }

    /*首页部分商品*/
    public getProductorData() {
        var param = {
            url: 'product/recent',
        };
        return this.request(param);
    }
}
let home = new Home()
export { home }