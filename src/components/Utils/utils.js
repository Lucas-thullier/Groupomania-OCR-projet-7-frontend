exports.prepareHeaders = (cookiesString, otherContentType = null) => {
  const authToken = getAuthToken(cookiesString)
  const headers = {
    headers: {
      authorization: authToken,
      'content-type': 'application/json',
    },
  }
  if (otherContentType) {
    headers['content-type'] = otherContentType
  }
  return headers
}

exports.clearAuthCookie = () => {
  document.cookie =
    'authToken' +
    '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; sameSite=Strict`'
}

function getAuthToken(cookiesString) {
  const authTokenRegex = /(?<=authToken=).+(?=(?:\; |$))/
  if (authTokenRegex.test(cookiesString)) {
    const authToken = cookiesString.match(authTokenRegex)[0]
    return authToken
  } else {
    return false
  }
}
