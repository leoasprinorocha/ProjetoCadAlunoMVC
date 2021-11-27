var $body = $('body');

(function ($) {
    $(function () {
        $(document).on({
            ajaxStart: function () { $body.addClass("modalLoading"); },
            ajaxStop: function () { $body.removeClass("modalLoading"); }
        });


        ExibeModalAddAluno();

        function ExibeModalAddAluno() {
            $('#btnAdicionarAluno').on("click", function () {
                $('#modalAdicionarAluno').modal("show");
            });

        }



    });
})(jQuery);