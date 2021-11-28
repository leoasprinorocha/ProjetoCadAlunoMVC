var mascaraCPFCNPJ = function () {
    
    $(".mascara-cpfcnpj").bind({
        paste: function () {
            try {
                $(this).unmask();
            } catch (e) { alert(e); }
        },
        focusout: function () {
            
            $(this).unmask();
            var tamanho = $(this).val().replace(/\D/g, '').length;
            if (tamanho === 11) {
                $(this).mask("999.999.999-99");
            }
            else {
                $(this).mask("99.999.999/9999-99");
            }
        },
        change: function () {
            var valor = $(this).val();

            if (valor !== '') {
                if (!valida_cpf_cnpj(valor)) {

                    displayMessage("Cliente não encontrado! Verifique os dados informados!", "danger");
                    $(this).focus();
                    $("#btnPesquisar").addClass('linkdisabled');

                }
                else {
                    $("#btnPesquisar").removeClass('linkdisabled');
                }
            }
            else {
                $("#btnPesquisar").removeClass('linkdisabled');
            }
        }
    });

    $(".mascara-cpfcnpj").keydown(function (e) {
        
        try {
            $(this).unmask();
        } catch (ex) { alert(ex); }

        var tamanho = $(this).val().replace(/\D/g, '').length + 1;
        var tecla = window.event ? event.keyCode : e.which;

        if (tamanho <= 11) {
            $(this).mask("999.999.999-99");
        } else {
            $(this).mask("99.999.999/9999-99");
        }

        // ajustando foco
        var elem = $(this);
        setTimeout(function () {
            // mudo a posição do seletor
            elem.selectionStart = elem.selectionEnd = 10000;
        }, 0);

        var currentValue = $(this).val();
        $(this).val('');
        $(this).val(currentValue);

        if (tecla === 13) {
            $("#btnPesquisar").click();
        }
    });

};

var mascaratelefone = function () {

    $(".telefone")
        .mask("(99) 9999-99999")
        .focusout(function (event) {
            var target, phone, element;
            target = event.currentTarget ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if (phone.length > 10) {
                element.mask("(99) 99999-9999");
            } else {
                element.mask("(99) 9999-9999");
            }
        });
};

var mascaraDataCompleta = function () {

    $(".data-anomes").focus(function (e) {
        $(this).unmask();
        $(this).mask("99/9999");
    });
};

var mascaraLoading = function () {

    $(".loading").click(function (e) {

        var $this = $(this);
        var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Carregando...';
        if ($(this).html() !== loadingText) {
            $this.data('original-text', $(this).html());
            $this.html(loadingText);
        }
        setTimeout(function () {
            $this.html($this.data('original-text'));
        }, 2000);
    });
};

var habilitarMascaras = function () {
    

    var behavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    };

    var options = {
        onKeyPress: function (val, e, field, options) {
            field.mask(behavior.apply({}, arguments), options);
        }
    };

    var behaviorCpfCnpj = function (val) {
        
        return val.replace(/\D/g, '').length > 11 || val.replace(/\D/g, '').length === 0 ? '00.000.000/0000-00' : '000.000.000-009';
    };

    var optionsCpfCnpj = {
        onKeyPress: function (val, e, field, options) {
            field.mask(behaviorCpfCnpj.apply({}, arguments), options);
        }
    };

    var behaviorCartao = function (val) {
        return val.replace(/\D/g, '').length > 16 || val.replace(/\D/g, '').length === 0 ? '000000 0000 00000 0000' : '0000 0000 0000 00009'
    }

    var optionsCartao = {
        onKeyPress: function (val, e, field, options) {
            field.mask(behaviorCartao.apply({}, arguments), options);
        }
    }

    $('.mask-data').mask('99/99/9999');
    $('.mask-dia-mes').mask('99/99');
    //$(".mask-data").datepicker({ showAnim: "fadeIn" });

    $('.mask-mes-ano').mask('99/9999');
    $(".time").mask("99:99");
    $('.mask-cep').mask('99999-999');
    $('.mask-telefone').mask('(99) 99999-9999');
    $('.mask-celular').mask(behavior, options);
    $('.mask-numeral').mask('99999');
    $('.mask-codIbgeMun').mask('9999999');
    $('.mask-diames').mask('99/99');
    $('.mask-matricula').mask('9999999999');
    $('.mask-numeroOsDigito').mask('999999999-9');
    $('.mask-nsa').mask('9999');
    $('.mask-codQuadra').mask('999');
    $('.mask-umacasa').mask('9');
    $('.mask-cpf-cnpj').mask(behaviorCpfCnpj, optionsCpfCnpj);
    $('.mask-cpf').mask('999.999.999-99');
    $('.mask-cnpj').mask('99.999.999/9999-99');
    $('.mask-money').mask('#.##0,00', { reverse: true });
    $('.mask-vl6').mask('#.##0,000000', { reverse: true });
    $('.mask-incricao-cadastral').mask("##.###.##.###.###.####.###");
    $('.mask-cartao').mask(behaviorCartao, optionsCartao);
    $('.mask-numgrande').mask('999999999999999');
    $('.mask-numComPontos').mask('#.###', { reverse: true });
};

function formataValor(campo) {
    campo.value = filtraCampo(campo);
    var vr = campo.value;
    var tam = vr.length;

    if (tam <= 2) {
        campo.value = vr;
    }
    if (tam > 2 && tam <= 5) {
        campo.value = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
    }
    if (tam >= 6 && tam <= 8) {
        campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
    }
    if (tam >= 9 && tam <= 11) {
        campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
    }
    if (tam >= 12 && tam <= 14) {
        campo.value = vr.substr(0, tam - 11) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
    }
    if (tam >= 15 && tam <= 18) {
        campo.value = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
    }
}

// limpa todos os caracteres especiais do campo solicitado, deixando somente números
function filtraCampo(campo) {

    return campo.value = campo.value.replace(/[^\d]/g, "");
}

var inputChange = function () {
    $('input,select,textarea').change(function () {
        var that = $(this);

        that.removeClass('is-invalid');

        if (that.data('link-input')) {
            var div = that.closest('.row');
            div.find('*[data-link-input="True"]').removeClass('is-invalid');
        }
    });
}

var InputToUpper = function () { $('.mask-to-upper').keyup(function () { this.value = this.value.toUpperCase(); }); };

var formataCpfCnpjInput = function(input) {
    if (typeof input !== 'object') {
        return false;
    }

    value = input.val().replace(/\D/g, '');

    if (value.length > 11) {
        input.val(value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5"));
    } else {
        input.val(value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"));
    }
}