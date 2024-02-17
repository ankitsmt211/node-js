const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const PORT = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

function validateNumber(num){

    if(isNaN(num)){
        return 'Invalid data types'
    }

    if(num>100000){
        return 'Overflow'
    }

    if(num<-100000){
        return 'Underflow'
    }

    return true
}

function prepareResponse(messageNum1,messageNum2,successMessage){
    let responseObj = {status:'',message:''}

    if(messageNum1!==true||messageNum2!==true){
        responseObj={status:'error',message:''}

        if(messageNum1!=true){
            responseObj.message=messageNum1
            return responseObj
        }

        if(messageNum2!=true){
            responseObj.message=messageNum2
            return responseObj
        }

    }

    responseObj.status='success'
    responseObj.message=successMessage
    return responseObj
}

// to add two numbers num1 and num2
app.post('/add',(req,res)=>{
    let num1 = req.body.num1
    let num2 = req.body.num2

    let messageNum1 = validateNumber(num1)
    let messageNum2 = validateNumber(num2)

    let successMessage = 'The sum of given two numbers'
    let responseObj = prepareResponse(messageNum1,messageNum2,successMessage)

    if(responseObj.status=='success'){
        responseObj.sum=num1+num2
        res.send(responseObj)
        return
    }

    res.send(responseObj)
})

// to subtract two numbers num1 and num2 
app.post('/sub',(req,res)=>{
    let num1 = req.body.num1
    let num2 = req.body.num2
    
    let messageNum1 = validateNumber(num1)
    let messageNum2 = validateNumber(num2)

    let successMessage = 'The difference of given two numbers'
    let responseObj = prepareResponse(messageNum1,messageNum2,successMessage)

    if(responseObj.status=='success'){
        responseObj.difference=num1-num2
        res.send(responseObj)
        return
    }

    res.send(responseObj)

})

//to multiple two numbers num1 and num2
app.post('/multiply',(req,res)=>{
    let num1 = req.body.num1
    let num2 = req.body.num2
    
    let messageNum1 = validateNumber(num1)
    let messageNum2 = validateNumber(num2)

    let successMessage = 'The product of given two numbers'
    let responseObj = prepareResponse(messageNum1,messageNum2,successMessage)

    if(responseObj.status=='success'){
        responseObj.result=num1*num2
        res.send(responseObj)
        return
    }

    res.send(responseObj)

})

//to divide two numbers num1 and num2
app.post('/divide',(req,res)=>{
    let num1 = req.body.num1
    let num2 = req.body.num2
    
    let messageNum1 = validateNumber(num1)
    let messageNum2 = validateNumber(num2)

    let successMessage = 'The division of given two numbers'
    let responseObj = prepareResponse(messageNum1,messageNum2,successMessage)

    if(responseObj.status=='success'){
        if(num2==0){
            responseObj.status='error'
            responseObj.message='Cannot Divide by Zero'
            res.send(responseObj)
            return
        }

        responseObj.result=num1/num2
        res.send(responseObj)
        return
    }

    res.send(responseObj)

})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

module.exports = app;