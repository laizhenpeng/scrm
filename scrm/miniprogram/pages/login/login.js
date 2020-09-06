/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// pages/login/login.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: '',
    isLogin: false,
  },

  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true,
    });
  },

  enterApp(e) {
    const that = this;
    const db = wx.cloud.database();

    db.collection('users').where({
      openid: that.data.openid,
    })
      .get({
        success(res) {
          if (res.data.length == 0) {
            db.collection('users').add({
              data: {
                openid: that.data.openid,
                avatarUrl: that.data.userInfo.avatarUrl,
                city: that.data.userInfo.city,
                country: that.data.userInfo.country,
                gender: that.data.userInfo.gender,
                language: that.data.userInfo.language,
                nickName: that.data.userInfo.nickName,
                province: that.data.userInfo.province,
              },
              success(res) {
                wx.switchTab({
                  url: '/pages/index/index',
                });
              },
            });
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            });
          }
        },
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!('avatarUrl' in app.globalData.userInfo)) {
      app.userInfoCallbacks = (res) => {
        this.setData({
          userInfo: res.userInfo,
        });
      };
    }

    if (!app.globalData.openid) {
      app.openidCallbacks = (res) => {
        this.setData({
          openid: res.result.openid,
        });
      };
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
    const that = this;
    const db = wx.cloud.database();

    db.collection('users').where({
      openid: app.globalData.openid,
    })
      .get({
        success(res) {
          if (res.data.length != 0) {
            that.setData({
              isLogin: true,
            });
          }
        },
      });
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
