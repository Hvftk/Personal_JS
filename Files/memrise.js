

/* 
#越南Memrise规则
# MitM=api.memrise.com
^https:\/\/api\.memrise\.com\/.+\/(me\/$|dashboard\/$|leaderboards\/following\/) url script-response-body https://raw.githubusercontent.com/langkhach270389/Quantumult-X-LK/master/Scripts/langkhach/memrise.js 

下载地址，已知对Version 2022.4.13版本生效。 

https://apps.apple.com/us/app/memrise-easy-language-learning/id635966718 

*/



let obj = JSON.parse($response.body);
let url = $request.url;
const cons1 = "me/";
const cons2 = "dashboard/";
const cons3 = "following/";

if(url.endsWith(cons1)) {
obj["profile"]["is_pro"] = true;
}

if(url.endsWith(cons2)) {
obj["user"]["is_premium"] = true;
}

if(url.indexOf(cons3) != -1 ) {
obj["users"][0]["is_premium"] = true;
}
$done({body: JSON.stringify(obj)});
