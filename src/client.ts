import Cookies from 'js-cookie'

import { cookieName, cookieDomain } from './config'
import { uuid } from './utils'

export function getClientId() {
  let clientId = Cookies.get(cookieName)
  if (!clientId) {
    clientId = uuid()
    Cookies.set(cookieName, clientId, {
      expires: 365 * 10,
      domain: cookieDomain
    })
  }
  return clientId
}

export function isMobile() {
  return 'ontouchstart' in window
}
