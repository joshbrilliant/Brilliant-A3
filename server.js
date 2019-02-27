const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
let session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))

app.get('/', showList);                  
app.get('/sort', sortList);
app.get('/add', addSong);
app.get('/remove', removeSong);
app.get('/clear', clear);
app.listen(process.env.PORT,  process.env.IP, startHandler())

function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT)
}

var songs = [];

function showList(req, res)
{
    let result = {};
    try
    {
        result = {'songs' : songs};
    }
    catch (e)
    {
        result = {'error' : e.message};
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
}

function sortList(req, res)
{
    let result = {};
    try
    {
        songs.sort();
        result = {'songs' : songs};
    }
    catch (e)
    {
        result = {'error' : e.message};
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
}

function addSong(req, res)
{
    let result = {};
    try
    {
        if (req.session.song == undefined)
            req.session.song = '';
      

        if (req.query.song != undefined)  
            req.session.song = req.query.song;
            
        let add = req.query.song;
        
        for (var i = 0; i < songs.length; i++)
        {
            var found = 0;
            
            if (add == songs[i])
            {
                found = 1;
            }
            else 
            {
                found = 0;
            }
        }
        
        if (found == 1)
        {
            throw Error ("Song already on list.");
        }
            
        songs.push(req.query.song);
        result = {'songs' : songs};
    }
    catch (e)
    {
        result = {'error' : e.message};
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
}

function removeSong(req, res)
{
    let result = {};
    try
    {
        if (req.session.song == undefined)
            req.session.song = '';
      

        if (req.query.song != undefined)  
            req.session.song = req.query.song;
            
        let remove = req.query.song;
        
        
        for (var i = 0; i < songs.length; i++)
        {
            var found = 1;
            
            if (remove == songs[i])
            {
                found = 1;
                songs.splice(i, 1);
            }
            else 
            {
                found = 0;
            }
        }
        
        if (found == 0)
        {
            throw Error ("Song not found on list.");
        }
        
        result = {'songs' : songs};
    }
    catch (e)
    {
        result = {'error' : e.message};
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
}

function clear(req, res)
{
    let result = {};
    try
    {
        while (songs.length > 0)
        {
            songs.pop();
        }
        result = {'songs' : songs};
    }
    catch (e)
    {
        result = {'error' : e.message};
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end('');
    
}