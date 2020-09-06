/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// miniprogram/pages/data/data.js
import * as echarts from '../../components/ec-canvas/echarts';

const app = getApp();

function initMsgChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  const option = {
    title: {
      text: '本周消息数',
      left: 'center',
    },
    color: ['#37A2DA', '#67E0E3', '#9FE6B8'],
    legend: {
      data: ['总数', '接受', '发送'],
      top: 25,
      left: 'center',
      z: 100,
    },
    grid: {
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [{
      name: '总数',
      type: 'line',
      data: [40, 25, 30, 45, 35, 50, 65],
    }, {
      name: '接受',
      type: 'line',
      data: [25, 15, 15, 20, 15, 25, 35],
    }, {
      name: '发送',
      type: 'line',
      data: [15, 10, 15, 25, 20, 25, 30],
    }],
  };

  chart.setOption(option);
  return chart;
}

function initVisChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  const option = {
    title: {
      text: '本周访客数',
      left: 'center',
    },
    color: '#0E9ED9',
    grid: {
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [{
      type: 'line',
      data: [120, 80, 105, 125, 110, 135, 150],
    }],
  };
  chart.setOption(option);
  return chart;
}

function initCsrChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  const option = {
    title: {
      text: '本周客户数',
      left: 'center',
    },
    color: '#0E9ED9',
    grid: {
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [{
      type: 'line',
      data: [75, 40, 60, 80, 60, 90, 105],
    }],
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec_msg: {
      onInit: initMsgChart,
    },
    ec_csr: {
      onInit: initCsrChart,
    },
    ec_vis: {
      onInit: initVisChart,
    },
    openid: '',
    tabList: ['消息', '客户'],
    TabCur: 0,
    scrollLeft: 0,
    msgDataList: [{
      label: '今日消息数',
      value: '0',
    }, {
      label: '今日接受',
      value: '0',
    }, {
      label: '今日发送',
      value: '0',
    }, {
      label: '消息总数',
      value: '0',
    }, {
      label: '本周消息数',
      value: '0',
    }, {
      label: '本月消息数',
      value: '0',
    }],
    csrDataList: [{
      label: '访客总数',
      value: '0',
    }, {
      label: '本周来访',
      value: '0',
    }, {
      label: '本月来访',
      value: '0',
    }, {
      label: '客户总数',
      value: '0',
    }, {
      label: '本周新增',
      value: '0',
    }, {
      label: '本月新增',
      value: '0',
    }],
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid: app.globalData.openid,
    });

    const that = this;
    const db = wx.cloud.database();

    db.collection('data').where({
      openid: app.globalData.openid,
      page: 'data',
    })
      .get({
        success(res) {
          that.setData({
            'msgDataList[0].value': res.data[0].msg_daily,
            'msgDataList[1].value': res.data[0].msg_receive,
            'msgDataList[2].value': res.data[0].msg_send,
            'msgDataList[3].value': res.data[0].msg_total,
            'msgDataList[4].value': res.data[0].msg_weekly,
            'msgDataList[5].value': res.data[0].msg_monthly,
            'csrDataList[0].value': res.data[0].vis_total,
            'csrDataList[1].value': res.data[0].vis_weekly,
            'csrDataList[2].value': res.data[0].vis_monthly,
            'csrDataList[3].value': res.data[0].csr_total,
            'csrDataList[4].value': res.data[0].csr_weekly,
            'csrDataList[5].value': res.data[0].csr_monthly,
          });
        },
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
