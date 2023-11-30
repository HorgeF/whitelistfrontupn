function activarMultiModal() {

    $('.modal').on('hidden.bs.modal', function (event) {


        if (!$(this).hasClass('fv-modal-stack')) {
            return;
        }


        $(this).removeClass('fv-modal-stack');
        $('body').data('fv_open_modals', $('body').data('fv_open_modals') - 1);

        ($('body').data('fv_open_modals') > 0) ? $('body').removeClass('modal-open').addClass('modal-open') : $('body').removeClass('modal-open');

        if ($(this).data('fv_open_modals') == 1) {
            $('body').removeClass('modal-open');
            $('body').data('fv_open_modals', 0);
        }

        if ($('.modal-backdrop').hasClass('fv-modal-stack') == false) {
            $('body').removeClass('modal-open');
            $('body').data('fv_open_modals', 0);
        }



    });


    $('.modal').on('shown.bs.modal', function (event) {

        //alert("suma1");
        // guardar el numer de ventanas modales abiertas

        if (typeof ($('body').data('fv_open_modals')) == 'undefined') {
            $('body').data('fv_open_modals', 0);
        }

        if (typeof ($(this).data('fv_open_modals')) == 'undefined') {
            $(this).data('fv_open_modals', 0);
        }

        //si z index del modal tiene la classe se ignora
        if ($(this).hasClass('fv-modal-stack')) {
            return;
        }

        $(this).addClass('fv-modal-stack');


        $('body').data('fv_open_modals', $('body').data('fv_open_modals') + 1);
        $(this).data('fv_open_modals', $('body').data('fv_open_modals') + 1);

        $(this).css('z-index', 1040 + (10 * $('body').data('fv_open_modals')));

        $('.modal-backdrop').not('.fv-modal-stack')
            .css('z-index', 1039 + (10 * $('body').data('fv_open_modals')));


        $('.modal-backdrop').not('fv-modal-stack')
            .addClass('fv-modal-stack');

    });

}

function stopProgagation() {

    $('.stop-click').on('click', function (event) {
        // Avoid following the href location when clicking
        event.preventDefault();
        // Avoid having the menu to close when clicking
        event.stopPropagation();
        // If a menu is already open we close it

    });
}

function inicializarEmpresa() {

    //Al cambiar el combo de la empresa seguridad, poblar el combo aplicación seguridad.

    $('#cboEmpresaWebSeguridad').change(function () {

        $.ajax({
            url: rutaAplicativo + 'Generico/ListarAplicacionxEmpresa',
            type: 'GET',
            cache: false,
            data: { "pParametroValue": "{'Codigo':" + $('#cboEmpresaWebSeguridad').val() + "}" },
            datatype: 'json',
            ContentType: 'application/json;utf-8',
            async: false,
            vAjaxWait: false,
        }).done(function (data) {
            if (data.SPCodigo == 200) {

                if (data.SPDatos != null) {

                    //Antes de limpiar verificar que tenía seleccionado.
                    let codigoAplicacionAntesDePoblarla = $('#cboAplicacionWebSeguridad').val();
                    let existeCodigoAplicacionSesion = false;

                    //Limpio la data del combo.
                    $('#cboAplicacionWebSeguridad').empty();

                    //LLeno la tabla con la data.
                    data.SPDatos.DatoListar.forEach(function (item, index) {

                        if (item.Codigo == vsessionCodAplicacionSeguridad) {
                            existeCodigoAplicacionSesion = true
                        }

                        $('#cboAplicacionWebSeguridad').append($('<option>', {
                            value: item.Codigo,
                            text: item.Descripcion
                        }));

                    });

                    //Selecciono la opción de sesión.
                    $('#cboAplicacionWebSeguridad').val(vsessionCodAplicacionSeguridad);

                    //Validar que el combo seguridad debe estar seleccionado.
                    let codigoAplicacionWebSeguridad = $('#cboAplicacionWebSeguridad').val();

                    if (codigoAplicacionWebSeguridad == 0 || codigoAplicacionWebSeguridad == "" || codigoAplicacionWebSeguridad == null) {
                        alerta("warning", "!Alerta!", "La selección de una aplicación es obligatoria, para aplicar el cambio.", "cboAplicacionWebSeguridad");
                        return false;
                    }

                    //Disparar el evento onchange del combo aplicación, solo cuando lo previo seleccionado es igual y el código existía.
                    if (codigoAplicacionAntesDePoblarla == vsessionCodAplicacionSeguridad && existeCodigoAplicacionSesion) {
                        $('#cboAplicacionWebSeguridad').trigger('change');
                    }

                }

            } else {
                alerta("error", "!Alerta!", "Error al cambiar la aplicación");
            }
        });

    });

    //Al cambiar el combo de la aplicación seguridad, aplicar el cambio.
    $('#cboAplicacionWebSeguridad').change(function () {

        $.ajax({
            url: rutaAplicativo + 'Acceso/CambiarEmpresaAplicacion',
            type: 'POST',
            cache: false,
            data: {
                codEmpresaSeguridad: $("#cboEmpresaWebSeguridad option:selected").val(),
                EmpresaSeguridad: $("#cboEmpresaWebSeguridad option:selected").text(),
                codAplicacionSeguridad: $("#cboAplicacionWebSeguridad option:selected").val(),
                AplicacionSeguridad: $("#cboAplicacionWebSeguridad option:selected").text()
            },
            datatype: 'json',
            ContentType: 'application/json;utf-8',
            async: false,
            vAjaxWait: false,
            /* vMsgError: 'Acceso/CambiarEmpresa'*/
        }).done(function (data) {
            if (data.SPCodigo == 200) {
                location.reload(); //Refrescar la pantalla para ver el cambio de empresa en sesión.
            } else {
                alerta("error", "!Alerta!", "Error al aplicar el cambio de la empresa y aplicación.");
            }
        });

    });


    //Llenar Combo de Empresa Seguridad.

    $.ajax({
        url: rutaAplicativo + 'Generico/ListarEmpresa',
        type: 'GET',
        cache: false,
        data: {"pParametroValue":""},
        datatype: 'json',
        ContentType: 'application/json;utf-8',
        async: false,
/*        vAjaxWait: false,*/
    }).done(function (data) {
        if (data.SPCodigo == 200) {

            if (data.SPDatos != null) {

                //Limpio la data del combo.
                $('#cboEmpresaWebSeguridad').empty();

                //LLeno la tabla con la data.
                data.SPDatos.DatoListar.forEach(function (item, index) {
                    $('#cboEmpresaWebSeguridad').append($('<option>', {
                        value: item.Codigo,
                        text: item.Descripcion
                    }));
                });

                //Selecciono la opción de sesión.
                $('#cboEmpresaWebSeguridad').val(vsessionCodEmpresaSeguridad);

                //Disparar la carga del combo aplicación
                $('#cboEmpresaWebSeguridad').trigger('change');

            }

        } else {
            alerta("error", "!Alerta!", "Error al cambiar la empresa.");
        }
    });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function inicializarSesion() {
    var ruta = rutaAplicativo + 'Acceso/CheckSesion?s=';

    (function poll() {
        setTimeout(function () {

            $.ajax({
                type: 'POST',
                url: ruta + new Date().getTime(), success: function (data) {
                    console.log(data.estado + " - " + data.data);
                },
                datatype: 'json',
                ContentType: 'application/json;utf-8',
                async: false,
                vAjaxWait: false,
                vMsgError: 'Acceso/CheckSesion?=',
                complete: poll
            });
        }, vsessionSegundosSesion * 1000);
    })();

}

$(document).ready(function () {
    inicializarSesion();
    stopProgagation();
    inicializarEmpresa();
    /*activarMultiModal();*/
});

var G_dataExcelDownload = [];
var G_checkAllExcel = false;