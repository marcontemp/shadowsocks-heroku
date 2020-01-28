const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

console.log(buf.readUInt32BE(0))
console.log(buf.readUInt32BE(0).toString(2));
console.log(buf.readUInt32BE(0).toString(8));
console.log(buf.readUInt32BE(0).toString(16));
// Buffer.toString([to which scale])
// Prints:
// 305419896
// 2215053170
// 12345678
console.log(buf.readUInt32LE(0))
console.log(buf.readUInt32LE(0).toString(16));
// Prints: 78563412
//console.log(buf.readUInt32LE(1).toString(16));
// Throws ERR_OUT_OF_RANGE
buf2 = new Buffer("1000", "hex");
//console.log(buf2.toString(16));//.readUInt32BE(0).toString(16));