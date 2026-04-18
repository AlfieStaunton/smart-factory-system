//alice staunton - server.js - 18.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");

//load proto
const packageDef = protoLoader.loadSync("production.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const productionPackage= grpcObject;

//client streaming
function sendProductionData (call, callback) {
let total =0;

call.on("data", (request) => {
console.log("Recieved:", request.unitsProduced);
total += request.unitsProduced;
});

call.on ("end", () => {
callback(null, { totalUnits: total});
});
}

//create surver
const server = new grpc.Server();

server.addService(productionPackage.ProductionService.service, {
SendProductionData:sendProductionData
});

//start server
server.bindAsync(
"0.0.0.0:50052",
grpc.ServerCredentials.createInsecure(),
() => {
console.log("Production servver running on port 50052");
server.start();
});

