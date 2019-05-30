// https://github.com/tehcojam/cmtt-test/blob/master/source/js/modules/u.js

import { createElement } from './dom'

export const U = {
  qs: (qS, options = []) => {
    return options.includes('a')
      ? document.querySelectorAll(qS)
      : document.querySelector(qS)
  },

  qsf: (qS, from, options = []) => {
    if (!from.nodeName) {
      from = document.querySelector(from)
    }

    return options.includes('a')
      ? from.querySelectorAll(qS)
      : from.querySelector(qS)
  },

  prepareText(text) {
    let regExps = {
      links:  new RegExp(/\[link\|(?:[^\]]+)\|([^\]]+)\]/),
      bold:   new RegExp(/\[b\|(?:[^\]]+)\]/),
      quote:  new RegExp(/\[q\|(?:[^\]]+)\]/),
    }

    let regExps_keys = Object.keys(regExps)

    let regExps_g = {}

    regExps_keys.forEach(key => {
      regExps_g[key] = new RegExp(regExps[key], 'g')
    })

    let matches = {}

    regExps_keys.forEach(key => {
      matches[key] = text.match(regExps_g[key])
    })

    if (matches.links) {
      matches.links.forEach(link => {
        let _link = link.split('|')

        text = text.replace(
          regExps.links,
          createElement('a', '', { innerHTML: _link[2].replace(/]/g, ''), href: _link[1] }).outerHTML
        )
      })
    }

    if (matches.bold) {
      matches.bold.forEach(bold => {
        let _bold = bold.split('|')

        text = text.replace(
          regExps.bold,
          createElement('b', '', { innerHTML: _bold[1].replace(/]/g, '') }).outerHTML
        )
      })
    }

    if (matches.quote) {
      matches.quote.forEach(quote => {
        let _quote = quote.split('|')

        text = text.replace(
          regExps.quote,
          createElement('q', '', { innerHTML: _quote[1].replace(/]/g, '') }).outerHTML
        )
      })
    }

    return text
  },

  createText: content => document.createTextNode(content)
}
