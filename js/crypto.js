(function($) {
$(document).ready(function() {

	$('#toggle-font').change(function(){
		$('#out').css({ 'font-family': $(this).val() });
	});

	$('#encode').click(function(){
		$('#out').val($('#in').val()).trigger('autosize.resize');
		$('#in').focus();
        ga('send', 'event', 'button', 'click', 'encode');
	});

	$('#decode').click(function(){
		$('#in').val($('#out').val()).trigger('autosize.resize');
		$('#out').focus();
        ga('send', 'event', 'button', 'click', 'decode');
	});

	$('#toggle-encode').click(function(){
		$('#in').toggle();
	});

	$('#toggle-decode').click(function(){
		$('#out').toggle();
	});

	$('#toggle-out-image').click(function(){
		// $('#out').toggle();

        html2canvas($("#out"), {
            onrendered: function(canvas) {
                $('#snapshots').empty();
                $('#snapshots').append($('<div>', { 'class': 'col-md-5' }).append( canvas )); 

                canvas.toBlob(function(blob) {
                    saveAs(blob, "Encoded.png"); 
                });
            }
        });

        ga('send', 'event', 'button', 'click', 'export-image');

	});

	$('textarea').autosize();  
});
}(jQuery));

