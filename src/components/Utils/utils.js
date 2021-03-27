exports.prepareHeaders = (cookiesString, otherContentType = null) => {
  const authToken = getAuthToken(cookiesString);
  const headers = {
    headers: {
      authorization: authToken,
      "content-type": "application/json",
    },
  };
  if (otherContentType) {
    headers["content-type"] = otherContentType;
  }
  return headers;
};

function getAuthToken(cookiesString) {
  const authTokenRegex = /(?<=authToken=).+(?=(?:\; |$))/;
  const authToken = cookiesString.match(authTokenRegex)[0];
  return authToken;
}
