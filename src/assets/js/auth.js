
const userInfoKey = 'user-info'

export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

export function getToken () {
  try {
    return JSON.parse(getUserInfo()).token
  } catch (error) {
    return ''
  }
}

export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
