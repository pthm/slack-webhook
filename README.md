# slack-webhook

## Installation

```bash
npm i -S slack-webhook
```

## Usage

### Initialization

Setup an [incoming webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) and copy the webhook url. This is the only required parameter to initialize the module.

```js
var slackWebhook = require('slack-webhook');

var slack = slackWebhook({
  url: 'https://hooks.slack.com/services/your/webhook/url'
});
```

Optionally, you can pass in a `payload` attribute to set defaults for the webhook's `username`, `icon_emoji` and `channel`. If no payload attribute is used, it will default to `'Bot'` for `username` and `'#general'` for `channel`.

```js
var slack = slackWebhook({
  url: 'https://hooks.slack.com/services/your/webhook/url',
  payload: {
    username: 'Bot',
    channel: '#general',
    icon_emoji: ':robot_face:'
  }
});
```

### Sending a message

There are two ways to send a message. The first is by passing a string as the argument.

```js
slack.send('some text');
```

The second is to pass a payload. Any options you pass in here will override the default ones you created at initialization.

```js
slack.send({
  text: 'some text',
  attachments: [
    // optional attachment data
  ],
  username: 'new username',
  icon_emoji: ':scream_cat:',
  channel: '#another-channel'
});
```

Both versions return a promise.

```js
slack.send('some text').then(function (res) {
  // succesful request
}).catch(function (err) {
  // handle request error
});
```
