var dbus = require('dbus-native');
var sBus = dbus.systemBus();
 
var systemBus = dbus.systemBus();
var btService = systemBus.getService('org.bluez');
 
btService.getInterface('/org/bluez/hci0','org.bluez.Adapter1',function(err,Intf){
Intf.StartDiscovery();
 
});
 
var http = require('http');
 
const server = http.createServer((request,response)=>{
 
btService.getInterface('/','org.freedesktop.DBus.ObjectManager',function(err,device_intf){
device_intf.on('InterfacesAdded',function(devname){
console.log(devname);
response.statusCode = 200;
response.setHeader('Content-Type', 'text/plain');
response.write('New Device Path : '+devname);
response.end();
});
});
}).listen(30001);
 
console.log('Server started');