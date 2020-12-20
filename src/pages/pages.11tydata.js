const navPrimary = require('../data/cache/navPrimary.json');

module.exports = {
  pagination: {
    /**
     * Sort pages according to primary navigation order
     * @param {Object} data
     * @return {Object}
     */
    before: (data) => {
      // set array order page id's in primary navigation order
      const pageOrder = navPrimary.fields.items.map((entry) => {
        return entry.sys.id;
      });

      return (
        data
          // map entries to their correct order index
          .map((entry) => {
            const n = pageOrder.indexOf(entry.sys.id);
            pageOrder[n] = '';
            return [n, entry];
          })
          // sort according to index
          .sort()
          // only return the entry object
          .map((j) => j[1])
      );
    },
  },
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.page.fields.title,
      parent: (data) => data.page.fields.parent,
      /**
       * Set navigation order
       * @param {Object} data
       * @return {number}
       */
      order: (data) => {
        let i = 0;
        let order = 0;
        data.cache.navPrimary.fields.items.map((entry) => {
          i++;
          if (data.page.sys.id === entry.sys.id) {
            order = i;
          }
        });
        return order;
      },
    },
  },
};
