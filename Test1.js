var Url = {
  url: 'https://www.baidu.com'
}
var tt = '********************************'
var $nobyda = nobyda()
test()

async function test() {
  await one()
  await two()
  await four()
  await notify()

}

function one() {
  return new Promise(resolve => {
    console.log('\n' + tt + '\n已进入函数一, 五秒后执行')
    setTimeout(() => {
      $nobyda.get(Url, function(error, response, data) {
        console.log('\n函数一执行成功....\n正在执行函数二....')
        resolve()
      })
    }, 5000)
  });
}



function two() {
  return new Promise(resolve => {
    $nobyda.get(Url, async function(error, response, data) {
      console.log('\n函数二执行成功....\n正在进入函数三....')
      await three(3000)
      resolve()
    })
  });
}



function three(s) {
  return new Promise(resolve => {
    console.log('\n进入函数三成功....\n三秒后执行函数三....')
    setTimeout(() => {
      $nobyda.get(Url, function(error, response, data) {
        console.log('\n函数三执行成功....\n正在进入函数四....')
        resolve()
      })
    }, s)
  });
}



function four() {
  return new Promise(resolve => {
    console.log('\n已进入函数四....\n一秒后执行函数四....')
    setTimeout(() => {
      $nobyda.get(Url, function(error, response, data) {
        console.log('\n函数四执行成功....\n正在进入通知函数....')
        resolve()
      })
    }, 1000)
  });
}

function notify() {
  return new Promise(resolve => {
    console.log('\n已进入通知函数....一秒后发送通知')
    setTimeout(() => {
      $notify("通知测试成功", "", "脚本已完整执行")
      console.log('\n发送通知成功....\n' + tt)
      resolve()
    }, 1000)
  });
}

function nobyda() {
  const get = (options, callback) => {
    $task.fetch(options).then(response => {
      callback(null, response.statusCode, response.body)
    }, reason => callback(reason.error, null, null))
  }
  return {
    get
  }
};