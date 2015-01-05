(function($) {
$(document).ready(function() {
	$('#encode').click(function(){
		$('#out').val($('#in').val()).trigger('autosize.resize');
		$('#in').focus();
	});

	$('#decode').click(function(){
		$('#in').val($('#out').val()).trigger('autosize.resize');
		$('#out').focus();
	});


	$('#toggle-encode').click(function(){
		$('#in').toggle();
	});

	$('#toggle-decode').click(function(){
		$('#out').toggle();
	});

	$('textarea').autosize();  
});
}(jQuery));

