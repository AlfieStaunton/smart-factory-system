// alice staunton -server.js - 16.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");

//load proto
const packageDef = protoLoader.loadSync("machine.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const machinePackage= grpcObject;

// unary rpc
function getStatus(call, callback) {
const machineId = call.request.machineId;

callback(null, {
status: "Machine " + machineId + " is running"
});
}

//server stream rpc
function streamPerformance(call) {
let count = 0;

const interval= setInterval(() =>{
call.write({
temperature: Math.random() * 100,
load: Math.random() *100
});

count++;

if (count === 5) {
clearInterval(interval);
call.end();
}
}, 1000);
}

//create server
const server= new grpc.Server();

server.addService(machinePackage.MachineService.service, {
GetStatus: getStatus,
StreamPerformance: streamPerformance
});

// start server
server.bindAsync(
"0.0.0.0:50051",
grpc.ServerCredentials.createInsecure(),
() => {
console.log("Machine Service running on port 50051");
server.start();
});
