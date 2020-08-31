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
        scrollLeft: 0,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        msgList: [],
        csrList: []
    },

    tabSelect(e) {
        this.setData({
            openid: app.globalData.openid,
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },

    toChat: function (event) {
        wx.navigateTo({
            url: "../chat/chat?other_openid=" + this.data.msgList[event.currentTarget.id].other_openid
        })
    },

    toDetail: function (event) {
        wx.navigateTo({
            url: "../detail/detail?other_openid=" + this.data.csrList[event.currentTarget.id].other_openid
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        const db = wx.cloud.database();
        const _ = db.command
        const $ = _.aggregate;
        // openid: that.data.openid
        db.collection("records").aggregate()
            .match({
                openid: "ox8OR4iMybOXuDKss4VpXWdHr_r8",
                type: "msg"
            })
            .group({
                _id: "$other_openid",
                num: $.sum(1)
            })
            .end({
                success: function (res) {
                    let temp = []
                    let length = res.list.length
                    for (let i = 0; i < length; i++) {
                        db.collection("records").where({
                            openid: "ox8OR4iMybOXuDKss4VpXWdHr_r8",
                            type: "msg",
                            other_openid: res.list[i]._id
                        })
                            .orderBy("time", "desc")
                            .limit(1)
                            .get({
                                success: function (res) {
                                    // let result = res.data[0]
                                    // result.time = result.time.getFullYear().toString() + "年" + (result.time.getMonth()+1).toString() + "月" + result.time.getDate().toString() + "日 " + result.time.getHours().toString() + ":" + result.time.getMinutes().toString() + ":" + result.time.getSeconds().toString()
                                    temp.push(res.data[0])
                                    if (i == length - 1) {
                                        that.setData({
                                            msgList: temp
                                        })
                                    }
                                }
                            })
                    }
                }
            })
        db.collection("records").where({
            openid: "ox8OR4iMybOXuDKss4VpXWdHr_r8",
            type: "csr"
        })
            .get({
                success: function (res) {
                    that.setData({
                        csrList: res.data
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