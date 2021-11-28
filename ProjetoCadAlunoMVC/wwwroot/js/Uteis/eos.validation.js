
function SomenteNumero(e) {

    var tecla = window.event ? event.keyCode : e.which;
    var isNumber = tecla > 47 && tecla < 58;
    var isNumberToo = tecla > 94 && tecla < 106;
    var copyPaste = tecla === 17 || tecla === 86 || tecla === 67;
    var tab = tecla === 9;

    if (tecla === 13) {
        $("#btnPesquisar").click();
    }

    return isNumber || isNumberToo || tecla === 0 || tecla === 8 || tecla === 13 || copyPaste || tab;
}

function OnlyNumbers(e) {

    var tecla = window.event ? event.keyCode : e.which;
    var isNumber = tecla > 47 && tecla < 58;
    var isNumberToo = tecla > 94 && tecla < 106;
    var copyPaste = tecla === 17 || tecla === 86 || tecla === 67;
    var tab = tecla === 9;

    return isNumber || isNumberToo || tecla === 0 || tecla === 8 || tecla === 13 || copyPaste || tab;
}


function habilitarEnter(e) {
    var tecla = window.event ? event.keyCode : e.which;

    if (tecla === 13) {
        $("#btnPesquisar").click();
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    pattern.test(emailAddress);
}

function validarEmail(email) {
    var valida = true;

    var arrayEmail = email.split(';');

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //$.each(arrayEmail, function (index, item) {
    if (!re.test(email)) {
        valida = false;
    }
    //});

    return valida;
}

function validarCPF(strCpf) {
    strCpf = strCpf.replace(/\D/g, '');
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === "00000000000") return false;
    if (strCpf === "99999999999") return false;

    var soma = 0;

    for (var i = 1; i <= 9; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    var resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}