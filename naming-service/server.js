//alice staunton - server.js - 21.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");


//load proto
const packageDef = protoLoader.loadSync("naming.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const namingPackage= grpcObject;

// in-memory storage
const services = {};

//registere service
function registerService(call, callback) {
const {name, address } = call.request;

services[name]= address;

console.log(`Registered: ${name } → ${address}`);

callback(null, {
message: "Service registered successfully"
});
}


//discover
function discoverService (call, callback) {
const {name} =call.request;

const address = services[name];

if(!address) {
return callback({
code: grpc.status.NOT_FOUND,
message: "Service not found"
});
}

callback(null, {
name,
address
});
}

//create server
const server = new grpc.Server();

server.addService(namingPackage.NamingService.service, {
RegisterService: registerService,
DiscoverService: discoverService
});

//start srver
server.bindAsync(
"0.0.0.0:50054",
grpc.ServerCredentials.createInsecure(),
() => {
console.log("Naming Service running on port 50054")
});

