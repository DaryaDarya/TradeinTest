module.exports = {
	parse: parse
}

function parse(array, callback){
	process.nextTick(function () {
		var result = "";
		var error;
		try{
			if (!array.length){
				callback(error, result);
				return;
			}
			var startValue = array[0], endValue = array[0];
			for(var i = 1; i < array.length; i++){
				if (array[i] - endValue > 1){
					result += formatString(startValue, endValue);	
					startValue = array[i];
				}
				endValue = array[i];		
			}	
			result += formatString(startValue, endValue, "");
		} catch(err){
			error = err;
		}
    	callback(error, result);
    });
}

function formatString(startValue, endValue, separator){
	var glue = separator;
	if (glue === undefined){
		glue = ","
	}
	if (startValue != endValue){
		if (endValue - startValue > 1)
			return startValue + "-" + endValue + glue ; 
		return startValue + "," + endValue + glue
	}
	return startValue + glue; 
}