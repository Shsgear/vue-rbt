

export const globalMethods = {
  methods: {
    /**
     * 
     * @param {*} item
     * @param {Array} array
     */
    isInArray(item, array) {
      return array.some((loopItem) => item === loopItem);
    }
  }

} 

