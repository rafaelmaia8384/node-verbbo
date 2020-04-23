const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

router(app);

app.listen(port, () => {
	console.log('App listening on port ' + port);
});