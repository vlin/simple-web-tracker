import { handleUrlChange, handleTrackEvents } from './handler'
import { parseSelf } from './utils'
import { send, setCommonData } from './sender'

class Tracker {
  constructor() {
    this.init()
  }

  init() {
    const defaultConfig: Config = {
      events: ['behavior'] as [TrackEventType],
      spa: false,
      m: ''
    }

    const config: Config = {
      ...defaultConfig,
      ...parseSelf()
    }

    if (config.m) {
      // 若 script src 中存在 m 参数，则将其作为上报数据时的默认数据 module
      setCommonData({
        module: config.m.toUpperCase()
      })
    }

    // if (config.spa) {
    handleUrlChange()
    // }

    handleTrackEvents(config.events)

    window.simpleTracker = {
      send
    }
  }
}

const tracker = new Tracker()

export default tracker
