// miniprogram/pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        other_openid: "",
        other_userInfo: {},
        other_detailedInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            other_openid: options.other_openid
        })

        let that = this;
        const db = wx.cloud.database();
        const _ = db.command;
        db.collection('users').where({
            openid: that.data.other_openid
        })
        .get({
            success: function(res) {
                that.setData({
                    other_userInfo: res.data[0]
                })
            }
        })

        db.collection('userinfo').where({
            openid: that.data.other_openid
        })
        .get({
            success: function(res) {
                that.setData({
                    other_detailedInfo: res.data[0]
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