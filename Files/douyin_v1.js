

/*************************

抖音去广告去水印V1版本，20200518
脚本来自https://github.com/Choler/Surge/blob/master/Script/douyin.js，由于只兼容surge所以由eHpo 20200518修改成兼容quanX格式的版本，https://github.com/nzw9314/QuantumultX/blob/master/Choler/Script/douyin_qx.js。


#URL Rewrite
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/feed\/ url request-header ^GET \/aweme\/v\d\/feed\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/feed/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/aweme\/post\/ url request-header ^GET \/aweme\/v\d\/aweme\/post\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/aweme/post/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/follow\/feed\/ url request-header ^GET \/aweme\/v\d\/follow\/feed\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/follow/feed/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/nearby\/feed\/ url request-header ^GET \/aweme\/v\d\/nearby\/feed\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/nearby/feed/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/search\/item\/ url request-header ^GET \/aweme\/v\d\/search\/item\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/search/item/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/general\/search\/single\/ url request-header ^GET \/aweme\/v\d\/general\/search\/single\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/general/search/single/$1$2Host: aweme.snssdk.com
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/hot\/search\/video\/list\/ url request-header ^GET \/aweme\/v\d\/hot\/search\/video\/list\/(.+)(\r\n)Host:.+ request-header GET /aweme/v1/hot/search/video/list/$1$2Host: aweme.snssdk.com



#Script
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/aweme\/post\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/feed\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/follow\/feed\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/nearby\/feed\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/search\/item\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/general\/search\/single\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js
^https?+:\/\/[\w-]++\.amemv\.com\/aweme\/v\d\/hot\/search\/video\/list\/ url script-response-body https://raw.githubusercontent.com/Hvftk/Personal_JS/master/Files/douyin_v1.js


MitM=*.amemv.com（神机规则已添加）

*************************/



const path1 = "/feed/";
const path2 = "/aweme/post/";
const path3 = "/follow/feed/";
const path4 = "/nearby/feed/";
const path5 = "/search/item/";
const path6 = "/general/search/";
const path7 = "/hot/search/video/";

if ($request.url.indexOf(path1) != -1) {
  feedpath();
} else if ($request.url.indexOf(path2) != -1) {
  post();
} else if ($request.url.indexOf(path5) != -1) {
  item();
} else if ($request.url.indexOf(path6) != -1) {
  search();
} else if ($request.url.indexOf(path7) != -1) {
  hot();
} else {
  $done({});
}

function feedpath() {
  if ($request.url.indexOf(path3) != -1) {
    follow();
  } else if ($request.url.indexOf(path4) != -1) {
    nearby();
  }  else {
    feed();
  }
}


function feed() {
  let obj = JSON.parse($response.body);
  let arr = obj.aweme_list;
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].is_ads != false) {
      arr.splice(i, 1);
    }
    if (arr[i].status.reviewed != 1) {
      arr[i].status.reviewed = 1;
      arr[i].video_control.allow_download = true;
    }
    if (arr[i].anchor_info) {
      arr[i].anchor_info = {};
    }
    if (arr[i].video.download_addr) {
      let play = arr[i].video.play_addr.url_list;
      arr[i].video.download_addr.url_list = play;
    }
    if (arr[i].video.download_suffix_logo_addr) {
      let download = arr[i].video.download_addr;
      arr[i].video.download_suffix_logo_addr = download;
    }
    if (arr[i].video.misc_download_addrs) {
      arr[i].video.misc_download_addrs = {};
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function post() {
  let obj = JSON.parse($response.body);
  let arr = obj.aweme_list;
  if (arr != null) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i].status.reviewed != 1) {
        arr[i].status.reviewed = 1;
        arr[i].video_control.allow_download = true;
      }
      if (arr[i].video.download_addr) {
        let play = arr[i].video.play_addr.url_list;
        arr[i].video.download_addr.url_list = play;
      }
      if (arr[i].video.download_suffix_logo_addr) {
        let download = arr[i].video.download_addr;
        arr[i].video.download_suffix_logo_addr = download;
      }
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function follow() {
  let obj = JSON.parse($response.body);
  let arr = obj.data;
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].aweme.status.reviewed != 1) {
      arr[i].aweme.status.reviewed = 1;
      arr[i].aweme.video_control.allow_download = true;
    }
    if (arr[i].aweme.anchor_info) {
      arr[i].aweme.anchor_info = {};
    }
    if (arr[i].aweme.video.download_addr) {
      let play = arr[i].aweme.video.play_addr.url_list;
      arr[i].aweme.video.download_addr.url_list = play;
    }
    if (arr[i].aweme.video.download_suffix_logo_addr) {
      let download = arr[i].aweme.video.download_addr;
      arr[i].aweme.video.download_suffix_logo_addr = download;
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function nearby() {
  let obj = JSON.parse($response.body);
  if (obj.aweme_list) {
      for (var i = obj.aweme_list.length - 1; i >= 0; i--) {
      if (obj.aweme_list[i].video) {
        if (obj.aweme_list[i].status.reviewed != 1) {
          obj.aweme_list[i].status.reviewed = 1;
          obj.aweme_list[i].video_control.allow_download = true;
        }
        if (obj.aweme_list[i].video.download_addr) {
          let play = obj.aweme_list[i].video.play_addr.url_list;
          obj.aweme_list[i].video.download_addr.url_list = play;
        }
        if (obj.aweme_list[i].video.download_suffix_logo_addr) {
          let download = obj.aweme_list[i].video.download_addr;
          obj.aweme_list[i].video.download_suffix_logo_addr = download;
        }
      }
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function item() {
  let obj = JSON.parse($response.body);
  if (obj.aweme_list) {
      for (var i = obj.aweme_list.length - 1; i >= 0; i--) {
      if (obj.aweme_list[i].video) {
        if (obj.aweme_list[i].status.reviewed != 1) {
          obj.aweme_list[i].status.reviewed = 1;
          obj.aweme_list[i].video_control.allow_download = true;
        }
        if (obj.aweme_list[i].video.download_addr) {
          let play = obj.aweme_list[i].video.play_addr.url_list;
          obj.aweme_list[i].video.download_addr.url_list = play;
        }
        if (obj.aweme_list[i].video.download_suffix_logo_addr) {
          let download = obj.aweme_list[i].video.download_addr;
          obj.aweme_list[i].video.download_suffix_logo_addr = download;
        }
      }
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function search() {
  let obj = JSON.parse($response.body);
  let arr = obj.data;
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].aweme_info) {
      if (arr[i].aweme_info.video.download_addr) {
        let play = arr[i].aweme_info.video.play_addr.url_list;
        arr[i].aweme_info.video.download_addr.url_list = play;
      }
      if (arr[i].aweme_info.video.download_suffix_logo_addr) {
        let download = arr[i].aweme_info.video.download_addr;
        arr[i].aweme_info.video.download_suffix_logo_addr = download;
      }
    } else {
      arr.splice(i, 1);
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function hot() {
  let obj = JSON.parse($response.body);
  if (obj.aweme_list) {
    for (var i = obj.aweme_list.length - 1; i >= 0; i--) {
      if (obj.aweme_list[i].video.download_addr) {
        let play = obj.aweme_list[i].video.play_addr.url_list;
        obj.aweme_list[i].video.download_addr.url_list = play;
      }
      if (obj.aweme_list[i].video.download_suffix_logo_addr) {
        let download = obj.aweme_list[i].video.download_addr;
        obj.aweme_list[i].video.download_suffix_logo_addr = download;
      }
      if (obj.aweme_list[i].video.misc_download_addrs) {
        obj.aweme_list[i].video.misc_download_addrs = {};
      }
    }
  }
  $done({ body: JSON.stringify(obj) });
}
