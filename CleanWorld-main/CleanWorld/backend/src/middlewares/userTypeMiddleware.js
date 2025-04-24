function authorizeUserType(requiredType) {
    return (req, res, next) => {
      const userType = req.user.userType;
      
      if (userType !== requiredType) {
        return res.status(403).send('Acesso negado');
      }
      
      next();
    };
  }
  
  module.exports = authorizeType;