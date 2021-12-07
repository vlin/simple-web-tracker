import qs from 'qs'
import Cookies from 'js-cookie'

import { send } from './sender';

// 保留最初始的 URL 路径
let path = '' // getPath()

export function urlTracker() {
  // 不支持 pushState 则返回
  if (!history.pushState || !window.addEventListener) {
    return;
  }

  // 缓存原始的 history.pushState.
  const originalPushState = history.pushState;
  history.pushState = function (state: any, title: string, url: string) {
    originalPushState.apply(history, [state, title, url]);
    updateTrackerData();
  };

  // 缓存原始的 history.repaceState.
  const originalReplaceState = history.replaceState;
  history.replaceState = function (state: any, title: string, url: string) {
    originalReplaceState.apply(history, [state, title, url]);
    updateTrackerData(false);
  }

  // 当 hash 发生变化时，触发上报数据
  window.addEventListener('popstate', () => updateTrackerData);

  // 检查是否来源于引流网站
  checkUTM()

  // 初始打开页面就记录一次 pv
  updateTrackerData()
}

function checkUTM() {
  // 若不是 simple.com 的来源页，则记录 url 后所有相关参数，主要是 utm 类的参数
  if (!document.referrer.includes('.simple.com')) {
    let params = location.search.substring(1)
    // 若存在 key=value&key=value 形式的参数才存入到 Cookie 中
    if (params.includes('=')) {
      Cookies.set('simple-utm-info', params)
    }
  } else {
    Cookies.remove('simple-utm-info')
  }
}

function updateTrackerData(shouldSendPageview = true) {

  // 通过异步调用确保先响应其它的回调
  setTimeout(function () {

    let oldPath = path;
    let newPath = getPath();

    if (oldPath != newPath) {
      path = newPath;
      if (shouldSendPageview) {

        let utmParams = <any>{}
        if (!document.referrer.includes('.simple.com')) {
          // 标识当前浏览周期内的第一次访问 simple.com，相当于刚刚进入
          utmParams.firstTimeVisit = true
        }

        // 处理 utm 相关参数，若来源于广告网站则当前浏览周期内每一次上报都要带上 utm 参数
        let simpleUTMInfo = Cookies.get('simple-utm-info')
        if (simpleUTMInfo) {
          //
          try {
            utmParams = {
              ...utmParams,
              ...qs.parse(simpleUTMInfo)
            }
          } catch (err) {
            console.log(err)
          }
          // alert(JSON.stringify(utmParams))
        }

        send('PageView', {
          params: {
            title: history?.state?.title || document.title,
            ...utmParams
          }
        })
      }
    }
  }, 0);
};

function getPath() {
  return location.pathname + location.search;
}
