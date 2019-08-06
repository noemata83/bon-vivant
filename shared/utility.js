module.exports = {
  purgeDuplicates: (array) => {
    return Array.from(new Set(array));
  }
}