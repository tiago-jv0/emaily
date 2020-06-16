module.exports = (req, resp, next) => {
  if (req.user.credits < 1) {
    return resp.status(403).json({
      status: 'error',
      message: 'Not enough credits',
    });
  }

  next();
};
