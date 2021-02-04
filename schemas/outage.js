const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const outageSchema = mongoose.Schema({
  // Guild ID
  time: reqString,
  date: reqString,
  reporterid: reqString,
  reporterguild: reqString,
  acknowledged: Boolean,
  resolved: Boolean,
  reason: reqString,
})

module.exports = mongoose.model('outages', outageSchema)
