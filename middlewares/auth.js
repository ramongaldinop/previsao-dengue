function isAuthenticated(req, res, next) {
  if (req.session.auth) {
    return next();
  }
  return res.status(401).json({ message: 'Não autorizado. Faça login para continuar.' });
}

module.exports = { isAuthenticated };