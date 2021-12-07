export function $on(eventName: keyof WindowEventMap, cb: any) {
  window.addEventListener(eventName, cb, true)
}

export function $off(eventName: keyof WindowEventMap, cb: any) {
  window.removeEventListener(eventName, cb)
}

export function getViewport() {
  const w = document.documentElement.clientWidth || document.body.clientWidth
  const h = document.documentElement.clientHeight || document.body.clientHeight
  return w + 'x' + h
}

// <script src="http://static.simple.com/tracker/tracker.js?spa=1&ak=234133&tracking=xhr&tracking=behavior"></script>
export function parseSelf(): Config | null {
  let sc = document.getElementsByTagName('script');
  let curScript: string = ''
  for (let i = 0; i < sc.length; i++) {
    if (/(tracker-)(v\d*\.\d*\.\d*)(\.js)/.test(sc[i].src)) {
      curScript = sc[i].src
      break;
    }
  }
  if (curScript === '') {
    return null
  }

  let params: any = {}

  try {
    let originParams: string[] = curScript.split('?')
    if (originParams.length > 1) {
      originParams = originParams[1].split('&');
      for (let i = 0, len = originParams.length; i < len; i++) {
        let [name, value] = originParams[i].split('=');
        if (Array.isArray(params[name])) {
          params[name].push(value)
        } else if (params[name]) {
          params[name] = [
            params[name],
            value
          ]
        } else {
          params[name] = value;
        }
      }
    }
  } catch (err) {
    console.log(err)
  }

  return params as Config
}

export function uuid() {
  const length = 32
  let result = ''

  for (; result.length < length;) {
    result += (0 | 16 * Math.random()).toString(16);
    result += (0 | 16 * Math.random()).toString(16);
  }

  return result
}

export function parseSelector(el: HTMLElement) {
  return el.tagName.toLowerCase() +
    (el.id ? '#' + el.id : '') +
    (el.className.length ? '.' + Array.from(el.classList).join('.') : '')
}

// depth: 默认限制最多获取 10 层 dom 结点
export function getXPath(el: HTMLElement, depth = 10) {
  const path = []
  while (el.tagName.toLowerCase() !== 'html' && depth--) {
    path.push(parseSelector(el))
    el = el.parentNode as HTMLElement
  }

  return path.reverse().join(' > ')
}
