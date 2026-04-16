const grpc = require("@grpc/grpc-js");
const protoLoader= require("@grpc/proto-loader");

//load proto
const packageDef = protoLoader.loadSync("machine.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const machinePackage= grpcObject;

//create client
const client = new machinePackage.MachineService(
"localhost:50051",
grpc.credentials.createInsecure()
);

// test unary rpc
client.GetStatus({ machineId:"M1" }, (err, response) => {
if(err) {
console.error(err);
return;
}
console.log("Unary response:", response);
});

//test server streaming
const call = client.StreamPerformance({machineId: "M1" });

call.on("data", (data) => {
console.log("Stream data:", data);
});

call.on("end", () => {
console.log("Stream ended");
});
