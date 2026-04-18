// alice staunton - client.js - 18.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");

//load proto
const packageDef = protoLoader.loadSync("production.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const productionPackage= grpcObject;

// create client
const client = new productionPackage.ProductionService(
"localhost:50052",
grpc.credentials.createInsecure()
);

//client streaming
const call = client.SendProductionData((err, response) => {
if(err) {
console.error(err);
return;
}
console.log("Total Production:", response);
});

//send messages
call.write({ unitsProduced: 10});
call.write({ unitsProduced: 20});
call.write({ unitsProduced: 15});

//end stream
call.end();
