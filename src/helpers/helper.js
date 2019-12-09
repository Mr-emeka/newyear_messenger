const jsonResponse = {
  error (res, status, statusCode, message) {
      res.status(statusCode)
      res.json({
          status,
          message
      })
  },

  success (res, status, statusCode, message) {
    res.status(statusCode)
    res.json({
        status,
        message
    })
  }
}

export default jsonResponse;