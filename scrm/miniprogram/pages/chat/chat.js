/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/chat/chat.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    other_openid: '',
    username: '',
    avatarUrl: '',
    other_username: '',
    other_avatarUrl: '',
    messages: [],
    content: null,
    length: 0,
  },

  contentInput(e) {
    this.setData({
      content: e.detail.value,
      length: e.detail.value.length,
    });
  },

  sendBtn() {
    if (this.data.length == 0) {
      wx.showModal({
        title: '信息提示',
        content: '消息内容不能为空！',
        showCancel: false,
      });
    } else {
      const that = this;
      const db = wx.cloud.database();

      const time = new Date();
      db.collection('records').add({
        data: {
          openid: that.data.openid,
          username: that.data.username,
          avatarUrl: that.data.avatarUrl,
          other_openid: that.data.other_openid,
          other_username: that.data.other_username,
          other_avatarUrl: that.data.other_avatarUrl,
          type: 'msg',
          direction: 'to',
          content: that.data.content,
          time,
        },
        success(res) {
          db.collection('records').add({
            data: {
              openid: that.data.other_openid,
              username: that.data.other_username,
              avatarUrl: that.data.other_avatarUrl,
              other_openid: that.data.openid,
              other_username: that.data.username,
              other_avatarUrl: that.data.avatarUrl,
              type: 'msg',
              direction: 'from',
              content: that.data.content,
              time,
            },
            success(res) {
              const temp = that.data.messages;
              const data = {};
              data._id = 'temp_id';
              data.openid = that.data.openid;
              data.username = that.data.username;
              data.avatarUrl = that.data.avatarUrl;
              data.other_openid = that.data.other_openid;
              data.other_username = that.data.other_username;
              data.other_avatarUrl = that.data.other_avatarUrl;
              data.type = 'msg';
              data.direction = 'to';
              data.content = that.data.content;
              data.time = `${time.getFullYear().toString()}年${(time.getMonth() + 1).toString()}月${time.getDate().toString()}日 ${time.getHours().toString()}:${time.getMinutes().toString()}:${time.getSeconds().toString()}`;
              temp.push(data);
              that.setData({
                messages: temp,
                content: null,
                length: 0,
              });
              that.pageScrollToBottom();
            },
          });
        },
      });
    }
  },

  pageScrollToBottom() {
    wx.createSelectorQuery().select('#chat').boundingClientRect((rect) => {
      wx.pageScrollTo({
        scrollTop: rect.height + 64 + 75,
      });
    }).exec();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid: app.globalData.openid,
      other_openid: options.other_openid,
    });

    const that = this;
    const db = wx.cloud.database();

    db.collection('records').where({
      openid: app.globalData.openid,
      type: 'msg',
      other_openid: that.data.other_openid,
    })
      .orderBy('time', 'asc')
      .get({
        success(res) {
          if (res.data.length == 0) {
            db.collection('users').where({
              openid: that.data.openid,
            })
              .get({
                success(res) {
                  that.setData({
                    avatarUrl: res.data[0].avatarUrl,
                  });
                },
              });

            db.collection('users').where({
              openid: that.data.other_openid,
            })
              .get({
                success(res) {
                  that.setData({
                    other_avatarUrl: res.data[0].avatarUrl,
                  });
                },
              });

            db.collection('userinfo').where({
              openid: that.data.openid,
            })
              .get({
                success(res) {
                  that.setData({
                    username: res.data[0].username,
                  });
                },
              });

            db.collection('userinfo').where({
              openid: that.data.other_openid,
            })
              .get({
                success(res) {
                  that.setData({
                    other_username: res.data[0].username,
                  });
                },
              });
          } else {
            const result = res.data;
            for (let i = 0; i < result.length; i += 1) {
              result[i].time = `${result[i].time.getFullYear().toString()}年${(result[i].time.getMonth() + 1).toString()}月${result[i].time.getDate().toString()}日 ${result[i].time.getHours().toString()}:${result[i].time.getMinutes().toString()}:${result[i].time.getSeconds().toString()}`;
            }
            that.setData({
              messages: result,
              username: result[0].username,
              avatarUrl: result[0].avatarUrl,
              other_username: result[0].other_username,
              other_avatarUrl: result[0].other_avatarUrl,
            });
            that.pageScrollToBottom();
          }
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
