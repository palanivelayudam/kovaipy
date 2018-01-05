/**
 * Created by Palani Velayudam on 20-Jan-17.
 */
$(function () {
    $('#subscribe').submit(function () {
        var fom = $(this);
        var inp = $(this).find('input');

        if (!valid_email_address($(inp).val())) {
            swal("Oops!", "Please make sure you enter a valid email address.", "error");
        }
        else {
            $.ajax({
                beforeSend: function () {
                    $()._loading_start();
                },
                url       : GLOBAL.BASE_URL + '/home/check',
                data      : $(fom).serialize(),
                type      : 'POST',
                success   : function (msg) {
                    var e = msg.split('|')[ 1 ];
                    if (msg.split('|')[ 0 ] == "success") {
                        swal("Wow!", e, "success");
                        $(inp).val("");
                        $()._loading_stop();
                    } else if (msg == '') {
                        swal("Oops!", 'Try again later', "error");
                    }
                    else {
                        $()._loading_stop();
                        swal("Oops!", msg, "error");
                    }
                }
            });
        }
        return false;
    });

});


/** Loading
 **************************************************************** **/
$.fn._loading_start = function () {
    $('body').waitMe({
        effect: 'win8_linear',
        text  : 'Please wait',
        bg    : 'rgba(0, 0, 0, 0.7)',
        color : '#FFFFFF',
        /* onClose: function() {
         alert(12)
         }*/
    });
};
$.fn._loading_stop = function () {
    $('body').waitMe('hide');
};
/** END Loading
 **************************************************************** **/

function valid_email_address(email) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(email);
}


$(function () {
    $('#subscribe_now').popover({
        placement: 'bottom',
        title    : 'Popover Form <a href="#" class="close" data-dismiss="alert">&times;</a>',
        html     : true,
        content  : $('#myForm').html()
    }).on('click', function () {
        // had to put it within the on click action so it grabs the correct info on submit
        $('.btn-dark').click(function () {
            var data = $('#email').val();
            var td = {"email": data}
            if (!valid_email_address(data)) {
                $('#email').css('border', "2px solid #ed1c40");
            } else {
                $('#email').css('border', "2px solid #ebebeb");
                $.ajax({
                    beforeSend: function () {
                        $()._loading_start();
                    },
                    url       : 'check.php',
                    data      :td,
                    type      : 'POST',
                    success   : function (msg) {
                        var e = msg.split('|')[ 1 ];
                        if (msg.split('|')[ 0 ] == "success") {
                            swal("Wow!", e, "success");
                            $('#email').val('');
                            $()._loading_stop();
                            $("#subscribe_now").popover('hide');
                        } else if (msg == '') {
                            swal("Oops!", 'Try again later', "error");
                            $("#subscribe_now").popover('hide');
                        }
                        else {
                            $()._loading_stop();
                            $("#subscribe_now").popover('hide');
                            swal("Oops!", msg, "error");
                        }
                    }
                });
            }


            /*
             $.post('', {
             email : $('#email').val(),
             name  : $('#name').val(),
             gender: $('#gender').val()
             }, function (r) {
             $('#pops').popover('hide')
             $('#result').html('resonse from server could be here')
             })*/
        })
    });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
        $(this).parents(".popover").prev().trigger('click')
    });
});
