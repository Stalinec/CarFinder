'use strict';

var express = require('express');
const request = require('request');
var router = express.Router();

var Models = require('../models');
var FB = require('../apis/Facebook');

router.get('/', function(req, res, next) {
  res.render('hello');

/*
  Product.find(function(error, docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shop Cart', products: productChunks });
  });
  */

});

/**
 * Setup Hook for developer.facebook.com
 */
router.get('/webhook/', function(req, res) {
  res.render('hello');
  /*
	console.log(req.query);
    if (req.query['hub.verify_token'] === "password") { // CONFIG.FB_VERIFY_TOKEN
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
    */
});

router.post('/webhook/', function(req, res) {
  let messaging_events = req.body.entry[0].messaging
	for (let i=0; i<messaging_events.length; i++) {
    let sender = event.sender.id;
    let answer = {};

    Models.Car.findAll()
    .then(function(cars) {
      answer = FB.wrapList(cars);
    });

  }




  res.sendStatus(200);
});

function sendRequest(sender, messageData){
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: process.env.FB_PAGE_ACCESS_TOKEN},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body){
		if (error) {
			console.log("Sending error!")
			console.log(error)
		} else if (response.body.error) {
			console.log("Response body error")
			console.log(response.body.error)
		}

	})
}

module.exports = router;
