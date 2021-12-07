### simple web tracker

#### 用途：上报页面交互及行为数据。

#### 功能：
1. 自动上报

    当页面加载时，异步引入并执行此脚本，自动上报一次 PageView 事件，携带当前页 title, referrer，及 utm （来自投放广告的流量）相关参数

2. 埋点上报

    监听页面所有点击，针对页面已埋点的元素进行上报
    ```html
    <button href="#"
       data-track-name="ClickShareInfo"
       data-track-action="分享"
       data-track-label="信息"
    >分享</button>
    ```
    埋点将上报当前元素 dom path，鼠标坐标，及 trackName, trackAction，trackLabel

3. 支持 SPA 单页应用，拦截 history.pushState 和 history.replaceState, history.popState 异步上报 url 变更信息

4. 已暴露 simpleTracker 在 window 上，并提供 send 方法供手工上报自定义数据

    ```javascript
    window.simpleTracker.send('eventName', {
      a: 1,
      b: 2,
      c: 3
    })
    ```

#### 使用方法：
  页面上引入 tracker.js，需确认引入的版本号

  参数：
  * m: 各项目 module 名，例如 h5 / web

  引用地址：
  * 测试环境：  https://test-stat.simple.com/js/tracker-v{version}.js
  * 生产环境：  https://stat.simple.com/js/tracker-v{version}.js

  示例：
  ```html
  <script async src="https://stat.simple.com/js/tracker-v0.0.1.js?m=online"></script>
  ```
