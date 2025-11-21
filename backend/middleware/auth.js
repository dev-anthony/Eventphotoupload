const authenticate = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  // Attach user info to request
  req.user = {
    id: req.session.userId,
    username: req.session.username
  };
  
  next();
};

module.exports = { authenticate };