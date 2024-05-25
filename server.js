import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
// import router from './router/route.js';
import connect from './database/conn.js';

const app = express();
const PORT = process.env.PORT || 8080;
config();



app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

/* routes */

// app.use('/api', router)

app.get('/', (req, res)=>{
    try{
        res.send("Hello vercel")
    }catch(e){
        res.json(e)
    }
});

/* database */


/* start server only when we have valid connection */

connect().then(()=>{
    try{
        app.listen(PORT, ()=>{
            console.log(`server is running in http://localhost:${PORT}`);
        })
    }catch(e){
        console.log(e)
    }
}).catch(e => {
    console.log("invalid database connection")
})

