/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/view/view.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    detailedInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
    if ('username' in app.globalData.detailedInfo) {
      this.setData({
        detailedInfo: app.globalData.detailedInfo,
      });
    } else {
      const that = this;
      const db = wx.cloud.database();

      db.collection('userinfo').where({
        openid: app.globalData.openid,
      })
        .get({
          success(res) {
            if (res.data.length != 0) {
              app.globalData.detailedInfo = res.data[0];
              that.setData({
                detailedInfo: res.data[0],
              });
            }
          },
        });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
});
