# MqttPublisher

### MqttPublisher for Sim pumps

## to use the .exe

1. download the .exe
2. click on the .exe file
3. fill out IP in CLI
4. fill out port in CLI
5. fill out the number of pumps you want to configure

## file info

- publisherMQTT.js has the source code for the program.

- publisherMQTT.exe is the windows .exe version of publisherMQTT.js. I packaged this using pkg node package. This .exe file is for windows

```
`pkg publisher.js --targets node18-win-x64 --output publisher.exe`
```

To get a mac version you can run

```
pkg publisher.js --targets node18-macos-arm64 --output publisher
```
Herman Branch