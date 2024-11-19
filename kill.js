import net from "net";

const dump = `0000   47 45 54 20 2f 61 70 69 2f 6f 72 64 65 72 2f 25
0010   45 31 25 39 43 25 38 34 25 43 38 25 42 41 79 25
0020   46 30 25 39 30 25 39 45 25 42 32 3a 25 46 30 25
0030   39 45 25 41 32 25 41 32 25 46 30 25 39 38 25 42
0040   34 25 38 37 25 46 30 25 39 30 25 38 30 25 38 30
0050   27 25 43 32 25 41 35 33 25 43 43 25 39 45 5b 25
0060   33 43 69 24 3f 25 46 30 25 39 43 25 42 43 25 38
0070   36 25 44 46 25 38 45 25 45 46 25 42 46 25 42 44
0080   43 25 45 46 25 42 46 25 42 44 25 45 32 25 38 30
0090   25 39 37 25 46 30 25 39 31 25 38 34 25 42 43 25
00a0   45 33 25 38 31 25 42 36 25 32 37 20 48 54 54 50
00b0   2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61
00c0   6c 68 6f 73 74 3a 33 30 30 30 0d 0a 55 73 65 72
00d0   2d 41 67 65 6e 74 3a 20 75 72 65 71 2f 32 2e 31
00e0   30 2e 31 0d 0a 41 63 63 65 70 74 3a 20 2a 2f 2a
00f0   0d 0a 41 50 49 2d 4b 45 59 3a 20 60 75 65 09 09
0100   63 27 3a 2f 09 09 4c 61 2f 09 09 2a 6d 52 45 25
0110   0d 0a 61 63 63 65 70 74 2d 65 6e 63 6f 64 69 6e
0120   67 3a 20 67 7a 69 70 0d 0a 0d 0a`;

const bytes = dump
	.split("\n")
	.flatMap(x =>
		x.slice(7)
		.split(" ")
		.map(x => parseInt(x, 16))
	);
const packet = Buffer.from(bytes);

console.log(bytes)

const options = {
  host: '127.0.0.1', // Target server IP
  port: 3000         // Target server port
};

const client = net.createConnection(options, () => {
  console.log('Connected to server. Sending raw HTTP packet...');
  client.write(packet);
  client.end(); // End the connection immediately after sending
});

// Handle errors
client.on('error', (err) => {
  console.error('Connection error:', err.message);
});

// Optionally handle connection close
client.on('close', () => {
  console.log('Connection closed.');
});