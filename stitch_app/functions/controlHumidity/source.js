exports = function(temp, humidity){

  var IFTTT = context.services.get("IFTTT");

  // The humidifier is very inefficient if room is to cold, so only turn it on if the humidity is too high and temperature
  // is high enough

  var state = "dry";

  if (temp > context.values.get("minTemp")) {
    if (humidity > context.values.get("maxHumidity")) {
        state = "damp";
    }
  }

  IFTTT.get({"url": "https://maker.ifttt.com/trigger/" + state + "/with/key/" + context.values.get("MakerIFTTKey")});
  
};