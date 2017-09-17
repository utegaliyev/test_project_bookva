const express = require('express');
const path = require('path');
const request = require('superagent');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();

const PORT = 8080;

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(path.join(__dirname + '/dist')));

app.get('/doc', function(req, res) {
    console.log("Got request: ", req.query);
    request.get("https://ktbookva.herokuapp.com/pxy?url=https://habrahabr.ru/post/259625/")
        .set("Cookie", "auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU5NTdlMDJlMWM5ZWQ0MDAwNDkxZjdjMCIsImlhdCI6MTUwMDIwNDgyMH0.6TVPOIEan56s77XwK1M5YGcVYZnYTxfCRPRFh_d5dYc")
        .then((resp) => {
            res.json({ doc: resp.text })
        })
        .catch((err) => {console.log(err)})
});



app.listen(PORT, function(error){
    if (error) throw error;
    console.log("Express server listening on port", PORT);
});