import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (request, reply) => {
  const buffers = [];

  for await (const chunk of request){
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent)

  return reply.end(fullStreamContent);

  // return request.pipe(new InverseNumberStream()).pipe(reply)
});

server.listen(3334);