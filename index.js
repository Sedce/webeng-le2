const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');
const app = express();
app.engine('html', consolidate.nunjucks);
app.set('views', './views');
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(req, res) {

  var name = req.query.username;
  console.log(name);
  if(name){
	res.render('index.html', {username: name});
}else{
  res.render('index.html',{username:'Anonymous'})
}
});
app.get('/profile/:username', function(req, res) {
  var name = req.params.username;
  console.log(req.params.username);
  res.render('profile.html',{username: name});

});


app.post('/submit', function(req,res)
{
  var name = req.body.username;
if(name){
  res.redirect('/profile/'+ req.body.username);
}else{
  res.redirect('/');
}
});


app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});
