const path = require('path');
const contentful = require('./contentful');
const json = require('../../utils/json');

module.exports = async () => {
  const cache = path.resolve(__dirname, '../data/cache', 'navPrimary.json');

  // Only make API call if local json file does not exist OR in production environment
  return !json.exists(cache) || process.env.ELEVENTY_ENV === 'production'
    ? contentful.client
        .getEntry('[enter primary nav entry ID]')
        .then((response) => {
          json.write(cache, JSON.stringify(response));
          console.info('Contentful navigation: written to cache');
          return response;
        })
        .catch(console.error)
    : json
        .read(cache)
        .then((response) => {
          console.info('Contentful navigation: using cache');
          return response;
        })
        .catch(console.error);
};
