exports = function(data){
  //Get the current time
  var now = new Date();

  var darksky = context.services.get("darksky");
  var mongodb = context.services.get("mongodb-atlas");
  var TempData = mongodb.db("Imp").collection("TempData");

  var response = darksky.get({"url": "https://api.darksky.net/forecast/" + context.values.get("DarkSkyKey") + '/' + context.values.get("DeviceLocation") +
    "?exclude=minutely,hourly,daily,alerts,flags&units=auto"
  });
  var darkskyJSON = EJSON.parse(response.body.text()).currently;

  var status =
    {
      "Timestamp": now.getTime(),
      "Date": now,
      "Readings": data,
      "External": darkskyJSON,
    };
    status.Readings.light = (100*(data.light/65536));
  context.functions.execute("controlHumidity", data.temp, data.humid);

  return TempData.insertOne(status);
};