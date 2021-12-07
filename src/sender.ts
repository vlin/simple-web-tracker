
import { stringify } from 'qs'

import { getClientId, isMobile } from './client'
import { getViewport } from './utils'

let commonData: CommonData = {
  version: 'v1.0.0',
  clientId: getClientId(),
  platform: isMobile() ? 'WAP' : 'PC',
  resolution: (window.devicePixelRatio * screen.width) + 'x' + (window.devicePixelRatio * screen.height),
  module: ''
}

export function setCommonData(data: any) {
  commonData = {
    ...commonData,
    ...data
  }
}

export function send(eventName: string, data: any) {

  if (data.params) {
    try {
      data.params = JSON.stringify(data.params)
    } catch (err) {
      console.log(err)
    }
  }

  data = {
    ...commonData,
    ...data,
    viewport: getViewport(),
    currentUrl: location.href,
    eventName,
    time: Date.now(),
    referrer: document.referrer
  }

  new Image().src = `${import.meta.env.VITE_APP_STAT_URL}?${stringify(data)}`
}
