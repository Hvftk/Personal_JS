/*
xmind解锁订阅


[rewrite_local]
https:\/\/www\.xmind\.cn\/\_res\/devices url script-response-body XMind.js

[mitm]
hostname = www.xmind.cn
*/

var obj = JSON.parse($response.body);

obj = {
   "raw_data": "DBcBHgojrvPgruIJMfb4KK/76CmjxSHSp9KipRwOnQUuf+Gt2FncFUzNvxZydUeXEzDZt/XWEm91lHFYrvT0f2AFap2L4psLI/34sKU9VLGH7kFsBYlexU/nifBtosMJqQxL4TU1pjvjl+1uyWsFAeGR42aEnVhQWgvJB5Ovcd0=",
   "license": {
     "status": "sub",
     "expireTime": 3990928235000
   },
   "_code": 200
 }

$done({body: JSON.stringify(obj)});
