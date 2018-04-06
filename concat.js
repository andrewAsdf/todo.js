'use strict';

const Transform = require('stream').Transform;
const util = require('util');

module.exports = function (text) {
	return new Transform ({
		objectMode: true,

		transform: function (chunk, encoding, callback) {
			if (!this.chunks) {
				this.chunks = []
			}
			this.chunks.push (chunk)
			callback(null, chunk);
		},

		flush: function (callback) {
			callback(null, Buffer.concat(this.chunks))
		}
	});
};