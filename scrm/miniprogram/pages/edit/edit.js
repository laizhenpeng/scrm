/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/edit/edit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    curDate: '',
    username: null,
    age: null,
    birthday: null,
    educationList: ['本科', '硕士', '博士', '其他'],
    educationIndex: null,
    company: null,
    title: null,
    school: null,
    department: null,
    phone: null,
    email: null,
    address: null,
    introduction: null,
    length: 0,
    modalName: null,
  },

  // bindChange
  bindBirthdayChange(e) {
    this.setData({
      birthday: e.detail.value,
    });
  },

  bindEducationChange(e) {
    this.setData({
      educationIndex: e.detail.value,
    });
  },

  // bindInput
  usernameInput(e) {
    this.setData({
      username: e.detail.value,
    });
  },

  ageInput(e) {
    this.setData({
      age: e.detail.value,
    });
  },

  companyInput(e) {
    this.setData({
      company: e.detail.value,
    });
  },

  titleInput(e) {
    this.setData({
      title: e.detail.value,
    });
  },

  schoolInput(e) {
    this.setData({
      school: e.detail.value,
    });
  },

  departmentInput(e) {
    this.setData({
      department: e.detail.value,
    });
  },

  phoneInput(e) {
    this.setData({
      phone: e.detail.value,
    });
  },

  emailInput(e) {
    this.setData({
      email: e.detail.value,
    });
  },

  addressInput(e) {
    this.setData({
      address: e.detail.value,
    });
  },

  introductionInput(e) {
    this.setData({
      introduction: e.detail.value,
      length: e.detail.value.length,
    });
  },

  clearBtn() {
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
      introduction: null,
      length: 0,
    });
  },

  submitBtn() {
    if (isNaN(this.data.age)) {
      wx.showModal({
        title: '信息提示',
        content: '请正确填写年龄！',
        showCancel: false,
      });
    } else if (isNaN(this.data.phone)) {
      wx.showModal({
        title: '信息提示',
        content: '请正确填写手机号码！',
        showCancel: false,
      });
    } else if (this.data.username == null || this.data.age == null
        || this.data.birthday == null || this.data.educationIndex == null) {
      wx.showModal({
        title: '信息提示',
        content: '请完整填写基本信息！',
        showCancel: false,
      });
    } else if (this.data.company == null || this.data.title == null
        || this.data.school == null || this.data.department == null) {
      wx.showModal({
        title: '信息提示',
        content: '请完整填写背景资料！',
        showCancel: false,
      });
    } else if (this.data.phone == null || this.data.email == null || this.data.address == null) {
      wx.showModal({
        title: '信息提示',
        content: '请完整填写联系方式！',
        showCancel: false,
      });
    } else if (this.data.length == 0) {
      wx.showModal({
        title: '信息提示',
        content: '请输入个人简介！',
        showCancel: false,
      });
    } else {
      const that = this;
      const db = wx.cloud.database();

      db.collection('userinfo').where({
        openid: that.data.openid,
      })
        .get({
          success(res) {
            if (res.data.length == 0) {
              db.collection('userinfo').add({
                data: {
                  openid: that.data.openid,
                  username: that.data.username,
                  age: that.data.age,
                  birthday: that.data.birthday,
                  education: that.data.educationList[that.data.educationIndex],
                  company: that.data.company,
                  title: that.data.title,
                  school: that.data.school,
                  department: that.data.department,
                  phone: that.data.phone,
                  email: that.data.email,
                  address: that.data.address,
                  introduction: that.data.introduction,
                },
                success(res) {
                  that.setData({
                    modalName: 'succModal',
                  });
                },
              });
            } else {
              const id = res.data[0]._id;
              db.collection('userinfo').doc(id).set({
                data: {
                  openid: that.data.openid,
                  username: that.data.username,
                  age: that.data.age,
                  birthday: that.data.birthday,
                  education: that.data.educationList[that.data.educationIndex],
                  company: that.data.company,
                  title: that.data.title,
                  school: that.data.school,
                  department: that.data.department,
                  phone: that.data.phone,
                  email: that.data.email,
                  address: that.data.address,
                  introduction: that.data.introduction,
                },
                success(res) {
                  that.setData({
                    modalName: 'succModal',
                  });
                },
              });
            }
          },
        });
    }
  },

  hideModal() {
    this.setData({
      modalName: null,
    });
  },

  toIndex() {
    this.hideModal();
    wx.navigateBack({
      delta: 1,
    });
  },

  toView() {
    this.hideModal();
    wx.redirectTo({
      url: '/pages/view/view',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid: app.globalData.openid,
      curDate: (`${new Date(new Date().getTime()).getFullYear().toString()}-${(new Date(new Date().getTime()).getMonth() + 1).toString()}-${new Date(new Date().getTime()).getDate().toString()}`).split(' ')[0],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
});
