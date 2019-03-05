const withCSS = require('@zeit/next-css');
module.exports = Object.assign(withCSS(), {target : 'serverless'});
