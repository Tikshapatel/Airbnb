const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listning = require('./models/listing.js');
const path = require('path');

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true }));
// ---------------------------------------------------

app.get("/",(req,res)=>{
    console.log('Hi this is root');
})
// ---------Index Route---------------------------------------------
app.get("/listings",async (req,res)=>{
    // ------ to get all data - nodemon app.js---
    
    // Listning.find({}).then((res)=>{
    //     console.log(res);
    // })
    const allListings = await Listning.find({});
    res.render('listings/index.ejs',{allListings});

});

// ------------------------------------------------------

// app.get("/testListing",async (req,res)=>{
//        let sampleListning = new Listning ({   // Listning schema created in listning.js 
//                   title :'My Villa',
//                   description : 'Luxurious Villa',
//                   price : 1200,
//                   location : 'Cavandiesh',
//                   country : 'Canada',
//                 //   image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//         });

//         await sampleListning.save();
//         console.log('sample was saved');
//         res.send('Successful testing')
// });
// ------------------------New Route-------------------------------
app.get("/listings/:id", (req,res)=>{
    res.render("listings/new.ejs")

})


// ------------------------Show Route------------------------------

app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listning.findById(id);
    res.render("listings/show.ejs",{listing});
})

// ------------------------------------------------------


app.listen (8080,()=>{
    console.log('Server is listening to port: 8080');
});

// ---------------------Create Route---------------------------------
app.post("/listings", async(req,res)=>{
    
    // let {title,description,image,price,country,location} = req.body;
    // let listing = req.body;
    // let listing = req.body.listing;
    // console.log(listing);

    // -------Add data----
    const newListing = new Listning(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

});