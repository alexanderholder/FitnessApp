// @flow

// This state is strictly for storing data which does not affect the view in anyway whatsoever.
// The only reason you should be using this as opposed to the react top level state, is if there is both
// signifigant perf reasons, and that the state is never needed inside render logic.

window.CalendarWindowState = window.CalendarWindowState || {
  copied_card_id: null,
  hovered_card_id: null,
  // hotkeys_enabled: true,
  // mouse_down: false,
  new_card_id: null,
  hovered_day: null,
}

const windowState = window.CalendarWindowState

// if (document.body) {
//   document.body.onmousedown = function () {
//     windowState.mouse_down = true
//   }
//   document.body.onmouseup = function () {
//     windowState.mouse_down = false
//   }
// }

export default windowState
