const { Movie, Music, Sentence } = require('./classic')

// 通过flow查询来查询对应类型的期刊：音乐，电影，句子
class Art {
  static async getData(art_id, type) {
    let art = null
    const finder = {
      where: {
        id: art_id,
      },
    }
    switch (type) {
      case 100:
        art = Movie.findOne(finder)
        break
      case 200:
        art = Music.findOne(finder)
        break
      case 300:
        art = Sentence.findOne(finder)
        break
      case 400:
        break
      default:
        break
    }
    return art
  }
}

module.exports = {
  Art,
}