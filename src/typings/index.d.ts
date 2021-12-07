interface Window { simpleTracker: unknown; }

interface Config {
  events: [TrackEventType],
  m: string // 对应 bizModule
  spa: boolean,
}

type TrackEventType = 'xhr' | 'behavior' | 'error'

type TrackEvents = {
  [key in TrackEventType]: Function
}

interface CommonData {
  version: string,
  clientId: string,
  platform: string,
  resolution: string,
  module: string
}
