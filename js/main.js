function generateSuccess(source, parent = '') {
	var result = '';

	$.each(source, function(key, element) {
		if($.isNumeric(element)) {
			type = 'number';
		}
		else if($.isPlainObject(element)) {
			type = 'object[]';
		}
		else if($.isArray(element)) {
			type = 'array[]';
		}
		else {
			type = 'string';
		}

		if($.isNumeric(key) === false)
			result += $('#prefix').val()+'@apiSuccess {'+type+'} '+(parent !== ''?parent+'.':'')+key+'\r\n';

		if(type === 'object[]' || type === 'array[]') {
			var parent_string = parent !== '' ? parent : '';
			parent_string += parent !== '' && $.isNumeric(key) === false ? '.' : '';
			parent_string += $.isNumeric(key) === false ? key : '';

			result += generateSuccess(element, parent_string);
		}

		if($.isNumeric(key) === true)
			return false;
	});

	return result;
}

$(function(){
	new Clipboard('#copy');

	$("#generate").click(function() {
		countLine = 0;

		try {
			var source = JSON.parse($( "#source" ).val());
			$("#error").addClass('hide');
			$("#result").val(generateSuccess(source));
		} catch (e) {
			$("#error").removeClass('hide');
		}
	});
});