import express from 'express';
import cors from 'cors';
import {query} from '../database/queryData.js'


const app = express(); 

const port = 5000


app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: '*'
}))
app.post('/search', async(req, res) => {

    const {term, limit, opt} = req.body
    
    const jobs = await query(term, limit, opt);

    res.json(jobs);
    
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})