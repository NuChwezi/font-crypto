
function transform_chaos(src,target,reverse){
    var v_alphabet = 'aeiou'.split('');
    var v_al_mirror = 'uoiea'.split('');
    var vu_alphabet = 'AEIOU'.split('');
    var vu_al_mirror = 'UOIEA'.split('');
    var l_alphabet = [];
    var l_al_mirror = [];
    var u_alphabet = [];
    var u_al_mirror = [];

    for(var l='a'.charCodeAt(0); l <= 'z'.charCodeAt(0); l++){
        var s = String.fromCharCode(l);
        var S = s.toUpperCase();
        if(v_alphabet.indexOf(s) >= 0) {// a vowel
            l_alphabet.push(s);
            u_alphabet.push(S);
            var _s = v_al_mirror[v_alphabet.indexOf(s)];
            var _S = _s.toUpperCase();
            l_al_mirror.push(_s);
            u_al_mirror.push(_S);
        }else {
            l_alphabet.push(s);
            l_al_mirror.push(s);
            u_alphabet.push(S);
            u_al_mirror.push(S);
        }
    }

    for(var i=0; i < l_al_mirror.length * 0.5; i++){
        var t = l_al_mirror[i];
        var _t = l_al_mirror[l_al_mirror.length-1-i];
        if((v_alphabet.indexOf(t) < 0 ) && (v_alphabet.indexOf(_t) < 0 )) {// skip vowel
            l_al_mirror[i] = _t;
            l_al_mirror[l_al_mirror.length-1-i] = t;

            var T = u_al_mirror[i];
            u_al_mirror[i] = u_al_mirror[u_al_mirror.length-1-i];
            u_al_mirror[u_al_mirror.length-1-i] = T;
        }
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
        case 'chaos': {
            transform_chaos('#in','#out',false);
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
        case 'chaos': {
            transform_chaos('#out','#in',false);
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
            case 'chaos': 
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


	$('#toggle-out-pop').click(function(){
        var src = $('#out');
        var val = $(src).val();
        var i = val.indexOf('\n');
        var title = val.substring(0, i >= 0 ? i : 9);
        var w = window.open('', title, 'width=400,height=400,resizeable,scrollbars');
        var out = '<html><head><title>'+ title +'</title><link rel="stylesheet" href="css/crypto.css"></head><body>';
        out += '<div id="out" style="width:100%;height:100%;font-family:'+ $(src).css('font-family') +'; font-size:'+ $(src).css('font-size') +'" >' + val.replace(/\n/g,"<br/>") + '</div>';
        out += '</body></html>';
        w.document.write(out);
        w.document.close();

        ga('send', 'event', 'button', 'click', 'export-popup');
    });

	$('#toggle-out-image').click(function(){
        html2canvas($("#out"), {
            onrendered: function(canvas) {
                $('#snapshots').empty();
                $('#snapshots').append($('<div>', { 'class': 'col-md-5' }).append( canvas )); 

                canvas.toBlob(function(blob) {
                    var val = $('#out').val();
                    var i = val.indexOf('\n');
                    var title = val.substring(0, i >= 0 ? i : 9);
                    saveAs(blob, title +".png"); 
                });
            }
        });

        ga('send', 'event', 'button', 'click', 'export-image');

	});

	$('textarea').autosize();  
});
}(jQuery));

