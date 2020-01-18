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

  // Base64加密
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
})