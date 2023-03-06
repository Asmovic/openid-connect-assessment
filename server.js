const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// Enable Proxy
app.enable('trust proxy');

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//Store all HTML, JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/public'));

app.get("/", (req,res)=> {
    res.render('landing')
});

app.get('/callback', (req, res) => {
res.render('index', { title: 'OpenID Connect'})
}
);

app.get("/profile", (req,res) => {
    res.render('profile', { user: 'Asogba Ibrahim' })
    /* res.send('This is profile page') */
})

/* app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './public'))
});
 */
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('Server listening on PORT ' + PORT));