'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const VERIFY_TOKEN = "password"
const FACEBOOK_TOKEN = "EAAahD6bmXuYBABh90oQCAfQhx5sVRYDwU04ZAim7NRyZBJis4K1ZACeZChC13PqTCxFKwblu6ZBnRD9BfMKwYEiuZCkUNBjUZCnHe5HkxnfpXb4gGolMI7slNl2rZBvvjzI6MZCZB4ZA69MwOhKroaukhlNGxcY8bjrN3RIpeAr0Wmk6vIsJWuc3MFv"
const SUMMER_IMAGE_URL = "https://f4.bcbits.com/img/a1792831175_16.jpg"
const WINTER_IMAGE_URL = "https://static.pexels.com/photos/6993/snow-winter-christmas-deer.jpg"
const SPRING_IMAGE_URL = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSq2-YYF3Eo7ViCtS6Ba3kNBfBfjvE4B-BWe-KABYKSj2ybC-r4w"
const app = express()

app.set('port', (process.env.PORT || 3000))

// Processing the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.get('/', function(req, res) {
	res.send("Hi! I am a chatbot")
})

// Facebook
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token!")
})
app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i=0; i<messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			decideMessage(sender, text)
			// sendText(sender, "Text echo: " + text.substring(0, 100))
		}
		
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			decideMessage(sender, text)
		}
	}
	req.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});
	res.sendStatus(200)
})

function decideMessage(sender, enteredText) {
	let text = enteredText.toLowerCase()
	if (text.includes("summer")) {
		sendImageMessage(sender, SUMMER_IMAGE_URL)
	} else if (text.includes("winter")) {
		sendGenericMessage(sender)
	} else if (text.includes("spring")) {
		sendImageMessage(sender, SPRING_IMAGE_URL)
	} else {
		sendText(sender, "I like fall")
		sendButtonMessage(sender, "What is your favorite season?")
	}
}

function sendButtonMessage(sender, text) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": text,
        "buttons":[
          {
            "type": "postback",
            "title": "Summer",
			"payload": "summer"
          },
          {
            "type": "postback",
            "title": "Winter",
			"payload": "winter"
          },
		  {
            "type": "postback",
            "title": "Spring",
			"payload": "spring"
          }
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendImageMessage(sender, imageURL) {
	let messageData = {
		"attachment":{
			"type":"image",
			"payload":{
				"url": imageURL
			}
		}
	}
	sendRequest(sender, messageData)
}

function sendGenericMessage(sender) {
	let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Winter",
            "image_url": WINTER_IMAGE_URL,
            "subtitle":"I love winter!",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://en.wikipedia.org/wiki/Winter",
                "title":"More about winter"
              }            
            ]      
          }
        ]
      }
    }
  }
  sendRequest(sender, messageData)
}

function sendRequest(sender, messageData){
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: FACEBOOK_TOKEN},
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

function sendText(sender, text) {
	let messageData = {text: text}
	sendRequest(sender, messageData)
}

app.listen(app.get('port'), function() {
	console.log('Chatbot server listening on port' + app.get('port'))
})
