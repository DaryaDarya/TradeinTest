var parser = require("../parse-array");
var assert = require("assert");
var Promise = require("bluebird");
var parserAsync = Promise.promisifyAll(parser);



describe("parse-array tests", function(){
	it("should return empty string when array is empty", function(done){
		parser.parse([], function(err, result){
			if (err)
				done(err);
			assert.equal(result, "");	
			done();
		});
	})

	it("should return string with 1 value when array has 1 element", function(done){
		var result = parser.parse([1], function(err, result){
			if (err)
				done(err);
			assert.equal(result, "1");	
			done();
		});
	})

	it("should return string with 1 interval", function(done){
		var result = parser.parse([1,2,3,4,5,6,7,8], function(err, result){
			if (err)
				done(err);
			assert.equal(result, "1-8");	
			done();
		});
	})

	it("should return string when array has various data", function(done){

		Promise.all([
				parserAsync.parseAsync([1,3,4,5,6,7,8]),
				parserAsync.parseAsync([1,3,4,5,6,7,8,10,11,12]),
				parserAsync.parseAsync([1,2,3]),
				parserAsync.parseAsync([1,2]),
				parserAsync.parseAsync([1,2,4]),
				parserAsync.parseAsync([1,2,4,5,6]),
				parserAsync.parseAsync([1,2,3,7,8,9,15,17,19,20,21]),
				parserAsync.parseAsync([1,2,3,4,5,6,100,1091,1999,2000,2001,2002]),
				parserAsync.parseAsync([1,3,5,7,9,11])
			])
			.then(function(result){
				assert.equal(result[0], "1,3-8");
				assert.equal(result[1], "1,3-8,10-12");
				assert.equal(result[2], "1-3");
				assert.equal(result[3], "1,2");
				assert.equal(result[4], "1,2,4");
				assert.equal(result[5], "1,2,4-6");
				assert.equal(result[6], "1-3,7-9,15,17,19-21");
				assert.equal(result[7], "1-6,100,1091,1999-2002");
				assert.equal(result[8], "1,3,5,7,9,11");
				done();
			})
			.catch(function(err){
				done(err);
			})		
	})
})