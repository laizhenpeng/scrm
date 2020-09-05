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
            label: "扫描",
            icon: "/images/scan.png"
        }, {
            label: "分享",
            icon: "/images/share.png"
        }]
    },

    toView: function (e) {
        if (this.data.isEdit) {
            wx.navigateTo({
                url: "/pages/view/view"
            })
        }
        else {
            wx.showToast({
                title: "请先前往编辑页面完善个人资料",
                icon: 'none',
                duration: 1500
            })
        }
    },

    toEdit: function (e) {
        wx.navigateTo({
            url: "/pages/edit/edit"
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
        this.setData({
            userInfo: app.globalData.userInfo,
            openid: app.globalData.openid
        })

        let that = this;
        const db = wx.cloud.database();
        
        db.collection("userinfo").where({
            openid: app.globalData.openid
        })
            .get({
                success: function (res) {
                    if (res.data.length != 0) {
                        app.globalData.detailedInfo = res.data[0]
                        that.setData({
                            detailedInfo: res.data[0],
                            isEdit: true
                        })
                    }
                }
            })

        db.collection("data").where({
            openid: app.globalData.openid
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