var $body = $('body');

(function ($) {
    $(function () {
        $(document).on({
            ajaxStart: function () { $body.addClass("modalLoading"); },
            ajaxStop: function () { $body.removeClass("modalLoading"); }
        });

        
        $(document).ready(async (e) => {
            ExibeModalAddAluno();
            await BuscaAlunos();
            await CadastrarAluno();

        });


        

        function ExibeModalAddAluno() {
            $('#btnAdicionarAluno').on("click", function () {
                $('#modalAdicionarAluno').modal("show");
            });

        }

        async function BuscaAlunos() {
            debugger
            let url = "../Aluno/RetornaGridAlunos";
            var gridData = await RequestAjax(url, "", "GET");

            $("#gridAlunos").html(gridData);
            $("#gridAlunos").show();
            HabilitarDataTableAluno();
        }

        async function CadastrarAluno() {
            $('#btnSaveAluno').click(async (e) => {

                let url = "../Aluno/CadastrarAluno";
                let objParam = {};
                objParam.Nome = $("#txtNomeAluno").val();
                objParam.Telefone = $("#txtTelefoneAluno").val();
                objParam.CpfAluno = $("#txtCpfAluno").val();
                objParam.Situacao = Number.parseInt($('#sitSelec').val());

                let saveAluno = await RequestAjax(url, objParam, "POST");

                alert("Aluno salvo com sucesso!");
                window.location.reload();
                return saveAluno;


            });
        }




        function HabilitarDataTableAluno() {
            $('#tableAluno')
                .on('init.dt', function () {
                    var that = $(this);

                    var count = that.DataTable().rows().count();

                    var paginate = $("#tableAluno_paginate");

                    var info = $("#tableAluno_info");

                    var tFotterRow = paginate.parent().parent();

                    tFotterRow.html('');

                    tFotterRow.addClass('small');

                    if (count > 10) {
                        tFotterRow.append($('<div class="col-12 d-flex align-items-center justify-content-center"></div >').append(paginate));
                        tFotterRow.append($('<div class="col d-flex align-items-center justify-content-end dataTable_info" id="table_dataTable_info"></div >')
                            .append($('<p class="text-primary font-weight-bolder"></p>').append(info.html()))
                        );
                    } else {
                        tFotterRow.append($('<div class="col-12 d-flex align-items-center justify-content-end dataTable_info" id="table_dataTable_info"></div >')
                            .append($('<p class="text-primary font-weight-bolder"></p>').append(info.html()))
                        );
                    }

                    var table = $('#tableAluno').DataTable();

                    $('#tableAluno_filter').hide();

                    $('#txtBuscaAluno').on('keyup', function () {
                        table.search(this.value).draw();
                    });

                    $('#txtCliente').trigger('click');



                })
                .DataTable(
                    {
                        "language": {
                            "url": window.initialState + "Scripts/Custom/datatables-pt-BR.json"
                        },
                        searching: true,
                        paging: true,
                        ordering: true,
                        pagingType: "full_numbers",
                        lengthChange: false,


                    });

        }

    });
})(jQuery);