// Node native fs: append-only request log stream
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '../logs');
fs.mkdirSync(dir, { recursive: true });
const stream = fs.createWriteStream(path.join(dir, 'access.log'), { flags: 'a' });
module.exports = (req, res, next) => {
  const t = Date.now();
  res.on('finish', () => stream.write(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - t}ms\n`));
  next();
};
