import express from 'express';
import fs from 'fs';
import { format } from 'date-fns';
const app = express();
const PORT = 3333;
app.get('/', (req, res)=>{
    res.status(200).send(`
    <h1 style="background-color:skyblue;padding:10px 0px;text-align:center">
    Express Server is Connected !</h1>
    <div style="text-align:center">
    <p><span style="background-color:lightgreen;font-size:18px"> To Create a New txt file</span> --> <a href="/new-create-write-read-txt">Click Here</a></p>
    <p><span style="background-color:skyblue;font-size:18px">To Retrieve All txt file</span> --> <a href="/read-all-txtFiles">Click Here</a></p>
    </div>
    `);
    
});
app.get('/new-create-write-read-txt',(req, res)=>{

    try{
        let currentTimeStamp = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
        const filePath = `./TimeStamp/${currentTimeStamp}.txt`;
        const content = `Current TimeStamp : ${currentTimeStamp}`;
        fs.writeFileSync(filePath, content, 'utf8');
        let data = fs.readFileSync(filePath, 'utf8');
        res.status(200).send(`<div style="background-color:green;padding:10px 0px;text-align:center;color:white">
        <h1>File created successfully!</h1>
        <p>Txt File Name : ${currentTimeStamp}.txt</p>
        <p>Txt File Content : ${data}</p>
        <p><a href="/" style="color:yellow">Back to Home</a></p>
        </div>`);
    }catch(err){
        res.status(500).send(`<h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
        Error reading file: ${err.message}</h1>`);
    }
    

});

app.get('/read-all-txtFiles', (req, res) => {
    try {
        const files = fs.readdirSync('./TimeStamp');
        // console.log(files);
        const txtFiles = files.filter(file => file.endsWith('.txt'));
        // console.log(txtFiles);
        res.status(200).send(`<h1 style="background-color:blue;padding:10px 0px;text-align:center;color:white">
        All Retrieved Text Files<p><a href="/" style="color:yellow">Back to Home</a></p></h1><ul>${txtFiles.map(file => 
            `<dl style="display: list-item;list-style-type: disc;">
            <dt><b>File Name : </b>${file}</dt>
            <dd style="display: list-item;list-style-type: circle;"><b>File Content : </b>${fs.readFileSync(`./TimeStamp/${file}`, 'utf8')}</dd>
            </dl>`).join('')}</ul>`);
    } catch (err) {

        res.status(500).send(`<h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
        Error reading files: ${err.message}</h1>`);
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running in the port : ${PORT}`);
})