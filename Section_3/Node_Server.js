import http from 'http';
import files from 'fs';

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    if(url === '/'){
    res.write('<html>')
    res.write('<head><title>Homepage</title></head>')
    res.write('<body>')
    res.write('<h1>Hello I am Testing Routing Request</h1>')
    res.write('<form action ="/message" method="POST"><input type="text" name="testing"><button type="submit">Send</button></form>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
        
    }

    if(url === '/message' && method === 'POST'){
    
    const body = [];
    //On Use to get Information from the Request
    req.on('data',(chunk)=>{
        console.log(chunk); 
        body.push(chunk);
    });

    req.on('end',() =>{
        //Buffer used to Add Chunk into the Body
        const parsedBody = Buffer.concat(body).toString();
        //split('=')[1] will give us data after the equal sign in the message
        const message = parsedBody.split('=')[1]
        files.writeFile('message.txt',message,()=>{

            res.statusCode = 302;
            res.setHeader('Location','/');
            //To Make sure Response end here we use return
            return res.end();
            });
        
    });

    
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My Testing Server Page</title></head>')
    res.write('<body><h1>Hello I am Testing to Run the Server 1st Time yayyyy</h1></body>')
    res.write('</html>')
    res.end();
    
    
});

server.listen(3000,"Localhost");
