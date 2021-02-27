const loginInfo = require('../models/login-data')
const LoginSeeds = require('./login-seeds.json')

loginInfo.deleteMany({})
    .then(() => {
        return loginInfo.insertMany(LoginSeeds)
    })
    .then(console.log)
    .catch(console.error)
    .finally( () => {process.exit()})