const mqtt = require("mqtt");
const readline = require("readline");
const fs = require("fs");

const LOG_FILE = "mqtt_messages.log";

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

(async function main() {
  try {
    const brokerIP = await askQuestion(
      "What is your broker IP? (e.g. 192.168.8.50): "
    );
    const brokerPort = await askQuestion(
      "What is your broker port? (e.g. 1883): "
    );

    const mqttURL = `mqtt://${brokerIP}:${brokerPort}`;
    console.log(`\nConnecting to broker at: ${mqttURL} ...\n`);

    const client = mqtt.connect(mqttURL);

    client.on("connect", () => {
      console.log("Successfully connected to MQTT broker.");
      client.subscribe("#", (err) => {
        if (!err) {
          console.log("Subscribed to all topics. Listening for messages...");
          console.log(`Messages will be logged to ${LOG_FILE}`);
        } else {
          console.error("Subscription failed:", err);
          process.exit(1);
        }
      });
    });

    client.on("message", (topic, payload) => {
      const logEntry = `Timestamp: ${new Date().toISOString()}\nTopic: ${topic}\nPayload: ${payload.toString()}\n--------------------------------------------------\n\n`;
      fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
          console.error("Failed to write to log file:", err);
        }
      });
      console.log(`Received message on topic: ${topic}`);
    });

    client.on("error", (error) => {
      console.error("Connection error:", error);
      process.exit(1);
    });
    
  } catch (err) {
    console.error("Error in main function:", err);
    process.exit(1);
  }
})();
