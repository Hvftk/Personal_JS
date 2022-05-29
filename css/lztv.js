/* 

以下感谢Cuttlefish提供的灵感和帮助
其他使用方法见zbk.js

*/


var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Hvftk/Personal_JS@master/css/lztv.css" type="text/css">')
    .replace(/jquerys.js\?v/g, "ddgksf2013.js?v");
$done({ body });
