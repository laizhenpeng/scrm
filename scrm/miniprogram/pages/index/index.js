// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {
            avatar: "",
            username: "赖圳鹏",
            company: "ABC公司",
            title: "前端开发实习生",
            phone: "18811397969",
            mail: "laizhenpeng17@gmail.com"
        },
        dailyDataList: [{
            id: "0",
            label: "今日访客数",
            value: "0"
        }, {
            id: "1",
            label: "今日新客户",
            value: "0"
        }],
        functionList: [{
            id: "0",
            label: "查看",
            icon: "/images/view.png"
        }, {
            id: "1",
            label: "编辑",
            icon: "/images/edit.png"
        }, {
            id: "2",
            label: "名片",
            icon: "/images/card.png"
        }, {
            id: "3",
            label: "扫描",
            icon: "/images/scan.png"
        }, {
            id: "4",
            label: "分享",
            icon: "/images/share.png"
        }]
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