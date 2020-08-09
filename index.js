const env = require('dotenv');
const fetch = require('node-fetch');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const utils = require('./utils/utils');
const app = express();

env.config();

//双色球
app.get('/ssq', (req, res) => {
    //获取跑的次数
    let times = req.url.split('?')[1].split('&');
    let redTimes = times[0].split('=')[1];
    let blueTimes = times[1].split('=')[1];

    let ssqFetch = async () => {
        let response = await fetch(`http://apis.juhe.cn/lottery/history?key=28105e60cccc2aaeb15e662059f507ab&lottery_id=ssq&page_size=50&page=1`);
        return await response.json();
    }

    //data就是ssqFetch函数执行返回的promise对象
    ssqFetch().then((data) => {
            //获取后的原始数组
            let lotteryList = data.result.lotteryResList;
            //用来保存筛选后的开奖号码
            let lottery_res = [];
            //这两个为保存最后筛选出来的红球和蓝球
            let finalReds = [];
            let finalBlues = [];

            for (let i = 0; i < lotteryList.length; i++) {
                lottery_res.push(lotteryList[i].lottery_res.split(','));
            }
            let blues = utils.balls(lottery_res);

            let newLottery = utils.reduceDimension(lottery_res);

            //红球
            for (let i = 0; i < redTimes; i++) {
                utils.findMax(newLottery, finalReds);
            }

            //蓝球
            for (let i = 0; i < blueTimes; i++) {
                utils.findMax(blues, finalBlues);
            }

            //红蓝排序
            finalReds.sort((a, b) => {
                return a - b;
            })

            finalBlues.sort((a, b) => {
                return a - b;
            })

            res.send({
                reds: finalReds,
                blues: finalBlues
            })
        })
        .catch((e) => {
            console.log(e);
        });
})

//大乐透
app.get('/dlt', (req, res) => {
    //获取跑的次数
    let times = req.url.split('?')[1].split('&');
    let redTimes = times[0].split('=')[1];
    let blueTimes = times[1].split('=')[1];

    let dltFetch = async () => {
        let response = await fetch(`http://apis.juhe.cn/lottery/history?key=28105e60cccc2aaeb15e662059f507ab&lottery_id=dlt&page_size=50&page=1`);
        return await response.json();
    }

    //data就是ssqFetch函数执行返回的promise对象
    dltFetch().then((data) => {
            //获取后的原始数组
            let lotteryList = data.result.lotteryResList;
            //用来保存筛选后的开奖号码
            let lottery_res = [];
            //这两个为保存最后筛选出来的红球和蓝球
            let finalReds = [];
            let finalBlues = [];

            for (let i = 0; i < lotteryList.length; i++) {
                lottery_res.push(lotteryList[i].lottery_res.split(','));
            }
            let blues = utils.balls(lottery_res);

            let newLottery = utils.reduceDimension(lottery_res);

            //红球
            for (let i = 0; i < redTimes; i++) {
                utils.findMax(newLottery, finalReds);
            }

            //蓝球
            for (let i = 0; i < blueTimes; i++) {
                utils.findMax(blues, finalBlues);
            }

            //红蓝排序
            finalReds.sort((a, b) => {
                return a - b;
            })

            finalBlues.sort((a, b) => {
                return a - b;
            })

            //返回结果
            res.send({
                reds: finalReds,
                blues: finalBlues
            })
        })
        .catch((e) => {
            console.log(e);
        });
})

//汇率查询
app.get('/exchange', (req, res) => {
    let entry = req.url.split('?')[1];
    if (entry === 'list') {
        let exchangeFetch = async () => {
            let response = await fetch('http://op.juhe.cn/onebox/exchange/list?key=c60e87da13996868c6fccad9dff4fd0e');
            return response.json();
        }
        exchangeFetch().then((data => {
            res.send(data.result.list);
        }))
    } else {
        let exchangeFrom = entry.split('&')[1].split('=')[1];
        let exchangeTo = entry.split('&')[2].split('=')[1];
        let exchangeFetch = async () => {
            let response = await fetch(`http://op.juhe.cn/onebox/exchange/currency?key=c60e87da13996868c6fccad9dff4fd0e&from=${exchangeFrom}&to=${exchangeTo}`);
            return response.json();
        }
        exchangeFetch().then((data => {
            res.send(data.result[0].result);
        }))
    }
})

// const certs = {
//     key: fs.readFileSync('./certs/private.key'),
//     cert: fs.readFileSync('./certs/certificate.crt')
// }

app.listen('3000', () => {
    console.log('running');
})

http.createServer(app).listen(88);
// https.createServer(certs, app).listen(1234);