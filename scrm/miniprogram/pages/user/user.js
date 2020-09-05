// miniprogram/pages/user/user.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        detailedInfo: {}
    },

    showToast: function (e) {
        wx.showToast({
            title: "敬请期待",
            icon: 'success',
            duration: 1500
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!("username" in app.globalData.detailedInfo)) {
            wx.showModal({
                title: "信息提示",
                content: "请完善个人信息！",
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                },
            })
        }
        else {
            this.setData({
                userInfo: app.globalData.userInfo,
                detailedInfo: app.globalData.detailedInfo
            })
        }
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