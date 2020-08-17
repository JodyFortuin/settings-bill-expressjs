let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill.factory');
var moment = require('moment');
moment().fromNow(); 

let app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.alertColor(),
    });
});

app.post('/settings', function(req, res){

   settingsBill.setSettings({
       callCost: req.body.callCost,
       smsCost: req.body.smsCost,
       warningLevel: req.body.warningLevel,
       criticalLevel: req.body.criticalLevel
    });
//console.log(settingsBill.getSettings());
   res.redirect('/');
});

app.post('/action', function(req, res){

      settingsBill.recordAction(req.body.actionType)
      res.redirect('/');
});

app.get('/actions', function(req, res){
      var actionsList = settingsBill.actions()
         for (let key = 0; key < actionsList.length; key++){
         key.ago = moment(key.timestamp).fromNow()
}

      res.render('actions', {actions: settingsBill.actions,
      timestamp: moment().fromNow(),
      actions: actionsList
    });
});

app.get('/actions/:actionType', function(req, res){
     const actionType = req.params.actionType;
    
     var actionsList = settingsBill.actions()
         for (let key = 0; key < actionsList.length; key++){
         key.ago = moment(key.timestamp).fromNow()
}

     res.render('actions', {actions: settingsBill.actionsFor(actionType),
     actions: actionsList
    });
});

let PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
