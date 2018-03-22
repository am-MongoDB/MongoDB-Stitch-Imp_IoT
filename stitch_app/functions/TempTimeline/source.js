exports = function(start, end) {
    var atlas = context.services.get('mongodb-atlas');
    var coll = atlas.db('Imp').collection('TempData');
/*
    return coll.find({ "Timestamp": {"$gte": start, "$lte": end }},
        {"_id": 0,"Timestamp": 1, insideTemp: "%Readings.temp", outsideTemp: "%External.temperature"})
        .sort({"timestamp": 1})
        .limit(1000)
        .toArray();
  */
  
    var insideTemps = coll.find({ "Timestamp": {"$gte": start, "$lte": end }},
        {"_id": 0,"Timestamp": 1, temperature: "%Readings.temp"})
        .sort({"Timestamp": 1})
        .limit(1000)
        .toArray();
    var outsideTemps = coll.find({ "Timestamp": {"$gte": start, "$lte": end }},
      {"_id": 0,"Timestamp": 1, temperature: "%External.temperature"})
      .sort({"Timestamp": 1})
      .limit(1000)
      .toArray();

    return ([
      {id: 'Inside Temp', values: insideTemps},
      {id: 'Outside Temp', values: outsideTemps}
    ]);
};