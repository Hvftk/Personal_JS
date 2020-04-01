
/*
本脚本仅适用于电视家签到 测试版，可能有bug
获取Cookie方法:
1.将下方[rewrite_local]和[Task]地址复制的相应的区域
下，
2.APP登陆账号后，点击首页'每日签到',即可获取Cookie.

3.鄙人非专业人士，代码不规范，请大佬请多多指教，多提出错误，鄙人一定修改

4. 2020年4月1日1 12:18分更新

仅测试Quantumult x，Surge、Loon自行测试
By Macsuny
~~~~~~~~~~~~~~~~
Surge 4.0 :
[Script]
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/dianshijia.js
# 获取电视家 Cookie.
http-request http:\/\/act\.gaoqingdianshi\.com\/\/api\/v4\/sign\/signin\? script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/dianshijia.js
~~~~~~~~~~~~~~~~

QX 1.0.6+ :
[task_local]
0 9 * * * dianshijia.js

[rewrite_local]

http:\/\/act\.gaoqingdianshi\.com\/\/api\/v4\/sign\/signin\? url script-request-header dianshijia.js
~~~~~~~~~~~~~~~~

*/
const cookieName = '电视家 📺'
const signurlKey = 'sy_signurl_dsj'
const signheaderKey = 'sy_signheader_dsj'
const sy = init()
const signurlVal = sy.getdata(signurlKey)
const signheaderVal = sy.getdata(signheaderKey)

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
  } else {
   sign()
  }
function GetCookie() {
const requrl = $request.url
if ($request && $request.method != 'OPTIONS') {
  const signurlVal = requrl
  const signheaderVal = JSON.stringify($request.headers)
  sy.log(`signurlVal:${signurlVal}`)
  sy.log(`signheaderVal:${signheaderVal}`)
  if (signurlVal) sy.setdata(signurlVal, signurlKey)
  if (signheaderVal) sy.setdata(signheaderVal, signheaderKey)
  sy.msg(cookieName, `获取Cookie: 成功`, ``)
  sy.done()
 }
}
const title = `${cookieName}`
        let subTitle = ``
        let detail = ``
function sign() {      
     return new Promise((resolve, reject) =>
     {
      const url = { url: signurlVal, headers: JSON.parse(signheaderVal)}
      sy.get(url, (error, response, data) =>
       {
      sy.log(`${cookieName}, data: ${data}`)
      const result = JSON.parse(data)
      if  (result.errCode == 0) 
          { subTitle = `签到结果: 成功🎉`
            detail = `已签到 ${result.data.conDay}天，获取金币${result.data.reward[0].count}，获得奖励${result.data.reward[1].name}`
      
        }
    else if  (result.errCode == 6)
           {
            subTitle = `签到结果: 失败`
            detail = `原因: ${result.msg}`
            sy.msg(title, subTitle, detail)
           }
    else   { 
             all()
           }         
       })
    })
  sy.done()
}
async function all() 
{ 
  await share();
  await total();
  await cash();
  await award();
}
function share() {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
     shareurl = { url: `http://api.gaoqingdianshi.com/api/v4/task/complete?code=1M005`, headers: JSON.parse(signheaderVal)}
      sy.get(shareurl, (error, response, data) => 
         {
      sy.log(`${cookieName}, data: ${data}`)
      const result = JSON.parse(data)
      if (result.errCode == 0)  
              {
            detail += `\n分享金币: 💰${result.data.getCoin}`
            sy.msg(title, subTitle, detail)
              } 
       if (result.errCode == 4000)  
             { sy.log('分享结果: 您已分享过,无需重复分享')}
          resolve()
          })
       })
   })
}
function total() {
      detail = `签到结果: 重复签到‼️`
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    let url = { url: `http://api.gaoqingdianshi.com/api/coin/info`, headers: JSON.parse(signheaderVal)}
    sy.get(url, (error, response, data) => 
      {
      sy.log(`${cookieName}, data: ${data}`)
      const result = JSON.parse(data)
      subTitle = `待兑换金币: 💰${result.data.coin}    `    
   try{
      for(tempCoin in data){
       for (i=0;i<result.data.tempCoin.length;i++) {  
      coinid = result.data.tempCoin[i].id
      url5 = { url: `http://api.gaoqingdianshi.com/api/coin/temp/exchange?id=`+coinid, headers: JSON.parse(signheaderVal)}
      sy.get(url5, (error, response, data) =>
         { 
         sy.log(`${cookieName}, data: ${data}`)
         })    
        }
       }
      }
     catch(err){
      err };
     resolve()
     })
   })
  }) 
}
function cash() {
  return new Promise((resolve, reject) => {
      let url = { url: `http://api.gaoqingdianshi.com/api/cash/info`, headers: JSON.parse(signheaderVal)}
      sy.get(url, (error, response, data) => 
      {
      sy.log(`data: ${data}`)
      const result = JSON.parse(data)
      subTitle += '现金收益: 💶'+ result.data.amount/100+'元 '
      resolve()
      })
   })
}
function award() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    let awardurl = { url: `http://act.gaoqingdianshi.com/api/v4/sign/get`, headers: JSON.parse(signheaderVal)}
     sy.get(awardurl, (error, response, data) => 
  {
     sy.log(`${cookieName}, data: ${data}`)
     const result = JSON.parse(data)
     if (result.errCode == 0) 
    {
     var d = `${result.data.currentDay}`
     for (i=0; i < result.data.recentDays.length;i++)      
        {
       if (d == result.data.recentDays[i].day)
          {  detail += `   已连续签到${d}天`
       var j = result.data.recentDays[i].rewards.length
       if (j > 1){
                detail += `\n今日奖励: ${result.data.recentDays[i].rewards[1].name}   `
                 } 
          else   if (j == 1) 
                 { 
                detail += `\n今日无奖励   `
                 }
        var k = result.data.recentDays[i+1].rewards.length
        if ( k > 1 ) {
                detail += `明日奖励: ${result.data.recentDays[i+1].rewards[1].name}`
           
                 }  
           else  { 
              detail += `明日无奖励`
        
                 }
               }               
           }  
          sy.msg(title, subTitle, detail)
        }
      })
    })
    resolve()
  })
}             
sy.done()
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
sy.done()
