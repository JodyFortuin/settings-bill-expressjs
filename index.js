const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

let express = require('express');
let app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('settings', function(req, res){

});

app.post('action', function(req, res){

});

app.get('actions', function(req, res){

});

app.get('actions/:type', function(req, res){

});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

let PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
