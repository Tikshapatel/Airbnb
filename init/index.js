const mongoose = require('mongoose');
const initData = require('./data.js');
const Listning = require('../models/listing.js');

const Mongoose_URL = "mongodb://127.0.0.1:27017/wanderlust";
// ------------------------------------------------------

main()
.then((res)=>{
          console.log('connected to DB',res);
})
.catch((err)=>{
      console.log(err);
})
// ------------------------------------------------------

async function main(){
    await mongoose.connect(Mongoose_URL)
}
// -----------------------------------------------

const initDB = async () =>{
    await Listning.deleteMany({});
    await Listning.insertMany(initData.data);
    console.log('Data was initialized');
};

initDB();

