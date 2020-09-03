// miniprogram/pages/index/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        detailedInfo: {},
        openid: "",
        isLogin: false,
        isEdit: false,
        indexDataList: [{
            label: "今日访客数",
            value: "0"
        }, {
            label: "今日新客户",
            value: "0"
        }],
        functions: [{
            label: "查看",
            icon: "/images/view.png"
        }, {
            label: "编辑",
            icon: "/images/edit.png"
        }, {
            label: "名片",
            icon: "/images/card.png"
        }, {
            label: "扫描",
            icon: "/images/scan.png"
        }, {
            label: "分享",
            icon: "/images/share.png"
        }]
    },

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
        })

        let that = this;
        const db = wx.cloud.database();
        db.collection('userinfo').add({
            data: {
                _openid: that.data.openid,
                openid: that.data.openid,
                avatarUrl: e.detail.userInfo.avatarUrl,
                city: e.detail.userInfo.city,
                country: e.detail.userInfo.country,
                gender: e.detail.userInfo.gender,
                language: e.detail.userInfo.language,
                nickName: e.detail.userInfo.nickName,
                province: e.detail.userInfo.province,
            },
            success: function (res) {
                that.setData({
                    isLogin: true
                })
            }
        })
    },

    toView: function (e) {
        if (this.data.isLogin && this.data.isEdit) {
            wx.navigateTo({
                url: "../view/view"
            })
        }
    },

    toEdit: function (e) {
        wx.navigateTo({
            url: "../edit/edit"
        })
    },

    toCard: function (e) {
        wx.showToast({
            title: "敬请期待",
            icon: 'success',
            duration: 2000
        })
    },

    scanCode: function (e) {
        wx.scanCode({
            success(res) {
                console.log(res)
            }
        });
    },

    shareInfo: function (e) {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!("avatarUrl" in app.globalData.userInfo)) {
            app.userInfoCallbacks = res => {
                this.setData({
                    userInfo: res.userInfo
                })
            }
        }
        else {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }
        if (!app.globalData.openid) {
            app.openidCallbacks = res => {
                this.setData({
                    openid: res.result.openid
                })
            }
        }
        else {
            this.setData({
                openid: app.globalData.openid
            })
        }

        let that = this;
        const db = wx.cloud.database();

        db.collection("users").where({
            openid: that.openid
        })
            .get({
                success: function (res) {
                    if (res.data.length != 0) {
                        that.setData({
                            isLogin: true
                        })
                    }
                    else {
                        that.setData({
                            isLogin: false
                        })
                    }
                }
            })

        db.collection("userinfo").where({
            openid: that.openid
        })
            .get({
                success: function (res) {
                    if (res.data.length != 0) {
                        app.globalData.detailedInfo = res.data[0]
                        that.setData({
                            isEdit: true,
                            detailedInfo: res.data[0]
                        })
                    }
                    else {
                        that.setData({
                            isEdit: false
                        })
                    }
                }
            })

        db.collection("data").where({
            openid: that.openid
        })
            .get({
                success: function (res) {
                    that.setData({
                        "indexDataList[0].value": res.data[0].vis_daily,
                        "indexDataList[1].value": res.data[0].csr_daily
                    })
                }
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})