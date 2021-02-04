 const mongoose = require('mongoose')
 const {Mongo} = require('./Settings/conf.json')

 module.exports = async () => {
   await mongoose.connect(Mongo, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     keepAlive: true,
     useFindAndModify: false,
   }, (err) => {
console.log(err)
   })
}