const express = require('express');
const router = express.Router();
const Moment = require('moment');

const profiles = [
    {name: 'Mike', city: 'San Antonio'},
    {name: 'Hung', city: 'Dallas', profession: 'coder'},
    {name: 'Tatiana', city: 'Carolina', profession: 'chemist'}
];

let user = null;

/* GET home page. */
// returns the index html
router.get('/', function (req, res, next) {
    // res.render('index.hjs', { title: 'Express' });
    if (!user) {
        res.redirect('/login');
    }
    const data = {
        name: 'Hung',
        time: req.timestamp,
        title: 'My Application',
        profiles: profiles,
        user: user
    }
    res.something = 'hello there';
    res.render('index', data);
});

// Create a post handler for our form
router.post("/join", function (req, res, next) {
    const body = req.body;
    const params = req.param();
    profiles.push(body);
    res.redirect('/');
    // console.log(body);
    // console.log(params);
    // res.json({
    //     data: "This is the Post Request Handler",
    //   body: body
    // });
});

router.get('/login', function(req, res, next) {
    res.render('login', null);
})

router.post('/login', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    if (password === '123') {
        user = {username, password};
        res.redirect('/');
        return;
    }
    const data = {
        message: 'you encountered an error, please check your password'
    }
    res.render('error', data);
})

router.get('/json', function (req, res, next) {
    const data = {
        'text': 'hello there!',
        'name': 'hung',
        'location': 'san antonio',
        time: req.timestamp
    }
    res.json(data);
})
router.get('/html', function (req, res, next) {
    const html =
        `<html>
        <h1 style="color: red">This is an HTML response</h1>
        </html>`;
    res.send(html);
})
// get query
router.get('/query', function (req, res, next) {
    const query = req.query;
    console.log(query);
    res.json(query);
})
// get params passed in
router.get('/params/:name/:location/:occupation', function (req, res, next) {
    const params = req.params;
    res.json({
        'params': params
    });
})

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = {
        name: 'Home',
        date: 'May 12, 2020'
    }
    res.render('index.hjs', data);

    // res.render('test', null)
});


module.exports = router;
