const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');


const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/digimons',
    { useNewUrlParser: true, useUnifiedTopology: true }); 

    const schema = new mongoose.Schema({ 
        name: 'string',
         img: 'string' ,
         level:'string'
    
    });
    const dig = mongoose.model('dig', schema);



    server.get('/getdata',showreshandler)
server.post('/savedata',saveHandler)
server.get('/getfavdata',getfavdata)
server.delete('/deletefav/:id',deletefav)
server.put('/updatefav/:id',updatefav)

function updatefav(req,res){
   
}
function deletefav(req,res){
    const id =req.params.id
const{name,image,level}=req.body
    dig.find({_id:id},  async (err, dig) =>{
  
    const newData= new dig({
        name:name,
        image:image,
        level:level
    })
    await newData.save()
    dig.find({}, function (err, dig) {
    res.send(dig)
    });
    });

  
  
}


function getfavdata(req,res)
{
    dig.find({}, function (err, dig) {
        console.log(dig)
    res.send(dig)
    });
}
function saveHandler(req,res){

const {name,image,level}=req.body


const newData= new dig({
    name:name,
    image:image,
    level:level
})
newData.save()

}





    function   showreshandler (req,res){
    const url=`https://digimon-api.vercel.app/api/digimon`

   
const results= axios.get(url).then(resp => {

    console.log(resp.data);

    res.send(resp.data)
});


    }


    // class Item{
    //     constructor(data)
    //     {
    //         this.name=data.name,
    //         rhis.img=data.img,
    //         this.level=data.level
    //     }
    // }

    server.listen(PORT, () => {
        console.log(`listening on PORT ${PORT}`);
    })