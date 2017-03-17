'use strict';

const BASE_URL = "https://graph.facebook.com/v2.6";

class CFacebook {

  constructor(sender, access_token) {
    access_token = access_token || process.env.FB_PAGE_ACCESS_TOKEN;
    this.sender = sender;
    this.FB_PAGE_ACCESS_TOKEN = access_token;
  }

  static wrapList(list) {
        var elements = [];
        for (var i = 0; i < list.length; i++) {
            var buttons = [];
            var element = {};
            element.title = list[i].dataValues.name;
            element.subtitle = "";
            element.item_url = "";
            element.image_url = list[i].dataValues.image_url;
            var basicParameters = "carId=" + list[i].dataValues.id;
/*
            var hash = crypto.createHmac('sha256', CONFIG.A1_REQUEST_SECRET)
                .update(basicParameters)
                .digest('hex');
            let parameters = basicParameters + "&token=" + hash;
            */
            let buyButton = {};
            buyButton.type = "web_url";
            buyButton.url = "http://localhost:3000/cars?" + parameters; // TODO
            buyButton.title = "Details";
            buyButton.webview_height_ratio = "full";
            buyButton.messenger_extensions = true;
            buttons.push(buyButton);

            element.buttons = buttons;
            elements.push(element);
        }
        let quick_replies = [
            CFacebook.wrapQRText("New search", '{"type":"QR","name":"NEW_SEARCH_START"}')
        ];
        var toBeReturned = {
            data: {
                facebook: CFacebook.wrapStrMsg(elements, quick_replies)
            }
        };
        return toBeReturned;
    }

    static wrapQRText(title, payload, image_url) {
        if (title.length > 20) throw new Error("QR title exceeds 20 chars");
        if (payload.length > 1000) throw new Error("QR payload exceeds 1k chars");
        let FBO = {
            "content_type": "text",
            title,
            payload,
        };
        if (image_url)
            FBO['image_url'] = CONFIG.URL + image_url;
        return FBO;
    }

    static wrapStrMsg(elements, quick_replies) { // facebook Generic
        let strmsg = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
        };
        if (quick_replies) {
            strmsg['quick_replies'] = quick_replies
        }
        return strmsg;
    }


}
