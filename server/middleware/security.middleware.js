const { sanitize } = require('express-mongo-sanitize');

const safeHtmlEscape = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const xssEscape = (obj, parentKey = null) => {
  const skipKeys = ['password', 'email', 'token', 'image', 'images', 'sizes'];
  if (parentKey && skipKeys.includes(parentKey.toLowerCase())) {
    return obj;
  }

  if (typeof obj === 'string') {
    return safeHtmlEscape(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => xssEscape(item, parentKey));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      if (skipKeys.includes(key.toLowerCase())) {
        return;
      }
      obj[key] = xssEscape(obj[key], key);
    });
  }
  
  return obj;
};

exports.cleanInput = (req, res, next) => {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  if (req.body) xssEscape(req.body);
  if (req.query) xssEscape(req.query);
  if (req.params) xssEscape(req.params);

  next();
};
