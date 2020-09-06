/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/detail/detail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    other_userInfo: {},
    other_detailedInfo: {},
    other_openid: '',
  },

  toChat(event) {
    wx.navigateTo({
      url: `/pages/chat/chat?other_openid=${this.data.other_openid}`,
    });
  },

  makePhoneCall(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.other_detailedInfo.phone,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      other_openid: options.other_openid,
    });

    const that = this;
    const db = wx.cloud.database();

    db.collection('users').where({
      openid: that.data.other_openid,
    })
      .get({
        success(res) {
          that.setData({
            other_userInfo: res.data[0],
          });
        },
      });

    db.collection('userinfo').where({
      openid: that.data.other_openid,
    })
      .get({
        success(res) {
          that.setData({
            other_detailedInfo: res.data[0],
          });
        },
      });
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
