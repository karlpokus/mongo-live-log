#!/usr/bin/env node

function handleData(chunk) {
	const str = chunk.toString().substr(38);
	console.log(str);
}

// assume pipe
process.stdin
	.on('data', handleData)
	//.on('end', foo);
