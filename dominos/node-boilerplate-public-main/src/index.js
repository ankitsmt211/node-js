let http = require("http");

const httpServer = http.createServer(handleServer);
const PORT = 8081

function handleServer(req, res) {
    let url = req.url

    if(req.url=='/welcome'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('Welcome to Dominos!')
    }

    if(req.url=='/contact'){
        res.statusCode=200
        res.setHeader('Content-Type', 'text/json')
        res.end(JSON.stringify({   phone: '18602100000',   email: 'guestcaredominos@jublfood.com' }))
    }

    else{
        res.statusCode=404
        res.end()
    }
}

httpServer.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

module.exports = httpServer;