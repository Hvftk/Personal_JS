/* 以下感谢Cuttlefish提供的灵感和帮助

JS中直接使用CSS的模版：
var body = $response.body.replace(/<head>/, '<head><style type="text/css">填写CSS格式内容</style>').replace(/'6572'/g, "'6578'");
$done({ body });
填写了一个CSS的实际案例：
var body = $response.body.replace(/<head>/, '<head><style type="text/css">img[id^=ad]{display:none!important}</style>').replace(/'6572'/g, "'6578'");
$done({ body });

"填写CSS格式内容" 直接复制以下网址呈现的CSS即可 https://cdn.jsdelivr.net/gh/Hvftk/Personal_JS@master/css/zbk.min.css

*/


var body = $response.body.replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Hvftk/Personal_JS@master/css/zbk.css" type="text/css">').replace(/'6572'/g, "'6578'").replace(/\<div  class=\"item stui-banner__item[\s\S]*html[\s\S]*?\<\/div\>/g, "");
$done({ body });
