const express = require("express");
const sharp = require('sharp');
const path = require("path");
const app = express()
const port = 3000
app.get('/', (req, res) => res.send("Try: http://localhost:3000/image/iguanas/100/230"))
app.get("/image/:name/:w/:h", async (req, res) => {
const {w,h,name} = req.params;
const file=name+".jpg";
const infile = path.join(__dirname,"images",file)
await sharp(infile)
  .jpeg()
  .resize({width:Number(w),height:Number(h)})
  .toBuffer()
  .then( data => {
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(data, 'binary');
  })
  .catch( err => { res.send({err}) });

})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


