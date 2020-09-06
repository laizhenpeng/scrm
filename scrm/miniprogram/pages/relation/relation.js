/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/relation/relation.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    tabList: ['消息', '客户'],
    TabCur: 0,
    scrollLeft: 0,
    msgList: [],
    csrList: [],
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });
  },

  toChat(event) {
    wx.navigateTo({
      url: `/pages/chat/chat?other_openid=${this.data.msgList[event.currentTarget.id].other_openid}`,
    });
  },

  toDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?other_openid=${this.data.csrList[event.currentTarget.id].other_openid}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid: app.globalData.openid,
    });

    const that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    const $ = _.aggregate;

    db.collection('records').aggregate()
      .match({
        openid: app.globalData.openid,
        type: 'msg',
      })
      .group({
        _id: '$other_openid',
        time: $.max('$time'),
        num: $.sum(1),
      })
      .sort({
        time: -1,
      })
      .end({
        success(res) {
          const temp = [];
          const { length } = res.list;
          for (let i = 0; i < length; i += 1) {
            db.collection('records').where({
              openid: app.globalData.openid,
              type: 'msg',
              other_openid: res.list[i]._id,
            })
              .orderBy('time', 'desc')
              .limit(1)
              .get({
                success(res) {
                  temp.push(res.data[0]);
                  if (i == length - 1) {
                    that.setData({
                      msgList: temp,
                    });
                  }
                },
              });
          }
        },
      });

    db.collection('records').where({
      openid: app.globalData.openid,
      type: 'csr',
    })
      .orderBy('other_username', 'desc')
      .get({
        success(res) {
          that.setData({
            csrList: res.data,
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
