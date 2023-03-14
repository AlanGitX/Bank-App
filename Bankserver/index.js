//import { Express } from "express"; one way to get the express. 
const express = require('express')

const cors = require('cors')

const app = express();
const dataService = require('./services/dataService')

const jwt = require('jsonwebtoken')
app.use(cors({
    origin:'http://localhost:4200'
}))


//parse json
app.use(express.json())

//set up port number 

app.listen(3000,()=>{
    console.log("server started at 3000");
})
//get http. 

// app.get('/', (req,res)=>{
//     res.send('get method')
// })
// app.post('/',(req,res)=>{
//     res.send('post method')
// })
// app.put('/',(req,res)=>{
//     res.send('put method')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete method')
// })

const appMiddleware = (req,res,next)=>{
    console.log('app sp middleware')
    next()
}

app.use(appMiddleware)

//token verify middlewhere. 

const jwtmiddleware = (req,res,next)=>{
    const token = req.headers['access-token']
    try{
        const data = jwt.verify(token,'nissangtrr35')
        console.log('valid token');
        req.fromAcno = data.currentAcno;
        next();

    }
    catch{
        res.status(401).json({
            message: 'please login'
        })
    }
}



app.post('/register',(req,res)=>{
    console.log("inside function");
    console.log(req.body);
    dataService.register(req.body.uname,req.body.acno,req.body.pswd).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})


app.post('/login',(req,res)=>{
    console.log("inside function");
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

app.get('/getBalance/:acno',jwtmiddleware,(req,res)=>{
    console.log("inside Getbalance");
    dataService.getBalance(req.params.acno).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

// deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{
    console.log("inside deposit");
    dataService.depositdata(req.body.acno,req.body.amount).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})


//

app.post('/fundtransfer',jwtmiddleware,(req,res)=>{
    console.log("inside fund transfer");
    dataService.fundtransfer(req,req.body.toAcno,req.body.pswd,req.body.amount).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})


app.get('/all-transactions',jwtmiddleware,(req,res)=>{
    console.log("inside the get all transactions");
    dataService.getAllTransactions(req)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete account 

app.delete('/delete-account/:acno',jwtmiddleware,(req,res)=>{
    console.log("inside delete-account");
    dataService.deleteMyAccount(req.params.acno).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})