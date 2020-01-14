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
  }
})