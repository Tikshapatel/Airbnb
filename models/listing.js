const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const listningSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description: String,
    image:{
        type: String,
        
        default:"https://unsplash.com/photos/a-snow-covered-ski-slope-with-a-mountain-in-the-background-GCtqanoT_ew",
        // add default bcz if i not define image in app.js then it shows value without adding img
        set:(v)=>
         v==="" 
        ? "https://unsplash.com/photos/a-snow-covered-ski-slope-with-a-mountain-in-the-background-GCtqanoT_ew" 
        : v,
        //----- ternery operator-----
    },
    price: Number,
    location: String,
    country: String,
});

const Listning = mongoose.model("Listning",listningSchema);
module.exports = Listning;