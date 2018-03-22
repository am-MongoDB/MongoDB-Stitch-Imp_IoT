#require "HTS221.device.lib.nut:2.0.1"
#require "LPS22HB.class.nut:1.0.0"
#require "WS2812.class.nut:3.0.0"
#require "LIS3DH.device.lib.nut:2.0.0"

// Define constants
const sleepTime = 120;

// Declare Global Variables
tempSensor <- null;
pressureSensor <- null;
spi <- null;
led <- null;
accel <- null;

// Define functions
function takeReading(){
    local conditions = {};
    local reading = tempSensor.read();
    conditions.temp <- reading.temperature;
    conditions.humid <- reading.humidity;
    reading = pressureSensor.read();
    conditions.press <- reading.pressure;
    conditions.light <- hardware.lightlevel();
    conditions.position <- accel.getAccel();
    
    led.set(0, [255,0,0]).draw();
    // Send 'conditions' to the agent
    agent.send("reading.sent", conditions);

    // Set the imp to sleep when idle, ie. program complete
    imp.onidle(function() {
        led.set(0, [0,255,0]).draw();
        server.sleepfor(sleepTime);
    });
}

// Start of program

// Configure I2C bus for sensors
local i2c = hardware.i2c89;
i2c.configure(CLOCK_SPEED_400_KHZ);
accel = LIS3DH(i2c, 0x32);
tempSensor = HTS221(i2c);
tempSensor.setMode(HTS221_MODE.ONE_SHOT);

pressureSensor = LPS22HB(i2c);
pressureSensor.softReset();

// LED
spi = hardware.spi257;
spi.configure(MSB_FIRST, 7500);
hardware.pin1.configure(DIGITAL_OUT, 1);
led = WS2812(spi, 1);

accel.enable(true);
local rate = accel.setDataRate(90);
server.log(format("Accelerometer running at %dHz", rate));

// Take a reading
takeReading(); 