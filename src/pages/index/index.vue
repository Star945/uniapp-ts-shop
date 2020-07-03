<template>
  <view class="content">
    <!-- <u-swiper class="swiper" :list="list" @click="goDetail" height="400"></u-swiper>
    -->
    <uni-swiper-dot :info="list" :current="current" :mode="mode" field="content">
      <swiper class="swiper-box" @change="change" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="(item, index) in list" :key="index">
          <view class="swiper-item">
            <image class="image" :src="imgBase + item.img.url" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="home-main">
      <view class="home-main-theme">
        <!--主题精选-->
        <view class="home-main-header">精选主题</view>
        <view class="theme-box">
          <template v-for="(item,index) in themeArr">
            <view v-if="index==2" class="theme-item big" @click="onThemesItemTap" :key="index">
              <image :src="imgBase + item.topic_img.url" mode="aspectFill" />
            </view>
            <view v-else class="theme-item" @click="onThemesItemTap" :key="index">
              <image :src="imgBase + item.topic_img.url" mode="aspectFill" />
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Watch, Component } from "vue-property-decorator";
import { home } from "@/api/home";
import { IhomeBanner } from "@/api/api-types";
@Component({})
export default class Idenex extends Vue {
  private title: string = "";
  private show: boolean = false;
  private current: number = 0;
  private mode: string = "round";
  private list: any[] = [];
  private themeArr: any[] = [];
  private productsArr: any[] = [];
  /**  tslint:disable-next-line */
  /**  eslint-disable-next-line*/
  private imgBase: string = (getApp() as any).globalData.imgBase;
  onLoad() {
    this._loadData();
  }
  async _loadData(callback?: Function) {
    /* 获取banner信息 */
    let data: IhomeBanner;
    data = await home.getBannerData();
    this.list = data.items;
    /*获取主题信息*/
    let themeData = await home.getThemeData();
    this.themeArr = themeData;
    /*获取单品信息*/
    let productorData = await home.getProductorData();
    this.productsArr = productorData;

    callback && callback();
    // console.log(data)
  }
  onPullDownRefresh() {
    uni.showLoading({
      title: "加载中"
    });
    let that = this;
    setTimeout(function() {
      that._loadData(uni.stopPullDownRefresh);
    }, 1000);
  }
  ontThemesItemClick() {}
  /*跳转到商品详情*/
  onProductsItemTap(event: AnyObject) {}
  toggleSelect() {
    this.show === true ? (this.show = false) : (this.show = true);
  }
  look() {
    console.log("innder");
    this.show = true;
  }
  change(event: any) {
    let detail = event.detail;
    this.current = detail.current;
  }
  goDetail(index: number) {
    console.log(index);
  }
  onClose() {
    console.log("closeinner");
    this.show = false;
  }
  clickOverlay() {
    console.log("overlayinner");
  }
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 100%;
  .swiper-box {
    height: 400upx;
    width: 100%;
    .swiper-item {
      height: 100%;
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .home-main-header {
    display: flex;
    height: 60rpx;
    color: #ab956d;
    background-color: #fff;
    font-size: 32rpx;
    align-items: center;
    justify-content: center;
    margin: 20rpx 0;
  }
  .theme-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-content: space-between;
    .theme-item {
      display: flex;
      height: 375rpx;
      width: 50%;
      border-bottom: 4rpx solid #fff;
      position: relative;
      box-sizing: border-box;
      &:first-child {
        border-right: 4rpx solid #fff;
      }
      &.big {
        width: 100%;
      }
      &.big .theme-icon view {
        margin: 0 auto;
        width: 150rpx;
        height: 60rpx;
        border-radius: 60rpx;
        line-height: 60rpx;
        border: 1rpx solid #fff;
        text-align: center;
        font-size: 24rpx;
      }
      image {
        height: 100%;
        width: 100%;
      }
    }
  }
  .theme-icon {
    margin-top: 10rpx;
    height: 48rpx;
  }
  .theme-icon image {
    height: 48rpx;
    width: 48rpx;
  }
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
