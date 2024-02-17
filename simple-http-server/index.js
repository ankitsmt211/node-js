const fs = require('fs')
const http = require('http')

const content = '<h1> Hello World </h1> <p> This is ankitsmt211... </p>'
const PORT = 5000

fs.writeFile('index.html',content,{encoding:'utf-8'},(err)=>{
    if(err) throw err

   let server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html')
    try{
     const data = fs.readFileSync('index.html')
     res.end(data)
    }
    catch(err){
        res.statusCode(500)
        res.end("unable to start server",err.message)
    }
   })

   server.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)})

})
