const express = require("express");
const sharp = require('sharp');
const path = require("path");
const app = express()
app.get('/', (req, res) => {
  res.send(`
  Try:<br/> 
  <a href=\"/image/iguanas/450/230\">/image/iguanas/450/230</a>
  <br/><a href=\"/image/dog/400/300\">/image/dog/400/300</a>
  <br/><a href=\"/image/sheep/500/500\">/image/sheep/500/500</a>
  <br/><a href=\"/image/corgi/1000/1000\">/image/corgi/1000/1000</a>`)
})
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))


