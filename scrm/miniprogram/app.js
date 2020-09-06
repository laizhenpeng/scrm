/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'scrm-p8gch',
        traceUser: true,
      });
    }

    wx.getSystemInfo({
      success: (e) => {
        this.globalData.StatusBar = e.statusBarHeight;
        const custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    });

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo;
              if (this.userInfoCallbacks) {
                this.userInfoCallbacks(res);
              }
            },
          });
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败', err);
      },
    });

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        this.globalData.openid = res.result.openid;
        if (this.openidCallbacks) {
          this.openidCallbacks(res);
        }
      },
      fail: (err) => {
        console.error('[云函数] [login] 调用失败', err);
      },
    });
  },

  globalData: {
    userInfo: {},
    detailedInfo: {},
    openid: '',
  },
});
