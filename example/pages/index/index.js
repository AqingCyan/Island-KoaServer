import {
  Base64
} from 'js-base64'

Page({
  onGetToken() {
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'http://localhost:10086/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100,
            },
            success: res => {
              const code = res.statusCode.toString()
              if (code.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },

  onVerifyToken() {
    wx.request({
      url: 'http://localhost:10086/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onGetLatest() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/latest',
      method: 'GET',
      // 小程序携带TOKEN
      header: {
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onLike() {
    wx.request({
      url: 'http://localhost:10086/v1/like',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100,
      },
      header: {
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onDisLike() {
    wx.request({
      url: 'http://localhost:10086/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100,
      },
      header: {
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onGetNext() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/6/next',
      method: 'GET',
      // 小程序携带TOKEN
      header: {
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onGetPre() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/6/previous',
      method: 'GET',
      // 小程序携带TOKEN
      header: {
        Authorization: this._encode()
      },
      success: res => {
        console.log(res.data)
      }
    })
  },

  onGetClassicFavor() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/100/1/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetMyFavorList() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetClassicDetail() {
    wx.request({
      url: 'http://localhost:10086/v1/classic/100/1',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetHotBookList() {
    wx.request({
      url: 'http://localhost:10086/v1/book/hot_list',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetBookDetail() {
    wx.request({
      url: 'http://localhost:10086/v1/book/1120/detail',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onBookSearch() {
    wx.request({
      url: 'http://localhost:10086/v1/book/search',
      method: 'GET',
      data: {
        q: '东野圭吾',
        count: 10,
      },
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetMyFavorsBookCount() {
    wx.request({
      url: 'http://localhost:10086/v1/book/favor/count',
      method: 'GET',
      // like key%
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetBookFavor() {
    wx.request({
      url: 'http://localhost:10086/v1/book/1120/favor',
      // url: 'http://localhost:10086/v1/book/1000/favor',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onAddShortComment() {
    wx.request({
      url: 'http://localhost:10086/v1/book/add/short_comment',
      method: 'POST',
      data: {
        content: '春风十里不如有你',
        book_id: 1120
      },
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },

  onGetComments() {
    wx.request({
      url: 'http://localhost:10086/v1/book/1120/short_comment',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      header: {
        Authorization: this._encode()
      }
    })
  },


  // Base64加密
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
})