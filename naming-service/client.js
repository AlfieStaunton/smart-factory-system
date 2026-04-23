//alice staunton - client.js - 21.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");

//load proto
const packageDef = protoLoader.loadSync("naming.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const namingPackage= grpcObject.NamingService;


//create client
const client = new namingPackage(
"localhost:50054",
grpc.credentials.createInsecure()
);

// register service
client.RegisterService(
{name: "MachineService", address: "localhost:50051" },
(err, response) => {
if(err) {
console.error(err);
return;
}

console.log("Register response:", response);


//discover service
client.DiscoverService(
{name: "MachineService"},
(err, response) => {
if(err) {
console.error(err);
return;
}

console.log("Discovered Service:", response);
});
});
