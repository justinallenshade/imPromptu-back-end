const mongoose = require('mongoose')

const mongoURI = 
process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : `mongodb://localhost/impromtu`

mongoose
    .connect(mongoURI,
        {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        .then((instance) => {console.log(`connected: ${instance.connections[0].name}`)})
        .catch((err) => console.log(`error! ${err}`))


module.exports = mongoose