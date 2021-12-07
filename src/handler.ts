import { send } from './sender'
import { $on, $off, getXPath } from './utils'
import { urlTracker } from './url-tracker'

const trackEvents: TrackEvents = {
  xhr: trackXhr,
  error: trackError,
  behavior: trackClick
}

function trackXhr() {
  handleXhr()
}

function handleXhr() {
  send('xhr', {})
}

function trackError() {
  handleError()
}

function handleError() {
  send(
    'error',
    {}
  )
}

function trackClick() {
  $on('click', handleClick)
}

function handleClick(event: PointerEvent) {
  const { clientX, clientY } = event
  let el = event.target as HTMLElement || null

  // 获取用户交互所定义的事件名，交互，标签
  const { dataset: { trackEvent, trackAction, trackLabel } } = el
  if (trackEvent) {
    send(
      trackEvent || 'ClickPage',
      {
        path: getXPath(el),
        params: {
          mouseX: clientX,
          mouseY: clientY,
          trackAction,
          trackLabel,
        }
      })
  }
}

function handlePageUnload(events: Array<TrackEventType>) {
  window.addEventListener('unload', () => {
    removeTrackEvents(events)
  })
}

function removeTrackEvents(events: Array<TrackEventType>) {
  if (events.includes('behavior')) {
    $off('click', handleClick)
  }

  if (events.includes('xhr')) {

  }

  if (events.includes('error')) {

  }
}

export function handleTrackEvents(events: Array<TrackEventType>) {
  events.forEach((item: TrackEventType) => {
    trackEvents[item]()
  })

  // page unload
  handlePageUnload(events)
}

export function handleUrlChange() {
  urlTracker()
}
