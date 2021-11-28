//completa string(str) com uma string/char(insert) até o tamanho especificado(max)
var completarString = function (str, insert, max) {
    str = str.toString();
    return str.length < max ? completarString(insert + str, insert, max) : str;
};

//metodo para mostrar mensagem em tela, colocando a mensagem(message), o tipo de mensagem(msgType)
var displayMessage = function (message, msgType) {
    function toaster(message, msgType) {
        if (typeof options === 'object') {
            if ('settings' in options) {
                settings = $.extend(true, settings, options.settings);
            }
        }
        else {
            var values = Array.prototype.slice.call(arguments, 0);
            var labels = ['message', 'title', 'priority'];
            options = {};

            for (var i = 0, l = values.length; i < l; i += 1) {
                options[labels[i]] = values[i];
            }
        }

        var title = (('title' in options) && (typeof options.title === 'string')) ? options.title : settings.toast.defaults.title;
        var message = ('message' in options) ? options.message : null;
        var priority = (('priority' in options) && (typeof options.priority === 'string')) ? options.priority : settings.toast.defaults.priority;
        var habilitarsetTimeout = (('setTimeout' in options) && (typeof options.habilitarsetTimeout === 'boolean')) ? options.habilitarsetTimeout : true;

        if (message !== null) {
            toasting.notify(title, message, priority, habilitarsetTimeout);
        }
    };

    toaster();

    };


function validateDate(id) {
    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;

    if (!((id.match(RegExPattern)) && (id != ''))) {
        return false;
    }
    else
        return true;
}

function MontaDropdown(json, dropdown) {
    let options = '<option value=""> ' + 'Selecione </option>';

    //if (json.length <= 0) {
    //    options = 'nao ha dados disponiveis';
    //}

    /*    else {*/
    for (let i = 0; i < json.length; i++) {
        options += '<option value="' + json[i].Value + '">' + json[i].Text + '</option>';
        //        }
    }

    $(`#${dropdown}`).html(options);
}

var DonwloadAquivo = function (file, nome) {
    var byteArray = new Uint8Array(file);
    var a = window.document.createElement('a');

    a.href = window.URL.createObjectURL(new Blob([byteArray]));
    a.download = nome;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}

function valida(val) {
    if ($(`${val}`).val() == "" || $(`${val}`).val() == "SELECIONE") {
        $(`${val}`).addClass('is-invalid')
        displayMessage("Preencha os campos obrigatórios!", "danger");
        return false;
    }
}

function validaDisplayPoup(val) {
    if ($(`${val}`).val() == "" || $(`${val}`).val() == "SELECIONE") {
        $(`${val}`).addClass('is-invalid')
        return false;
    }
}

async function RequestAjax(url, params, metodo) {
    metodo = metodo == undefined || metodo == "" ? "GET" : metodo;

    let result;

    await $.ajax({
        url: url,
        data: params,
        method: metodo,
        async: true
    }).done(async function (data) {
        result = data;
    });

    return result;
}

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function FiltrarDataTableAtivoInativo(idDataTable, valor) {
    var table = $(`#${idDataTable}`).DataTable();

    let stringBusca = valor == 1 ? "Ativo" : (valor == 2 ? "" : "Inativo");

    let result = table.search('\\b' + stringBusca + '\\b', true, false).draw();;

    let total = result.$('tr', { "filter": "applied" }).length;

    AtualizarTotalTabela(total);
}

function AtualizarTotalTabela(total) {
    let textoTotal = `Total de registros: ${total}`

    let divInfo = $('.dataTable_info')
    let childs = divInfo.children()
    let pTag = childs[0]

    $(pTag).text(textoTotal);
}

function DesabilitarRelatoriosDataTable() {
    $('.impressaoRelatorio').off();
}

function CheckarRadiobuton(classe, value) {
    $.each($(`.${classe}`), (i, item) => {
        if (item.value == value)
            item.checked = true;
    });
}

function ValueRadiobuton(classe) {
    let result;

    $.each($(`.${classe}`), (i, item) => {
        if (item.checked)
            result = item.value;
    });

    return result;
}

function RemoverItemSelecionadoTabela() {
    var all_tr = $('tr');

    all_tr.removeClass('selected');
}

function HabilitarDataTablePadrao(nomeTabela, campoFiltroTabela, campoBusca) {
    $(`#${nomeTabela}`)
        .on('init.dt', function () {
            var that = $(this);

            var count = that.DataTable().rows().count();

            var paginate = $(`#${nomeTabela}_paginate`);

            var info = $(`#${nomeTabela}_info`);

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

            var table = $(`#${nomeTabela}`).DataTable();

            $(`#${campoBusca}`).on('keyup', function () {
                table.search(this.value).draw();
            });

            $(`#${campoFiltroTabela}`).trigger('click');

            $(`#${nomeTabela}_filter`).hide();

        })
        .DataTable(
            {
                "language": {
                    "url": window.initialState.urlHome + "Scripts/Custom/datatables-pt-BR.json"
                },
                searching: true,
                paging: true,
                ordering: true,
                pagingType: "full_numbers",
                lengthChange: false,

                columnDefs: [{
                    "targets": 'no-sort',
                    "orderable": false,
                },
                { type: 'date-uk', targets: 3 }]
            });
}