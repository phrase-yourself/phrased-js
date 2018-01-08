/* eslint-env jasmine */

const phrased = require('../phrased.js')

describe('phrased', () => {
  it('has a version', () => {
    expect(phrased.version).toEqual('1.1.1')
  })

  it('knows several wordlists', () => {
    let wordlists = phrased.wordlists()

    expect(wordlists.length).toEqual(3)
  })

  it('can find wordlists based on language', () => {
    let germanWordlists = phrased.wordlistsByLanguage('de')
    let englishWordlists = phrased.wordlistsByLanguage('en')

    expect(germanWordlists[0].key).not.toEqual(englishWordlists[0].key)
    expect(germanWordlists[0].languages).toContain('de')
    expect(englishWordlists[0].languages).toContain('en')
  })

  it('has a correct wordcount in each wordlist', () => {
    phrased.wordlists().forEach((wordlist) => {
      expect(wordlist.wordCount).toBeGreaterThan(0)
      expect(wordlist.words().length).toBeGreaterThan(0)

      expect(wordlist.wordCount).toEqual(wordlist.words().length)
    })
  })

  it('can do a wordlist lookup', () => {
    let key = phrased.wordlists()[1].key
    let wordlist = phrased.wordlists(key)

    expect(wordlist).toBe(phrased.wordlists()[1])
  })

  it('generates passphrases based on wordlists', (done) => {
    let wordlist = phrased.wordlists()[0]

    phrased.generate(wordlist.key).then((passphrase) => {
      done()
    })
  })
})
