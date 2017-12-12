const wordlists = require('./phrased/wordlists.js')
const crypto = require('crypto')
const VERSION = require('./package.json').version

const getRandomBytes = (n) => {
  return new Promise((resolve) =>
    crypto.randomBytes(n, (_err, buffer) => resolve(buffer)))
}

const getRandomNumber = (limit) => {
  return new Promise((resolve) => {
    getRandomBytes(2).then((bytes) => {
      let number = bytes.readUInt16BE()
      if (number < limit) {
        resolve(number)
      } else {
        resolve(getRandomNumber(limit))
      }
    })
  })
}

const getRandomNumbers = (n, limit) => {
  let results = Array.from(Array(n)).map(() => getRandomNumber(limit))
  return Promise.all(results)
}

const wordlistLookup = function (filteredKey = undefined) {
  if (filteredKey) {
    return wordlists.find((wordlist) => wordlist.key === filteredKey)
  } else {
    return wordlists
  }
}

const generate = function (wordlistKey, length = 5) {
  let wordlist = wordlistLookup(wordlistKey)
  let wordCount = wordlist.wordCount
  let words = wordlist.words()

  let promise = new Promise((resolve) => {
    getRandomNumbers(length, wordCount).then((indices) => {
      resolve(indices.map((i) => words[i]).join(' '))
    })
  })

  return promise
}

module.exports = {
  version: VERSION,
  generate: generate,
  wordlists: wordlistLookup
}
