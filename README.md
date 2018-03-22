# Using MongoDB Stitch & Electricimp to capture, store, and report sensor data

To find everywhere where you need to add your own keys/Info:

```bash
grep -r --exclude="README.md" TODO *
electricImp/agent.nut:stitch <- MongoDBStitch("TODO <Your Stitch Ap ID goes here>");
electricImp/agent.nut:const API_KEY = "TODO <Your Stitch API_KEY goes here>";
index.html:  const appId = "<TODO: Add your own Stitch App ID here>"
stitch_app/values/DeviceLocation.json:    "value": "<TODO: Add your own location here 51.520,-0.737>",
stitch_app/values/DarkSkyKey.json:    "value": "<TODO: Add your own key here?>",
stitch_app/values/MakerIFTTKey.json:    "value": "<TODO: Add your own key here>",
stitch_app/stitch.json:    "app_id": "<TODO: Add your own App ID here>",
```
