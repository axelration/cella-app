import { Dimensions, Platform } from 'react-native'

const common = {
  API: 'http://kopertaer.com',
  VERSION: '0.0.1',

  fetchie(url, options, success, error) {
    const auth = common.oauth()

    const get = options.method === 'GET'
    const opts = Object.assign({ credentials: 'same-origin' }, {
      headers: Object.assign(
        auth ? {
          Authorization: 'Bearer ' + auth
        } : {},
        !get ? {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        } : {}
      )
    }, options)

    fetch(common.API + url, opts)
      .then(res => res.json().then(data => ({ data: data, status: res.status })))
      .then((object) => {
        // console.log('---', url, options, object)
        const { data, status } = object

        if (status === 200 || status === 201) {
          if (typeof (success) === 'function') {
            success(data)
          }
        } else {
          if (typeof (error) === 'function') {
            if (data.error && typeof data.message === 'string') {
              error(data.message)
            } else {
              error(null)
            }
          }
        }
      })
      .catch((ex) => {
        if (typeof (error) === 'function') {
          error('ERROR')
        }
        console.log('ERROR', url, ex)
      })
  },

  urls(string, url) {
    if (url) {
      if (string.startsWith('http')) {
        const urla = string.split('/')
        const urls = string.split('/').splice(3, urla.length)
        urls[1] = urls[1] = urls[1] + 's'

        return '/' + urls.toString().replace(/,/g, '/')
      }

      return string
    }

    const strung = String(string)
    return strung.trim()
      .replace(/[^\w\s/]+/gi, '')
      .replace((/[\s]+/g), '-')
      .toLowerCase()
  },

  prices(prefix, price) {
    return !isNaN(price) && (prefix ? prefix + ' ' : '') + (Math.round(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  sanitizer(string) {
    return string && (string).replace(/<p>&nbsp;<\/p>/gi, '')
  },

  isObjectExist(obj) {
    return obj && Object.getOwnPropertyNames(obj).length > 0
  },

  objectToArray(obj) {
    return obj && Object.keys(obj).map((key) => obj[key])
  },

  isMobile() {
    return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
  },

  isEmail(email) {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
  },

  isLetter(letter) {
    return (/^[a-zA-Z\s]+$/).test(letter)
  },

  isNumber(number) {
    return (/^[0-9\b]+$/).test(number)
  },

  isPhone(number) {
    return (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im).test(number)
  },

  isIphoneX() {
    const w = Dimensions.get('window')
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((w.height === 812 || w.width === 812) || (w.height === 896 || w.width === 896))
    )
  },

  caseToTitle(string) {
    return string && string.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
  },

  throttle(fn, wait) {
    let time = Date.now()
    return () => {
      if ((time + (wait || 800) - Date.now()) < 0) {
        fn()
        time = Date.now()
      }
    }
  },

  debounce(fn, delay, ...arg) {
    let timer = null
    return function () {
      const context = this
      const args = arg

      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay || 200)
    }
  }
}

module.exports = common
