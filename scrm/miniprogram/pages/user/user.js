/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/user/user.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    detailedInfo: {},
  },

  showToast(e) {
    wx.showToast({
      title: '敬请期待',
      icon: 'success',
      duration: 1500,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!('username' in app.globalData.detailedInfo)) {
      wx.showModal({
        title: '信息提示',
        content: '请完善个人信息！',
        showCancel: false,
        success(res) {
          wx.switchTab({
            url: '/pages/index/index',
          });
        },
      });
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        detailedInfo: app.globalData.detailedInfo,
      });
    }
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
