'use strict';

const Transform = require('stream').Transform;
const Vinyl = require('vinyl');
const path = require('path');

module.exports = function (targetName) {
	return new Transform({
		objectMode: true,

		transform: function (chunk, encoding, callback) {
			if (!this.chunks) {
				this.chunks = [];
			}
			this.chunks.push(chunk);
			callback(null, null);
		},

		flush: function (callback) {
			const newContentPieces = this.chunks.reduce((result, chunk) => {
				result.push(chunk.contents);
				result.push(new Buffer('\n'));
				return result;
			}, []);

			var newFile = new Vinyl({
				path: path.join(process.cwd(), targetName),
				contents: Buffer.concat(newContentPieces)
			});
			callback(null, newFile);
		}
	});
};