'use strict';

const Transform = require('stream').Transform;

module.exports = function (text) {
	return new Transform({
		objectMode: true,
		transform: function (chunk, encoding, callback) {
			chunk.contents = Buffer.concat([new Buffer(`/* ${ text } */\n`), chunk.contents]);
			callback(null, chunk);
		}
	});
};