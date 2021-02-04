const init = async(client) => {
console.log('[EXPRESS] STARTING SERVER')
const express = require('express')
const app = express()
const Topgg = require('@top-gg/sdk')
const webhook = new Topgg.Webhook('jarvisisdope') // add your top.gg webhook authorization (not bot token)
const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3MTYyODc0NzUwMTczMTg0MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjExNjMwNzI0fQ.q8XYK5cDbHSr55mirVlid5wMwj4pgrr6kA3W4OOUlgs')

setInterval(() => {
    console.log('Posting stats on top.gg')
  api.postStats({
    serverCount: client.guilds.cache.size,
  })
}, 1800000)

app.post('/dblwebhook', webhook.middleware(), (req, res) => {
  // req.vote is your vote object e.g
  console.log(req.vote) // 221221226561929217
}) // attach the middleware

app.listen(25569, () => console.log('SERVER READY'))

app.get('/up', (req, res) => {
res.send('Hello')
})
app.get('/djs', (req, res) => {
res.redirect('https://discord.gg/5qnUxkWmFB')
})
}
module.exports.init = init