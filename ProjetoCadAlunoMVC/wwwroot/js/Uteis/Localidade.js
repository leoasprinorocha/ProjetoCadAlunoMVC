var $selectEmpresaLocalidade = $("#EmpresaLocalidadeSelectedId");
var $selectRegiaoLocalidade = $("#RegiaoLocalidadeSelectedId");
var $selectMunicipioLocalidade = $("#MunicipioLocalidadeSelectedId");
var $selectLocalLocalidade = $("#LocalLocalidadeSelectedId");

var model = window.initialState.localidade;

(function ($) {
    $(function () {
        $selectEmpresaLocalidade = $("#EmpresaLocalidadeSelectedId");
        $selectRegiaoLocalidade = $("#RegiaoLocalidadeSelectedId");
        $selectMunicipioLocalidade = $("#MunicipioLocalidadeSelectedId");
        $selectLocalLocalidade = $("#LocalLocalidadeSelectedId");

        habilitarEventos();
        habilitarSelects();
        EventosAdicionais();

        function habilitarEventos() {

            $selectEmpresaLocalidade.on('change', function () {
                AlterarEmpresaLocalidade();
            });

            $selectRegiaoLocalidade.on('change', function () {
                var SelectedValue = $selectRegiaoLocalidade.val();
                if ($.isArray(SelectedValue)) {
                    SelectedValue = SelectedValue.join(',');
                }

                var url = '../Localidade/ChangeRegiao';

                $selectMunicipioLocalidade.html('');
                $selectMunicipioLocalidade.append(
                    $('<option>').val('').text('Selecione')
                );

                $selectLocalLocalidade.html('');
                $selectLocalLocalidade.append(
                    $('<option>').val('').text('Selecione')
                );

                if ($selectRegiaoLocalidade.val() == '') {
                    $selectMunicipioLocalidade.trigger('change');
                    return false;
                };

                var data = { idregiao: SelectedValue };

                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    async: true
                }).done(function (res) {
                    municipios = res;

                    $.each(municipios, function (index, municipio) {
                        var $option = $('<option>').val(municipio.COD_MUNICIPIO).text(municipio.NOME_MUNICIPIO);

                        $selectMunicipioLocalidade.append($option);
                    });

                    $selectLocalLocalidade.val('');

                    if (typeof (EventReturnRegiaoLocalidade) != "undefined") {
                        EventReturnRegiaoLocalidade();
                    }
                });
            });

            $selectMunicipioLocalidade.on('change', function () {
                var SelectedValue = $selectMunicipioLocalidade.val();

                if ($.isArray(SelectedValue)) {
                    SelectedValue = SelectedValue.join(',');
                }

                var url = '../Localidade/ChangeMunicipio';

                $selectLocalLocalidade.html('');
                $selectLocalLocalidade.append(
                    $('<option>').val('').text('Selecione')
                );

                if ($selectMunicipioLocalidade.val() == '') {
                    $selectLocalLocalidade.trigger('change');
                    return false;
                }

                var data = { codmunicipio: SelectedValue };

                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    async: true
                }).done(function (res) {
                    locais = res;

                    $.each(locais, function (index, local) {
                        var $option = $('<option>').val(local.LOCALIDADE).text(local.NOME_LOCAL);

                        $selectLocalLocalidade.append($option);
                    });

                    $selectLocalLocalidade.val('');

                    if (typeof (EventReturnMunicipioLocalidade) != "undefined") {
                        EventReturnMunicipioLocalidade();
                    }
                });
            });
        }

        function habilitarSelects() {
            if (model.DisabledRegiaoLocalidade) {
                $selectRegiaoLocalidade.off();
            }

            if (model.DisabledMunicipioLocalidade) {
                $selectRegiaoLocalidade.off();
                $selectMunicipioLocalidade.off();
            }

            if (model.DisabledLocalLocalidade) {
                $selectRegiaoLocalidade.off();
                $selectMunicipioLocalidade.off();
            }
        }

        function EventosAdicionais() {
            if (window.initialState != undefined && window.initialState.eventoAdicionalRegiaoLocalidadeSelectedId != undefined) {
                window.initialState.eventoAdicionalRegiaoLocalidadeSelectedId();
            }
        }
    });
})(jQuery);

function AlterarEmpresaLocalidade() {
    var SelectedValue = $selectEmpresaLocalidade.val();

    if ($.isArray(SelectedValue)) {
        SelectedValue = SelectedValue.join(',');
    }

    var url = '../Localidade/ChangeEmpresa';

    $selectRegiaoLocalidade.html('');
    $selectRegiaoLocalidade.append(
        $('<option>').val('').text('Selecione')
    );

    $selectMunicipioLocalidade.html('');
    $selectMunicipioLocalidade.append(
        $('<option>').val('').text('Selecione')
    );

    $selectLocalLocalidade.html('');
    $selectLocalLocalidade.append(
        $('<option>').val('').text('Selecione')
    );

    if ($selectEmpresaLocalidade.val() == '') {
        $selectRegiaoLocalidade.trigger('change');
        return false;
    };

    var data = { idEmpresa: SelectedValue };

    $.ajax({
        url: url,
        data: data,
        type: "POST",
        async: true
    }).done(function (res) {
        let regioes = res;
        $.each(regioes, function (index, regiao) {
            var $option = $('<option>').val(regiao.ID_REGIAO).text(regiao.NOME_REGIAO);

            $selectRegiaoLocalidade.append($option);
        });

        $selectRegiaoLocalidade.val('');

        if (typeof (EventReturnEmpresaLocalidade) != "undefined") {
            EventReturnEmpresaLocalidade();
        }
    });
}