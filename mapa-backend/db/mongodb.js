const mongoose = require('mongoose')

mongoose.connection.on('open', () => console.log('db connected'))

async function connectDb ({ host, port, dbName }) {
  const uri = `mongodb://${host}:${port}/${dbName}`
  await mongoose.connect(uri, { useNewUrlParser: true })
}

// async function connectDb () {
//   try{
//   const connection = await mongoose.connect(process.env.MONGO_URI, 
//   { useNewUrlParser: true, 
//     useUnifiedTopology: true
//   });

//   const url = `${connection.connection.host}:${connection.connection.port}`
//   console.log(`MongoDb Conectado en: ${url}`)
//   }catch(error){
//     console.log(`error:${error.message}`);
//     process.exit(1);
//   }
// }

module.exports = connectDb

 async function connectDb ({ host, port, dbName }) {
   const uri = `mongodb://${host}:${port}/${dbName}`
   await mongoose.connect(uri, { useNewUrlParser: true })
}