// @flow
export const getItem = (key, default_value) => {
  try {
    return localStorage && localStorage.getItem(key) || default_value
  } catch (error) {
    // Some browsers forbid localStorage and will throw an error.
    console.error(error)
    return default_value
  }
}

export const setItem = (key, value) => {
  try {
    localStorage && localStorage.setItem(key, value)
  } catch (error) {
    // Some browsers forbid localStorage and will throw an error.
    console.error(error)
  }
}

export default { getItem, setItem }
