const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { processor } = require('./handlers/agentMessages');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.post('/api/processor', botFilter);
app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: global });
});

async function botFilter(req, res, next) {
    res.sendStatus(200);
    const { trigger, appUser: { _id: userId } } = req.body;

    switch (trigger) {
        case 'message:appMaker':
            await processor(req, res);
            break;
        case 'message:appUser':
            console.log(req.body);
            break;
        default:
            break;
    }
    next();
}

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
