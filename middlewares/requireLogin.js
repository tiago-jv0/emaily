module.exports = (req, resp, next) => {
  if (!req.user) {
    return resp.status(401).json({
      status: 'error',
      message: 'You are not logged in',
    });
  }

  next();
};
