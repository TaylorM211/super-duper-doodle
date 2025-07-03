const express = require('express');
const mqtt = require('mqtt');
const crypto = require('crypto');

const app = express();
const port = 3000;


const MQTT_BROKER_URL = 'mqtt://192.168.1.100'; // MQTT broker's IP add
const PUMP_NUMBER = 1;
const CLIENT_ID = 1;
const AUTHORIZATION_AMOUNT = 500; // $5.00


app.use(express.static('public'));


app.post('/api/arm-pump', (req, res) => {
    console.log('Received request to arm pump...');

    const client = mqtt.connect(MQTT_BROKER_URL);

    client.on('connect', () => {
        console.log('Connected to MQTT broker.');

        const topic = `client/${CLIENT_ID}/pump/${PUMP_NUMBER}/authorize-pump`;
        const payload = {
            metadata: {
                ev_id: crypto.randomBytes(16).toString('hex'),
                responseRequired: true
            },
            consoleAuth: true,
            holdAuth: false,
            fuelSale: {
                authorizationAmount: AUTHORIZATION_AMOUNT,
                transactionType: 1, 
                hoseMap: 254,
                posTransactionUid: crypto.randomBytes(16).toString('hex'),
                fuelSaleUid: crypto.randomBytes(16).toString('hex'),
                authorizingStation: "",
                authorizingCashier: "WebApp",
                authorizingShift: 0,
                posTransactionId: 0,
                prepaidTenderAmounts: {
                    onePhaseTenderAmount: AUTHORIZATION_AMOUNT,
                    twoPhaseTenderAmount: 0
                }
            },
            productLimits: [] 
        };

        client.publish(topic, JSON.stringify(payload), (err) => {
            if (err) {
                console.error('Failed to publish MQTT message:', err);
                res.status(500).json({ message: 'Failed to publish MQTT message.' });
            } else {
                console.log(`Successfully published to topic: ${topic}`);
                res.status(200).json({ message: 'Pump armed successfully!' });
            }
            client.end();
        });
    });

    client.on('error', (err) => {
        console.error('Could not connect to MQTT broker:', err);
        res.status(500).json({ message: 'Could not connect to MQTT broker.' });
        client.end();
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log('Point a browser on the LAN to this machine\'s IP address at port 3000.');
});