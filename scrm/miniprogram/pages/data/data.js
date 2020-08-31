// miniprogram/pages/data/data.js
import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp()

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        title: {
            text: '测试下面legend的红色区域不应被裁剪',
            left: 'center'
        },
        color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
        legend: {
            data: ['A', 'B', 'C'],
            top: 50,
            left: 'center',
            backgroundColor: 'red',
            z: 100
        },
        grid: {
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
            // show: false
        },
        series: [{
            name: 'A',
            type: 'line',
            smooth: true,
            data: [18, 36, 65, 30, 78, 40, 33]
        }, {
            name: 'B',
            type: 'line',
            smooth: true,
            data: [12, 50, 51, 35, 70, 30, 20]
        }, {
            name: 'C',
            type: 'line',
            smooth: true,
            data: [10, 30, 31, 50, 40, 20, 10]
        }]
    };

    chart.setOption(option);
    return chart;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ec: {
            onInit: initChart
        },
        openid: "",
        tabList: ["消息", "客户"],
        TabCur: 0,
        scrollLeft: 0,
        msgDataList: [{
            label: "今日消息数",
            value: "0"
        }, {
            label: "今日接受",
            value: "0"
        }, {
            label: "今日发送",
            value: "0"
        }, {
            label: "消息总数",
            value: "0"
        }, {
            label: "本周消息数",
            value: "0"
        }, {
            label: "本月消息数",
            value: "0"
        }],
        csrDataList: [{
            label: "访客总数",
            value: "0"
        }, {
            label: "本周来访",
            value: "0"
        }, {
            label: "本月来访",
            value: "0"
        }, {
            label: "客户总数",
            value: "0"
        }, {
            label: "本周新增",
            value: "0"
        }, {
            label: "本月新增",
            value: "0"
        }],
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            openid: app.globalData.openid
        })

        let that = this;
        const db = wx.cloud.database();
        db.collection('data').where({
            openid: that.data.openid
        })
            .get({
                success: function (res) {
                    that.setData({
                        "msgDataList[0].value": res.data[0].msg_daily,
                        "msgDataList[1].value": res.data[0].msg_receive,
                        "msgDataList[2].value": res.data[0].msg_send,
                        "msgDataList[3].value": res.data[0].msg_total,
                        "msgDataList[4].value": res.data[0].msg_weekly,
                        "msgDataList[5].value": res.data[0].msg_monthly,
                        "csrDataList[0].value": res.data[0].vis_total,
                        "csrDataList[1].value": res.data[0].vis_weekly,
                        "csrDataList[2].value": res.data[0].vis_monthly,
                        "csrDataList[3].value": res.data[0].csr_total,
                        "csrDataList[4].value": res.data[0].csr_weekly,
                        "csrDataList[5].value": res.data[0].csr_monthly
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