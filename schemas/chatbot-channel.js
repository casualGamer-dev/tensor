const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const channelSchema = mongoose.Schema({
guildid: reqString,
channelid: reqString
})

module.exports = mongoose.model('channels', channelSchema)
