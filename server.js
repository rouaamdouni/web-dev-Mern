const http = require('http')
const fs =require('fs')
let users = [
    {
        id:'16',
        name:'Dahmen'
    },
    {
        id:'2',
        name:'IFA'
    },
    {
        id:'3',
        name:'TALBI'
    },
    {
        id:'4',
        name:'MERIEH'
    },
    {
        id:'7',
        name:'MSEKNI'
    }
]
const server = http.createServer((req,res)=>{
    if(req.url =='/favicon.ico'){
        res.statusCode = 401
        res.end()
    }else if(req.url=='/users' && req.method.toLocaleLowerCase()=="get"){
        res.setHeader("content-type",'text/html')
        res.write("<ul>")
        users.forEach(user=>{
            res.write(`<li>${user.name}</li>`)
        })
        res.write("</ul>")
        res.end();
    
    }else if(req.url=='/users/all' && req.method.toLocaleLowerCase()=="get"){
        fs.readFile('names.txt',(err,data)=>{
           if(err) throw err
           res.setHeader("content-type",'text/html')
           res.write(data)
           res.end()
        })

    }else if(req.url=='/users/reset' && req.method.toLocaleLowerCase()=="get"){
        res.setHeader("content-type",'text/html')
        fs.writeFile('names.txt','',()=>{
            res.write(`<h1> empty file </h1>`)
            res.end()
        })
      


    }else if(req.url=='/users/ajouter/' && req.method.toLocaleLowerCase()=="get"){
        let [_,name] = req.url.split("/")
        fs.appendFile('names.txt', name + '\n', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.write(`ajoutina ${name} fel fichier`)
        res.end()
    }else 
    res.end('logged')
}).listen(3030)
