const headers = (req, res, next) => {
  res.setHeader('Acess-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Acess-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
};
module.exports = headers;
