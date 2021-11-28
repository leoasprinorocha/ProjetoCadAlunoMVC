
var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Aguarde...';
var retorno = true;
var controller_Action = $("#hfController_Action").val();

var displayMessage = function (message, msgType) {
    $.toaster({ priority: msgType, title: 'Aviso', message: message });
};

$(window).on('load', function () {
    $body = $("body");
    $(document).on({
        ajaxStart: function () { $body.addClass("loading"); },
        ajaxStop: function () { $body.removeClass("loading"); }
    });

    $(document).on("click", "#btnPesquisar", function () {

        var numLigacao = $("#txtNumLigacao").val();
        var IdContrato = $("#txtIdContrato").val();
        var Documento = $("#txtDocumento").val();

        var cont_contrato = IdContrato !== '' && IdContrato !== '0';

        if (numLigacao === '' && (IdContrato === '' || IdContrato === '0') && Documento === '') {
            displayMessage("Favor inserir um parâmetro para pesquisa", "info");
            return;
        }

        if (Documento !== '') {
            $("#txtNumLigacao").val('');
            $("#txtIdContrato").val('');
        }

        if (cont_contrato) {

            $.ajax({
                url: "../IdentificacaoCliente/GetMatriculaContratoOld",
                data: { id_contrato: IdContrato },
                type: "POST",
                async: true
            }).done(function (data) {
                a = true;

                if (data.notFound) {
                    displayMessage("Cliente não encontrado! Verifique os dados informados!", "warning");
                }
                else if (data.length === 10) {
                    carregaControle(data, false, false, true, true);
                }
                else {
                    $("#divDadosCadastrais").html("");
                    $("#divDadosCadastrais").html(data);

                    $("#detalhes_cadastro").hide();

                    $('#icon_detail').click(function () {
                        if ($("#detalhes_cadastro").is(":hidden")) {
                            dados_cadastrais();
                        } else {
                            esconde_dados_cadastrais();
                        }
                    });

                    $("#hfContrato").val("");
                    $("#hfContratoInativo").val($("#txtIdContrato").val());

                    $("#txtDocumento").val($("#hfCPFCNPJ").val());
                    $('#hfclienteValido').prop('checked', true);

                    getDadosGenerico('', $("#txtIdContrato").val(), controller_Action, true, 0);

                    $("#txtNumLigacao").prop('readonly', true);
                    $("#txtIdContrato").prop('readonly', true);
                    $("#txtDocumento").prop('readonly', true);

                    $("#btnPesquisar").addClass('linkdisabled');

                    mascaraDocumento();
                }
            });
        }
        else if ($("#txtNumLigacao").val() !== '') {

            numLigacao = pad(numLigacao, 10);

            carregaControle(numLigacao, false, false, true, true);
        }

        else {

            $.ajax({
                url: "../IdentificacaoCliente/GetContratoPorDocumento",
                data: { documento: Documento },
                type: "POST",
                async: true
            }).done(function (lista_contratos) {
                a = true;

                if (lista_contratos !== '') {

                    var lista = lista_contratos.split(',');

                    if (lista.length > 1) {
                        $("#txtIdContrato").val(lista_contratos);
                        carregaControlePorContrato(lista_contratos, false, false, true);

                        getDadosResponsavel(Documento.replace(/\D/g, ''));
                    }
                    else {

                        $.ajax({
                            url: "../IdentificacaoCliente/GetMatriculaContrato",
                            data: { id_contrato: lista_contratos },
                            type: "POST",
                            async: true
                        }).done(function (data) {
                            a = true;

                            if (data.notFound) {
                                displayMessage("Cliente não encontrado! Verifique os dados informados!", "warning");
                            }
                            else if (data.length === 10) {

                                carregaControle(data, false, false, true, true);
                            }
                            else {
                                $("#txtIdContrato").val(lista_contratos);

                                $("#divDadosCadastrais").html("");
                                $("#divDadosCadastrais").html(data);

                                $("#detalhes_cadastro").hide();

                                $('#icon_detail').click(function () {
                                    if ($("#detalhes_cadastro").is(":hidden")) {
                                        dados_cadastrais();
                                    } else {
                                        esconde_dados_cadastrais();
                                    }
                                });

                                $("#hfContrato").val("");
                                $("#hfContratoInativo").val($("#txtIdContrato").val());

                                $("#txtDocumento").val($("#hfCPFCNPJ").val());
                                $('#hfclienteValido').prop('checked', true);

                                getDadosGenerico('', $("#txtIdContrato").val(), controller_Action, true, 0);
                                $("#txtNumLigacao").prop('readonly', 'readonly');
                                $("#txtIdContrato").prop('readonly', 'readonly');
                                $("#txtDocumento").prop('readonly', 'readonly');

                                $("#btnPesquisar").addClass('linkdisabled');
                                $("#txtDocumento").prop('readonly', 'readonly');
                                mascaraDocumento();
                            }
                        });
                    }
                }
                else {
                    displayMessage("Documento não encontrado na base de dados.", "warning");
                }
            });
        }
    });

    habilitarMascaras();

    if ($("#hfContrato").val() === '') {
        $("#formCheck-2").prop('checked', true);
        $("#formCheck-1").prop('readonly', 'readonly');
    }

    if ($("#hfContratoInativo").val() === '') {
        $("#formCheck-1").prop('checked', true);
        $("#formCheck-2").prop('readonly', 'readonly');
    }

    ImprimirCertidao();
    LiberarNegociacao();
});

var mascaraDocumento = function () {

    if ($("#txtDocumento") !== '') {
        var tamanho = $("#txtDocumento").val().replace(/\D/g, '').length;
        if (tamanho > 11) {
            $("#txtDocumento").mask("99.999.999/9999-99");
        }
        else {
            $("#txtDocumento").mask("999.999.999-99");
        }
    }
};

var pad = function (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};

var setEventLimpar = function () {

    var controller_Action = $("#hfController_Action").val();
    controller_Action = controller_Action.replace('../', '');
    var x = controller_Action.split('/');

    var act = x[1];

    var url = '';

    var params = {};

    var search = window.location.search.replace('?', '').split('&');

    $.each(search, function (index, param) {
        var item = param.split("=");
        params[item[0]] = item[1];
    });

    url = act + '?menu=' + params['menu'] + '&idmodrot=' + params['idmodrot'] + '&idrot=' + params['idrot'] + '&idusuario=' + params['idusuario'];

    $('#btnLimpar').attr("href", url);

    if (x[1] !== "SegundaViaConta") {
        $("#divSeqOriginal").hide();
    }
};

var carregaControle = function (matricula, cached, v, fireEvent, sitcontrato) {

    var contratos = $("#hfContratos").val();

    $.when($.ajax({
        url: "../IdentificacaoCliente/Index",
        data: { matricula: matricula, contratos: contratos, cache: cached, sitcontrato: sitcontrato },
        type: "GET",
        async: true
    })).done(function (data) {
        a = true;

        if (matricula !== '') {
            $("#divIdentificacaoCliente").html(data).slideDown(50, function () {
                $('html, body').delay('50').animate({
                    scrollTop: $(this).offset().top - 150
                }, 50);
            });

            if (v) {
                setEventDetalhes();
            }

            if ($('#hfclienteValido').prop('checked') && matricula !== null) {
                getDadosCadastrais(matricula);
            }

            if (fireEvent) {

                var contrato = $("#txtIdContrato").val();
                getDadosGenerico(matricula, contrato, controller_Action, true, null);
            }
        }

        desabilitaCampos();
        setEventLimpar();
        mascaraCPFCNPJ();
        $("#hfMatricula").val(matricula);

        mascaraDocumento();
        LiberarNegociacao();
        if (getQuerystringByName("matricula") !== '') {
            $('#btnLimpar').addClass("linkdisabled");
        }
    });
};

function carregaControleVazio(matricula, cached) {

    $.ajax({
        url: "../IdentificacaoCliente/Index",
        data: { matricula: matricula, contratos: '', cache: cached, isContrato: false, sitcontrato: false },
        type: "GET",
        async: false
    }).done(function (data) {
        a = true;

        $("#divIdentificacaoCliente").html(data).slideDown(50, function () {
            $('html, body').delay('50').animate({
                scrollTop: $(this).offset().top - 150
            }, 50);
        });

        setEventLimpar();
        mascaraCPFCNPJ();
        LiberarNegociacao();
    });
}

function getDadosCadastrais(id) {


    $.ajax({
        data: { matricula: id, cache: true },
        url: "../IdentificacaoCliente/_DadosCadastrais",
        type: "POST",
        async: true
    }).done(function (data) {
        a = true;

        $("#divDadosCadastrais").html("");
        $("#divDadosCadastrais").html(data);

        $("#detalhes_cadastro").hide();

        $('#icon_detail').click(function () {
            if ($("#detalhes_cadastro").is(":hidden")) {
                dados_cadastrais();
            } else {
                esconde_dados_cadastrais();
            }
        });
        LiberarNegociacao();

    });
}

function getDadosResponsavel(id) {

    $.ajax({
        data: { documento: id },
        url: "../IdentificacaoCliente/GetResponsavelContrato",
        type: "POST",
        async: true
    }).done(function (data) {
        a = true;

        $("#divDadosCadastrais").html("");
        $("#divDadosCadastrais").html(data);

        $("#detalhes_cadastro").hide();
        $('#icon_detail').prop("disabled", "disabled");
        $('#icon_detail').addClass('linkdisabled');
        LiberarNegociacao();

    });
}

function carregaControlePorContrato(contratos, cached, v, fireEvent) {

    var matricula = '';

    $.ajax({
        url: "../IdentificacaoCliente/Index",
        data: { matricula: matricula, cache: cached, contratos: contratos, sitcontrato: true },
        type: "GET",
        async: true
    }).done(function (data) {
        a = true;

        $("#divIdentificacaoCliente").html("");
        $("#divIdentificacaoCliente").html(data);

        if (contratos !== null) {

            $("#txtNumLigacao").prop('readonly', 'readonly');
            $("#txtIdContrato").prop('readonly', 'readonly');
            $("#txtDocumento").prop('readonly', 'readonly');

            $("#btnPesquisar").addClass('linkdisabled');
        }

        if (v) {
            setEventDetalhes();
        }

        if (fireEvent) {
            getDadosGenerico(matricula, contratos, controller_Action, true, null);
        }
        else {

            if ($("#txtNumLigacao").val() === '' && $("#txtDocumento").val() !== '') {

                if ($("#divDadosCadastrais").html.length === 1) {
                    var documento = $("#txtDocumento").val().replace(/\D/g, '');
                    getDadosResponsavel(documento);
                }
            }
        }

        setEventLimpar();
        mascaraDocumento();
        LiberarNegociacao();
    });
}

var desabilitaCampos = function () {

    if ($("#txtNumLigacao").val() !== '' || $("#txtDocumento").val() !== '') {

        $("#txtNumLigacao").prop('readonly', 'readonly');
        $("#txtIdContrato").prop('readonly', 'readonly');
        $("#txtDocumento").prop('readonly', 'readonly');

        $("#btnPesquisar").addClass('linkdisabled');
    }
};

function getDadosGenerico(matricula, contratos, controllerAction, v, situacaoctr) {

    try {

        //chamada feita pelo controle de matricula, carrega a action chamada inicialmente pela controller
        $.ajax({
            url: controllerAction,
            data: { matricula: matricula, contratos: contratos, situacaoctr: situacaoctr },
            type: "POST",
            async: true
        }).done(function (data) {
            a = true;

            $("#resultAjax").html('');
            $("#resultAjax").html(data);

            if (v) {
                setEventDetalhes();
            }

            if (!$('#hfclienteValido').prop('checked')) {
                $("#resultadox").hide();
                displayMessage("Cliente não encontrado! Verifique os dados informados!", "warning");
            }

            else {
                if ($('#resultado').length <= 0) {

                    $("#resultadox").show();
                    displayMessage("Não há débitos para este cliente!", "info");
                }
            }
            LiberarNegociacao();
        });

    } catch (ex) {
        $.toaster({ priority: 'danger', title: 'Aviso', message: ex.message });
    }
}

function LiberarNegociacao() {

    let contratos = $('#txtIdContrato').val();

    if (contratos != undefined) {

        let todosContratos = $('#txtIdContrato').val().split(',');

        let contratoInativo = $('#formCheck-1').prop('checked');

        let aceitaNegociacao = (todosContratos.length == 1 && contratoInativo == true);

        if (aceitaNegociacao == true) {
            $('#btnPacelamento').off().on('click', () => {
                AbrirParcelamento();
            });
            $('#btnQuitacao').off().on('click', () => {
                AbrirQuitacao();
            });
        }
        else {
            const mensagem = "Os procedimentos de parcelamento e quitação só estão disponíveis para contratos ativos e selecionados de forma exclusiva";

            $('#divNegociacao').html('');

            $('#divNegociacao').html(mensagem);
        }
    }
}

function setEventDetalhes() {

    $(document).on("click", "#btnDetalhesConta", function () {

        console.log("clicou");

        var matricula = $(this).data("matricula");
        var id = $(this).data("id");
        var all_tr = $('tr');

        all_tr.removeClass('selected');
        $(this).closest('tr').addClass('selected');

        carregaDetalhesConta(matricula, id);
        fechar_detalhes();
    });

    eventoCheckItem();
    eventoCheckTodos();
    impressaoConsultaDebitos();
    email();
    whats();
    mascaratelefone();

    if ($('#hfCheckLines').val() !== '') {
        var lista_seq_original = $('#hfCheckLines').val();
        checkList(lista_seq_original);
    }

    $('#eye').click(function () {

        var clicado = $(".contratos").css('display') === 'table-cell';

        exibeHeaderContrato(clicado);

        $.ajax({
            data: { checado: !clicado },
            url: "SetSessionEye",
            type: "POST",
            error: function () {
            }
        });
    });

    $('.clickSituacao').change(function () {

        var id = $(this).attr("id");
        var numLigacao = $("#txtNumLigacao").val();
        var IdContrato = $("#hfContrato").val();
        var IDsContratos = $("#hfContratoInativo").val();
        var idUsuario = $("#hfId_Usuario").val();

        $.ajax({
            data: { id: id },
            url: "SetSessionCtr",
            type: "POST",
            success: function (msg) {
                $('#hfIdSitContrato').val(msg);
            }
        });

        if (id === 'formCheck-1') {

            var url1 = window.location.origin + window.location.pathname + "?MATRICULA=" + numLigacao + "&CONTRATOS=" + IdContrato + "&idusuario=" + idUsuario + "&situacaoctr=1";
            window.location.href = url1;

            $("#txtIdContrato").val(IdContrato);
        }

        else {
            var url = window.location.origin + window.location.pathname + "?MATRICULA=" + numLigacao + "&CONTRATOS=" + IDsContratos + "&idusuario=" + idUsuario + "&situacaoctr=0";
            window.location.href = url;

            $("#txtIdContrato").val(IDsContratos);
        }
    });

    var x = getQuerystringByName("situacaoctr");

    if ($("#hfContrato").val() === '') {

        $("#formCheck-2").prop('checked', true);
        $("#formCheck-1").prop('disabled', 'disabled');
    }

    if ($("#hfContratoInativo").val() === '') {

        $("#formCheck-1").prop('checked', true);
        $("#formCheck-2").prop('disabled', 'disabled');
    }

    if ($("#hfContrato").val() !== '' && $("#hfContratoInativo").val() !== '') {
        marcaSituacaoContrato($('#hfIdSitContrato').val());

        var qsSitContrato = getQuerystringByName("situacaoctr");
        if (qsSitContrato !== '') {

            $(qsSitContrato === '1' ? "#formCheck-1" : "#formCheck-2").prop('checked', 'checked');
        }
    }
}

var getQuerystringByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function exibeHeaderContrato(clicked) {

    if (clicked) {
        $('#eye').css({ color: '#6c757d' });
        $(".contratos").css({ 'display': 'none' });
    }
    else {
        $('#eye').css({ color: '#0089E1' });
        $(".contratos").css({ 'display': 'table-cell' });
    }
}

var checkList = function (listaSeq) {

    var array_seq = listaSeq.split(',');

    for (var i = 0; i < array_seq.length; i++) {

        if ($('#conta_' + array_seq[i]).length > 0) {
            $('#conta_' + array_seq[i]).prop('checked', true);
        }
    }
};

var eventoCheckItem = function () {

    $('.checkConta').change(function () {
        var seq = $(this).data("id");
        var check = this.checked;

        $.ajax({
            data: { seqoriginal: seq, check: check },
            url: "ControleListaSeq",
            type: "POST",
            success: function (msg) {

                $('#hfCheckLines').val(msg);
            }
        });

        var todos = $('#checkTodos').prop('checked');
        if (!check && todos) {
            $('#checkTodos').prop('checked', false);
        }
    });
};

var marcaSituacaoContrato = function (id) {

    if (id === '') {
        $('#formCheck-1').prop('checked', true);
    }
    else {
        $('#' + id).prop('checked', true);
    }
};

var eventoCheckTodos = function () {

    $('#checkTodos').change(function () {

        var idusuario = $("#hfId_Usuario").val();
        //var matricula = $(this).data("matricula");
        var matricula = $('#txtNumLigacao').val();

        $.ajax({
            data: { matricula: matricula, checado: this.checked, idusuario: idusuario },
            url: "SetSession",
            type: "POST",
            async: true
        }).done(function (data) {
            a = true;

            $('.checkConta').prop('checked', $('#checkTodos').prop('checked'));
            $('#hfCheckLines').val(data);
        });
    });
};

var fechar_detalhes = function () {
    $("#detalhesconta").hide();
    $('html, body').animate({ scrollTop: $('body').offset().top }, 'slow');
};

var impressaoConsultaDebitos = function () {

    $(function () {
        $(document).on("click", "#btnImprimir", function () {

            try {

                var tipoImpressao = $('#tipoImpressao').val();
                var matricula = $('#txtNumLigacao').val();
                var idx = $('#hfId_Usuario').val();
                var lista_seq = $('#hfCheckLines').val();

                if (lista_seq === '') {
                    $.toaster({ priority: 'warning', title: 'Aviso', message: "Nenhum débito foi selecionado!" });
                    return;
                }

                //TIPO DA IMPRESSAO
                if (tipoImpressao === "0") {

                    var urlRelDebito = "RelatorioDebitos?lista_seq=" + lista_seq + "&idusuario=" + idx + "&matricula=" + matricula;
                    $.fileDownload(urlRelDebito);
                }

                else {

                    var urlImpSegVia = "ImpressaoSegundaVia?lista_seq=" + lista_seq + "&idusuario=" + idx + "&matricula=" + matricula;
                    $.fileDownload(urlImpSegVia);
                }

                $.toaster({ priority: 'warning', title: 'Aviso', message: "Aguarde a impressão do seu documento" });

            } catch (ex) {

                $.toaster({ priority: 'warning', title: 'Aviso', message: ex.message });
            }
        });
    });
};

//funcao do caderninho do grid
function carregaDetalhesConta(matricula, seqoriginal) {

    var idusuario = $("#hfId_Usuario").val();

    $.ajax({
        url: "../Atendimento/DetalhesConta",
        data: { matricula: matricula, seqoriginal: seqoriginal, idusuario: idusuario },
        type: "GET",
        async: true,
        error: function (data) {
            $.toaster({ priority: 'danger', title: 'Alerta', message: data });

        }
    }).done(function (data) {
        a = true;

        $("#detalhesconta").html(data).slideDown(50, function () {
            $('html, body').delay('50').animate({ scrollTop: $(this).offset().top }, 50);
        });

        toolTipContas();
    });
}

var toolTipContas = function () {

    $('a').each(function () {

        if ($(this).hasClass('showPanel')) {

            var panel = $(this).data("panel");

            if ($(panel).length <= 0) {
                $(this).removeClass('holders');
                $(this).addClass('hiden');
            }
        }
    });

    $(".showPanel").on('mouseleave', function () {

        var panel = $(this).data("panel");
        $(panel).hide();
    });

    $(".showPanel").on("mouseover", function (event) {

        event.preventDefault();
        var panel = $(this).data("panel");

        $(panel).show().css({
            bottom: event.pageX - $(this).top + $(this).height() + 20
        });
    });
};

function dados_cadastrais() {
    $("#coldadoscadastrais").css("position", 'absolute');
    $("#coldadoscadastrais").css("zIndex", 999);
    $("#detalhes_cadastro").show();
    $("#imgDetalheCadastral").css("transform", "rotate(270deg)");
}

function esconde_dados_cadastrais() {
    $("#coldadoscadastrais").css("zIndex", 5);
    $("#coldadoscadastrais").css("position", 'inherit');
    $("#detalhes_cadastro").hide();
    $("#imgDetalheCadastral").css("transform", "");
}

var email = function () {

    $(document).on("click", "#btnEmail", function () {

        var docs = $("#hfCheckLines").val();

        if (docs === '') {
            displayMessage("Nenhum débito foi selecionado!", "warning");
            return;
        }

        $("#modalEmail").modal('show');
    });

    $("#modalEmail").on("click", "#btnEnviarEmail", function () {

        var $this = $(this);
        var emailEnvio = $("#txtEmailEnvio").val();
        var idusuario = $("#hfId_Usuario").val();
        var tipoImpressao = $('#tipoImpressao').val();
        var docsx = $("#hfCheckLines").val();

        if ($(this).html() !== loadingText) {
            $this.data('original-text', $(this).html());
            $this.html(loadingText);
            $this.prop('disabled', 'disabled');
        }

        var finalEmail = emailEnvio;

        if (emailEnvio === '') {
            displayMessage("Favor inserir um e-mail para envio!", "warning");
            return;
        }

        if (isValidEmailAddress(emailEnvio)) {
            displayMessage("Por gentileza verifique o campo de e-mail!", "warning");
            return;
        }

        $.ajax({
            data: { lista_seq: docsx, email: finalEmail, idusuario: idusuario, tipoRel: tipoImpressao },
            url: "../Atendimento/EnvioEmail",
            type: "POST",
            async: true,
            error: function (msg) {
                $.toaster({ priority: 'danger', title: 'Erro', message: msg });
            }
        }).done(function (data) {
            a = true;

            if (data === true) {
                displayMessage("Envio concluído, em alguns instantes o e-mail irá chegar no endereço informado!", "success");
                $this.html($this.data('original-text'));
                $this.prop('disabled', '');

                $("#modalEmail").modal('hide');
            }
            else {
                displayMessage("Um erro ocorreu!", "danger");
                $this.html($this.data('original-text'));
                $this.prop('disabled', '');
            }
        });


    });

    $('#modalEmail').on('hidden.bs.modal', function (e) {
        e.preventDefault();
        $("#txtEmailEnvio").val("");
    });
};

var whats = function () {

    $(document).on("click", "#btnWhats", function () {

        var docsEmail = $("#hfCheckLines").val();

        if (docsEmail === '') {
            displayMessage("Nenhum débito foi selecionado!", "warning");
            return;
        }

        $("#modalWhats").modal('show');
        habilitarMascaras();

    });

    $("#modalWhats").on("click", "#btnEnviarWhats", function () {

        var docsEnviarW = $("#hfCheckLines").val();
        var telEnvio = $("#txtTelefoneEnvio").val();
        var idusuario = $("#hfId_Usuario").val();
        var numLigacao = $("#txtNumLigacao").val();
        var tipoImpressao = $('#tipoImpressao').val();

        var $this = $(this);

        if ($(this).html() !== loadingText) {
            $this.data('original-text', $(this).html());
            $this.html(loadingText);
            $this.prop('disabled', 'disabled');
        }

        if (telEnvio === '') {
            $.toaster({ priority: 'warning', title: 'Aviso', message: "Favor inserir um telefone de envio!" });
            return;
        }

        $.ajax({
            data: { matricula: numLigacao, lista_seq: docsEnviarW, idusuario: idusuario, tipoRel: tipoImpressao, id_rotina: 4 },
            url: "../Atendimento/MensagemWhatsApp",
            type: "POST",
            async: true,
            error: function (msg) {
                $.toaster({ priority: 'danger', title: 'Erro', message: msg });
            }
        }).done(function (data) {
            a = true;
            telEnvio = telEnvio.replace(/\D/g, '');

            var url = "https://api.whatsapp.com/send?phone=55" + telEnvio + "&text=" + data;

            $.toaster({ priority: 'success', title: 'Informação', message: "Processo concluído, siga os passos do aplicativo para confirmar o envio!" });
            $this.html($this.data('original-text'));
            $this.prop('disabled', '');

            $("#modalWhats").modal('hide');

            window.open(url, "_blank");
        });
    });

    $('#modalWhats').on('hidden.bs.modal', function (e) {
        e.preventDefault();
        $("#txtTelefoneEnvio").val("");
    });
};

function AbrirParcelamento() {

    let Obj = {};
    var idUsuario = $("#hfId_Usuario").val();

    Obj.idusuario = idUsuario;
    Obj.IdRotina = 8;
    Obj.Titulo = "Parcelamento";
    var matricula = $("#txtNumLigacao").val();

    Obj.Url = `${window.initialState.urlHome}atendimento/Parcelamento?MATRICULA=${matricula}&CPFCNPJ=${txtDocumento}&idmodrot=1&contrato=${txtIdContrato}`;

    window.parent.postMessage(Obj, '*');
}

function AbrirQuitacao() {

    let Obj = {};
    var idUsuario = $("#hfId_Usuario").val();
    var txtDocumento = $("#txtDocumento").val();
    var txtIdContrato = $("#txtIdContrato").val();
    var matricula = $("#txtNumLigacao").val();

    Obj.idusuario = idUsuario;
    Obj.IdRotina = 4;
    Obj.Titulo = "Quitação de Débitos";

    Obj.Url = `${window.initialState.urlHome}atendimento/QuitacaoDebito?MATRICULA=${matricula}&CPFCNPJ=${txtDocumento}&idmodrot=1&contrato=${txtIdContrato}`;

    window.parent.postMessage(Obj, '*');

}