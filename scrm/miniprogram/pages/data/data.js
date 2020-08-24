// miniprogram/pages/data/data.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgDataList: [{
            id: "0",
            label: "今日消息数",
            value: "0"
        }, {
            id: "1",
            label: "今日接受",
            value: "0"
        }, {
            id: "2",
            label: "今日发送",
            value: "0"
        }, {
            id: "3",
            label: "消息总数",
            value: "0"
        }, {
            id: "4",
            label: "本周消息数",
            value: "0"
        }, {
            id: "5",
            label: "本月消息数",
            value: "0"
        }],
        csrDataList: [{
            id: "0",
            label: "访客总数",
            value: "0"
        }, {
            id: "1",
            label: "本周来访",
            value: "0"
        }, {
            id: "2",
            label: "本月来访",
            value: "0"
        }, {
            id: "3",
            label: "客户总数",
            value: "0"
        }, {
            id: "4",
            label: "本周新增",
            value: "0"
        }, {
            id: "5",
            label: "本月新增",
            value: "0"
        }],
        tabList: ["消息", "客户"],
        TabCur: 0,
        scrollLeft:0
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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