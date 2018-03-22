# Using MongoDB Stitch & Electricimp to capture, store, and report sensor data


To find everywhere where you need to add your own keys/Info:

```bash
grep -r TODO *

electricImp/agent.nut:stitch <- MongoDBStitch("TODO <Your Stitch Ap ID goes here>");
electricImp/agent.nut:const API_KEY = "TODO <Your Stitch API_KEY goes here>";
stitch_app/values/DeviceLocation.json:    "value": "<TODO: Replace this with your own location>51.520,-0.737",
stitch_app/values/DarkSkyKey.json:    "value": "<TODO: Your DarkSky.net API key goes here",
stitch_app/stitch.json:    "app_id": "<TODO: Your stitch App ID goes here>",
```
