const allowedCors = [
  'http://mesto-skifenok.nomoreparties.co/',
  'https://mesto-skifenok.nomoreparties.co/',
  'localhost:3000',
];

const DEFAUL_ALLOWED_METHODS = 'GET, HEAD, PATCH, POST, DELETE';

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-conrol-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Acces-Controll-Allow-origin, origin');
  }

  if (method === 'OPTIONS') {
    res.header('Acces-Control-Allow-Methods', DEFAUL_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
