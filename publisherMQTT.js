const mqtt = require("mqtt");
const readline = require("readline");
const TOPICS_AND_PAYLOADS = [
  {
    topic: "config/shutdown",
    payload: {
      clientName: "NcrFuel.44.ConfigurationService.exe.ConfigService",
    },
  },
  {
    topic: "config/options",
    payload: {
      configOptions: [
        { name: "DRIVEOFFTIMEOUT", value: "180" },
        { name: "FUEL_UNITS", value: "Gallons_US" },
      ],
    },
  },
  {
    topic: "config/precision-info",
    payload: {
      precisionInfo: [
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 1,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 2,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 3,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 4,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 5,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 6,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 7,
          volumePrecision: 3,
        },
        {
          moneyPrecision: 2,
          ppuPrecision: 3,
          pumpNumber: 8,
          volumePrecision: 3,
        },
      ],
    },
  },
  {
    topic: "config/tank-info",
    payload: {
      tankConfig: [
        {
          gradeName: "Regular Product",
          gradeNumber: 70000012,
          integrated: true,
          tankNumber: 1,
        },
        {
          gradeName: "Mid Product",
          gradeNumber: 70000010,
          integrated: true,
          tankNumber: 2,
        },
        {
          gradeName: "Premium Product",
          gradeNumber: 70000011,
          integrated: true,
          tankNumber: 3,
        },
      ],
    },
  },
  {
    topic: "config/pump-info",
    payload: {
      pumpConfig: [
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 1,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 2,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 3,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 4,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 5,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 6,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 7,
        },
        {
          hoseRecords: [
            { hose: 0, productID: 70000014 },
            { hose: 1, productID: 70000012 },
            { hose: 2, productID: 70000013 },
          ],
          integrated: true,
          pumpNo: 8,
        },
      ],
    },
  },
  {
    topic: "config/product-info",
    payload: {
      productConfig: [
        {
          catalogItemCode: "",
          externalID: "6003",
          primaryGradeNumber: 70000012,
          productID: 70000014,
          productName: "Regular",
        },
        {
          catalogItemCode: "",
          externalID: "6004",
          primaryGradeNumber: 70000010,
          productID: 70000012,
          productName: "Midgrade",
        },
        {
          catalogItemCode: "",
          externalID: "6002",
          primaryGradeNumber: 70000011,
          productID: 70000013,
          productName: "Premium",
        },
      ],
    },
  },
];

const AUTHORIZATION_MODES_PAYLOAD = {
  AuthModes: [
    {
      dayOfWeek: 0,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 1,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 2,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 3,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 4,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 5,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
    {
      dayOfWeek: 6,
      endHour: 23,
      endMinute: 59,
      modes: ["ICR", "Prepay", "Postpay", "CashPAP"],
      startHour: 0,
      startMinute: 0,
    },
  ],
};



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
    //  Ask user for IP port and number of pumps
    const brokerIP = await askQuestion(
      "What is your broker IP? (e.g. 192.168.8.50): "
    );
    const brokerPort = await askQuestion(
      "What is your broker port? (e.g. 1883): "
    );
    const numberOfPumpsString = await askQuestion(
      "How many fuel pumps do you have?: "
    );
    const numberOfPumps = parseInt(numberOfPumpsString, 10);
    if (isNaN(numberOfPumps) || numberOfPumps <= 0) {
      console.error(
        "Invalid number of pumps. Please enter a positive integer."
      );
      process.exit(1);
    }
    
    const mqttURL = `mqtt://${brokerIP}:${brokerPort}`;
    console.log(`\nConnecting to broker at: ${mqttURL} ...\n
`);
    
    const client = mqtt.connect(mqttURL);
    client.on("connect", async () => {
      console.log("Successfully connected to MQTT broker.\n");
      //  Publish each static config topic once
      for (const item of TOPICS_AND_PAYLOADS) {
        await publishToTopic(client, item.topic, item.payload);
      }
      // Publish authorization-modes for each pump in for loop
      for (let i = 1; i <= numberOfPumps; i++) {
        const pumpTopic = `config/pump/${i}/authorization-modes`;
        await publishToTopic(client, pumpTopic, AUTHORIZATION_MODES_PAYLOAD);
      }
      console.log("\nAll topics published successfully!");
      
      client.end();
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



function publishToTopic(client, topic, jsonData) {
  return new Promise((resolve, reject) => {
    const message = JSON.stringify(jsonData);
    client.publish(topic, message, { qos: 0, retain: true }, (error) => {
      if (error) {
        console.error(`Failed to publish to ${topic}`, error);
        return reject(error);
      }
      console.log(`Published to ${topic} → ${message}`);
      resolve();
    });
  });
}
