const jwt = require('jsonwebtoken');

let secretWord = 'sistemaDubom';

module.exports = function Authenticator(req, res, next) {
  const authToken = req.headers['authorization'];

  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    try {
      let decoded = jwt.verify(token, secretWord);

      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send('Você não tem permissão para prosseguir!');
        return;
      }
    } catch (err) {
      res.status(403);
      res.send('Você não está autenticado!');
      return;
    }
  } else {
    res.status(403);
    res.send('Você não está autenticado!');
    return;
  }
};
