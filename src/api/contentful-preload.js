require('dotenv').config();

const contentfulPages = require('./contentful-page');
const contentfulNavPrimary = require('./contentful-nav-primary');

contentfulPages().then(
  () => {},
  (reason) => console.error(reason)
);
contentfulNavPrimary().then(
  () => {},
  (reason) => console.error(reason)
);
