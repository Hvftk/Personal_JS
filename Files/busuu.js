

/* 
#Busuu Language Learning 
#hostname=api.busuu.com
^https:\/\/api\.busuu\.com\/users\/me* url script-response-body https://raw.githubusercontent.com/langkhach270389/Quantumult-X-LK/master/Scripts/langkhach/busuu.js 


下载地址，待验证是否对最新版升生效

https://apps.apple.com/us/app/busuu-language-learning/id379968583




*/


var obj = JSON.parse($response.body);
obj.data.is_premium= true;
obj.data.access.tier= "plus";
$done({body: JSON.stringify(obj)});
