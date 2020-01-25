const { Sequelize, Model } = require('sequelize')
const { db } = require('../../core/db')

const classicFieleds = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}

class Movie extends Model {}

Movie.init(classicFieleds, {
  sequelize: db,
  tableName: 'movie',
})

class Sentence extends Model {}

Sentence.init(classicFieleds, {
  sequelize: db,
  tableName: 'sentence',
})

class Music extends Model {}

const MusicFieleds = Object.assign({ url: Sequelize.STRING }, classicFieleds)

Music.init(MusicFieleds, {
  sequelize: db,
  tableName: 'music',
})

module.exports = {
  Movie,
  Sentence,
  Music,
}
