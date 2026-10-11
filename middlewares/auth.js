function isAuthenticated(req, res, next) {
  if (req.session.auth) {
    return next();
  }
  return res.render('error', { error:{description: 'Não autorizado. Faça login para continuar.', notFound: true}, unauthorized: true});
}

module.exports = { isAuthenticated };