// miniprogram/pages/edit/edit.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        curDate: "",
        username: null,
        age: null,
        birthday: null,
        educationList: ["本科", "硕士", "博士", "其他"],
        educationIndex: null,
        company: null,
        title: null,
        school: null,
        department: null,
        phone: null,
        email: null,
        address: null,
        introduction: "",
        length: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            openid: app.globalData.openid,
            curDate: (new Date(new Date().getTime()).getFullYear().toString() + '-' + (new Date(new Date().getTime()).getMonth() + 1).toString() + '-' + new Date(new Date().getTime()).getDate().toString()).split(' ')[0]
        })
    },

    // bindChange
    bindEducationChange: function (e) {
        this.setData({
            educationIndex: e.detail.value
        })
    },
    bindBirthdayChange: function (e) {
        this.setData({
            birthday: e.detail.value
        })
    },

    // bindInput
    usernameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    ageInput: function (e) {
        this.setData({
            age: e.detail.value
        })
    },
    companyInput: function (e) {
        this.setData({
            company: e.detail.value
        })
    },
    titleInput: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    schoolInput: function (e) {
        this.setData({
            school: e.detail.value
        })
    },
    departmentInput: function (e) {
        this.setData({
            department: e.detail.value
        })
    },
    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    emailInput: function (e) {
        this.setData({
            email: e.detail.value
        })
    },
    addressInput: function (e) {
        this.setData({
            address: e.detail.value
        })
    },
    introductionInput: function (e) {
        this.setData({
            introduction: e.detail.value,
            length: e.detail.value.length
        })
    },


    clearInfo: function () {
        this.setData({
            username: null,
            age: null,
            birthday: null,
            educationIndex: null,
            company: null,
            title: null,
            school: null,
            department: null,
            phone: null,
            email: null,
            address: null,
            introduction: "",
            length: 0
        })
    },

    submitInfo: function () {
        let that = this
        if (isNaN(that.data.age)) {
            wx.showModal({
                title: "信息提示",
                content: "请正确填写年龄！"
            })
        }
        else if (that.data.username == null || that.data.birthday == null || that.data.educationIndex == null) {
            wx.showModal({
                title: "信息提示",
                content: "请完整填写基本信息！"
            })
        }
        else if (that.data.company == null || that.data.title == null || that.data.school == null || that.data.department == null) {
            wx.showModal({
                title: "信息提示",
                content: "请完整填写背景资料！"
            })
        }
        else if (that.data.phone == null || that.data.email == null || that.data.address == null) {
            wx.showModal({
                title: "信息提示",
                content: "请完整填写联系方式！"
            })
        }
        else if (that.data.length == 0) {
            wx.showModal({
                title: "信息提示",
                content: "请输入个人简介！"
            })
        }
        else {
            // 写
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