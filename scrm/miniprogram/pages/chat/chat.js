// miniprogram/pages/chat/chat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        other_openid: "",
        messages: [],
        content: "",
        length: 0
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
        db.collection('records').where({
            openid: "ox8OR4iMybOXuDKss4VpXWdHr_r8",
            type: "msg",
            other_openid: that.data.other_openid
        })
        .orderBy("time", "asc")
        .get({
            success: function(res) {
                let result = res.data
                for (let i = 0; i < result.length; i++) {
                    result[i].time = result[i].time.getFullYear().toString() + "年" + (result[i].time.getMonth()+1).toString() + "月" + result[i].time.getDate().toString() + "日 " + result[i].time.getHours().toString() + ":" + result[i].time.getMinutes().toString() + ":" + result[i].time.getSeconds().toString()
                }
                that.setData({
                    messages: result
                })
            }
        })
    },

    messageInput: function(e){
        this.setData({
          content: e.detail.value,
          length: e.detail.value.length
        })
    },

    submitInfo: function () {
        let that = this
        if (that.data.length == 0) {
            wx.showModal({
                title: "信息提示",
                content: "请输入消息！"
            })
        } else {
            const db = wx.cloud.database();
            const _ = db.command;
            db.collection('records').add({
                data: {
                    // openid
                    // username
                    // avatarUrl
                    // other_openid
                    // other_username
                    // other_avatarUrl
                    // type
                    direction: "to"
                    // content
                    // time
                },
                success: function (res) {
                    console.log(res)
                }
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