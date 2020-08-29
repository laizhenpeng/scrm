// miniprogram/pages/relation/relation.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        tabList: ["消息", "客户"],
        TabCur: 0,
        scrollLeft:0,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        msgList: [],
        csrList: []
    },

    tabSelect(e) {
        this.setData({
            openid: app.globalData.openid,
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let list = [];
        for (let i = 0; i < 26; i++) {
            list[i] = String.fromCharCode(65 + i)
        }
        this.setData({
            list: list
        })

        let that = this;
        const db = wx.cloud.database();
        const _ = db.command;
        const $ = _.aggregate;

        db.collection('records').where({
            openid: that.data.openid,
            type: "msg"
        })
        .orderBy('time','desc')
        .get({
            success: function(res) {
                // for (let i = 0; i < res.data.length; i++) {
                //     let message = {}
                //     message['other_avatarUrl'] = res.data[i].other_avatarUrl
                //     message['other_username'] = res.data[i].other_avatarUrl
                //     message['content'] = res.data[i].content
                //     message['time'] = res.data[i].time
                // }
                that.setData({
                    msgList: res.data
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