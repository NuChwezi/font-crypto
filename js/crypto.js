function transform_mirror(src,target,reverse){
    var l_alphabet = [];
    var l_al_mirror = [];
    var u_alphabet = [];
    var u_al_mirror = [];

    for(var l='a'.charCodeAt(0); l <= 'z'.charCodeAt(0); l++){
        var s = String.fromCharCode(l);
        var S = s.toUpperCase();
        l_alphabet.push(s);
        l_al_mirror.push(s);
        u_alphabet.push(S);
        u_al_mirror.push(S);
    }

    for(var i=0; i < l_al_mirror.length * 0.5; i++){
        var t = l_al_mirror[i];
        l_al_mirror[i] = l_al_mirror[l_al_mirror.length-1-i];
        l_al_mirror[l_al_mirror.length-1-i] = t;

        var T = u_al_mirror[i];
        u_al_mirror[i] = u_al_mirror[u_al_mirror.length-1-i];
        u_al_mirror[u_al_mirror.length-1-i] = T;
    }

    var _in = $(src).val();
    var _out = _in.split("").map(function(c){ 
        if(reverse){
            var _c = u_al_mirror.indexOf(c) >= 0 ? u_al_mirror[u_alphabet.indexOf(c)] : (l_al_mirror.indexOf(c) >= 0 ? l_al_mirror[l_alphabet.indexOf(c)] : c); 
            return _c;
        }else{
            var _c = l_al_mirror.indexOf(c) >= 0 ? l_al_mirror[l_alphabet.indexOf(c)] : (u_al_mirror.indexOf(c) >= 0 ? u_al_mirror[u_alphabet.indexOf(c)] : c); 
            return _c;
        }
    }).join("");
    
    $(target).val(_out);
}

function transform(){
    var target = $('#toggle-font').val();
    switch(target){
        case 'mirrors': {
            transform_mirror('#in','#out',false);
            break;
        }
    }
}

function untransform(){
    var target = $('#toggle-font').val();
    switch(target){
        case 'mirrors': {
            transform_mirror('#out','#in',true);
            break;
        }
    }
}

(function($) {
$(document).ready(function() {

	$('#toggle-font').change(function(){
        var target = $(this).val();
        ga('send', 'event', 'font', 'change', target);
        switch(target){
            case 'mirrors': {
                $('#out').css({ 'font-family': $('#toggle-font option:checked').data('f') });
                transform();
                break;
            }
            default: {
                $('#out').css({ 'font-family': target });
            }
        }
	});

	$('#encode').click(function(){
		$('#out').val($('#in').val()).trigger('autosize.resize');
		$('#in').focus();
        transform();
        ga('send', 'event', 'button', 'click', 'encode');
        ga('send', 'event', 'font', 'encode', $('#toggle-font').val());
	});

	$('#decode').click(function(){
		$('#in').val($('#out').val()).trigger('autosize.resize');
		$('#out').focus();
        untransform();
        ga('send', 'event', 'button', 'click', 'decode');
        ga('send', 'event', 'font', 'decode', $('#toggle-font').val());
	});

	$('#font-increase').click(function(){
        $('#out').css({'font-size': Number($('#out').css('font-size').replace("px",""))+1});
    });
	$('#font-decrease').click(function(){
        $('#out').css({'font-size': Number($('#out').css('font-size').replace("px",""))-1});
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

