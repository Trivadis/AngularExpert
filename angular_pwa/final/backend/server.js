const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// Generate VAPID Keys
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
    'mailto:info@accenture.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Create server
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

let subscription;
let pushIntervalID;

const notificationMsg = {
    "notification": {
        "title": "Angular PWA @ Accenture!",
        "body": "Push Notifications are very cool!",
        "vibrate": [100, 50, 100],
        "actions": [
            { "action": "twitter", "title": "Twitter" },
            { "action": "linkedin", "title": "Linkedin" }
        ],
        "requireInteraction": true,
        "data": {
            "onActionClick": {
                "default": { "operation": "openWindow", "url": "https://www.accenture.com" },
                "twitter": { "operation": "openWindow", "url": "https://twitter.com/accenture" },
                "linkedin": { "operation": "openWindow", "url": "https://www.linkedin.com/company/accenture" }
            }
        }
    }
}

/**
 * Returns the VAPID public key.
 */
app.get('/notifications/key', (req, res) => {
    res.send({
        publicKey: vapidKeys.publicKey
    });
});

/**
 * Subscribe for notifications.
 */
app.post('/notifications/subscribe', (req, res) => {
    subscription = req.body;
    res.sendStatus(201);
    try {
        pushIntervalID = setInterval(() => {
            console.log("Sending a notification to the client.");

            // Send a notification every 10 seconds
            webpush.sendNotification(subscription, JSON.stringify(notificationMsg))
                .catch(() => {
                    console.error("Failed to send notification");
                    clearInterval(pushIntervalID);
                })
        }, 10000)
    } catch (error) {
        console.error("Failed to send notification: ", error);
    }
});

/**
 * Unsubscribe for notifications.
 */
app.delete("/notifications/unsubscribe", (req, res) => {
    subscription = null;
    clearInterval(pushIntervalID);
    res.sendStatus(200);
});


app.listen(3000, () => console.log('listening on port 3000'))