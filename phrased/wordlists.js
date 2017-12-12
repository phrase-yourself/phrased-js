const rawWordlists = require('./wordlists.json')

module.exports = rawWordlists.map((rawWordlist) => {
  return {
    key: rawWordlist.key,
    name: rawWordlist.name,
    wordCount: rawWordlist.words.length,
    words: () => rawWordlist.words
  }
})
