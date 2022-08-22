import $ from "jquery";
import { basePathAi } from "../../api/config";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { signInApi } from "../../api/user";
//import { browserHistory } from "react-router";
//import { Router } from "react-router-dom";
//https://stackoverflow.com/questions/31539349/how-to-emulate-window-location-with-react-router-and-es6-classes
let perfil_multiple;
//******Metodos abreviados js*******
//usar bind para definir el scope
export const log = console.log;
export const id = document.getElementById.bind(document);
export const q = document.querySelector.bind(document);
export const all = document.querySelectorAll.bind(document);
//invocación:  id('main-menu');

// ACCESO
export function inicializar_formulario_acceso() {
  perfil_multiple = false;
  $("#panel-acceso").addClass("animated zoomInDown");
  siguiente_campo("#usuario_usuario", "#clave_usuario", false);
  siguiente_campo("#clave_usuario", "#boton-ingresar", false);
  $("#usuario_usuario").focus();
  cerrar_session_ajax();
}
export function validar_acceso() {
  let usuario = $("#usuario_usuario").val();
  let clave = $("#clave_usuario").val();
  if (usuario === "") {
    mostrar_mensaje(
      "Mensaje del Sistema",
      "Usuario en blanco",
      "Aceptar",
      "#usuario_usuario"
    );
  } else if (clave === "") {
    mostrar_mensaje(
      "Mensaje del Sistema",
      "Clave en blanco",
      "Aceptar",
      "#clave_usuario"
    );
  } else {
    const inputs = { email: usuario, password: clave };
    if (login(inputs)) {
      console.log("entro-->");
      window.location.href = "/ai";
    }
    //validar_acceso_ajax();
  }
}

const login = async (inputs) => {
  //e.preventDefault();
  const result = await signInApi(inputs);

  //si se recibe result.message--> existe algun error
  if (result.message) {
    console.log(result.message);
    //notification["error"]({ message: result.message });
  } else {
    //todo correcto registrar el token en el localstorage
    const { accessToken, refreshToken } = result;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    //notification["success"]({message: "Login correcto."});
    //window.location.href = "/admin";
    return true;
  }
};
export function validar_acceso_ajax() {
  let pDatosFormulario = $("#form_acceso").serialize();
  console.log(pDatosFormulario);
  let pUrl = "usuario/validar";
  let pBeforeSend = "";
  let pSuccess = "validar_acceso_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function validar_acceso_ajax_success(json) {
  if (json.acceso === true) {
    console.log("acceso--> " + json.acceso + ", perfiles--> " + json.perfiles);
    if (json.perfiles === 1) {
      perfil_multiple = false;
      recuperar_session_ajax();
      //location.href = 'menu.html';
      irRuta("menu.html");
    } else if (json.perfiles > 1) {
      perfil_multiple = true;
      //location.href = 'elegirperfil.html';
      //return browserHistory.push("elegirperfil.html");
      return withRouter("/elegirperfil");
    }
  } else {
    mostrar_mensaje(
      "Mensaje del Sistema",
      "Credencial Incorrecta",
      "Aceptar",
      ""
    );
  }
}
export function salir_acceso() {
  $("#panel-acceso").addClass("zoomOutDown");
}

// SESSION
export function validar_session_ajax() {
  let pDatosFormulario = "";
  let pUrl = "session/validar";
  let pBeforeSend = "";
  let pSuccess = "validar_session_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function validar_session_ajax_success(json) {
  console.log("session_success-->" + json.logueado);
  if (json.logueado !== true) {
    global.location.href = "./";
  }
  $("#s_nombre_empresa").html(json.sucursal.nombre_empresa);
  $("#s_nombre_sucursal").html(json.sucursal.nombre_sucursal);
  let strUsuario = json.usuario.usuario_usuario;
  strUsuario = strUsuario.charAt(0).toUpperCase() + strUsuario.slice(1);
  $("#s_usuario_usuario").html(strUsuario);
  $("#s_id_usuario").html(json.usuario.id_usuario);
  $("#susuario_usuario").html(strUsuario);
  $("#s_nombre_rol").html(json.rol.nombre_rol);
  $("#s_id_sucursal").html(json.sucursal.id_sucursal);
  $("#s_direccion_sucursal").html(json.sucursal.direccion_sucursal);
  $("#s_telefono_sucursal").html(json.sucursal.telefono_sucursal);
  $("#s_ruc_empresa").html(json.sucursal.ruc_empresa);
  //let id_usuario = json.usuario.id_usuario;
}
export function cerrar_session_ajax() {
  let pDatosFormulario = "";
  let pUrl = "session/cerrar";
  let pBeforeSend = "";
  let pSuccess = "cerrar_session_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function cerrar_session_ajax_success(json) {
  //AL INICIALIZAR POR PRIMERA VEZ, CERRAR SESSION
  console.log("session-->" + json.logueado);
}

// INICIALIZAR FORMULARIO ELEGIR PERFIL
export function inicializar_formulario_elegirperfil() {
  perfil_multiple = true;
  $("#panel-elegirperfil").addClass("animated zoomInLeft");
  $("#boton-elegir").focus();
  recuperar_session_ajax();
}
export function recuperar_session_ajax() {
  let pDatosFormulario = "";
  let pUrl = "session/validar";
  let pBeforeSend = "";
  let pSuccess = "recuperar_session_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function recuperar_session_ajax_success(json) {
  if (json.logueado !== true) {
    //location.href = "./";
    irRuta("./");
  }
  let id_usuario = json.usuario.id_usuario;
  buscar_usuariorol_ajax(id_usuario);
}

// BUSCAR USUARIOROL
export function buscar_usuariorol_ajax(id_usuario) {
  let pDatosFormulario = "id_usuario=" + id_usuario;
  console.log(pDatosFormulario);
  let pUrl = "usuariorol/buscar/usuario/id";
  let pBeforeSend = "";
  let pSuccess = "buscar_usuariorol_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function buscar_usuariorol_ajax_success(json) {
  /*ESTE 'json' DEVUELTO POR EL SERVIDOR ES UN ARRAY OJO..*/
  console.log("perfil_multiple-->" + perfil_multiple);
  if (perfil_multiple) {
    mostrar_datos_usuariorol(json);
    //        perfil_multiple = false;
  } else {
    let id_rol;
    $.each(json, function (key, value) {
      id_rol = value.id_rol;
    });
    /*FORMA DE LLAMAR A UN ARRAY 'json'-> json[0].id_rol*/
    console.log("listo,id rol-->" + json[0].id_rol);
    elegir_perfil_ajax(id_rol);
  }
}
export function mostrar_datos_usuariorol(json) {
  let datos = "";
  $.each(json, function (key, value) {
    datos += "<tr onclick='seleccionar_usuariorol($(this))'>";
    datos += "<td><input type='checkbox'></td>";
    datos += "<td>" + value.id_usuariorol + "</td>";
    datos += "<td>" + value.id_rol + "</td>";
    datos += "<td>" + value.nombre_rol + "</td>";
    datos += "</tr>";
  });
  if (datos === "") {
    datos += "<tr><td colspan='3'>No existen registros ...</td></tr>";
  }
  $("#tbody_datos_usuariorol").html(datos);
  $("#tabla-rol").find("input").eq(0).prop("checked", true);
}
export function seleccionar_usuariorol($this) {
  $this.parent().find("input").prop("checked", false);
  if ($this.find("input").prop("checked")) {
    $this.find("input").prop("checked", false);
  } else {
    $this.find("input").prop("checked", true);
  }
}

//PERFIL SELECCIONADO-PROCEDER
export function elegir_perfil() {
  let id_rol = 0;
  let nombre_rol = "";
  //
  //    let id_empresa = 0;
  //    let nombre_empresa = '';
  //
  //    let id_sucursal = 0;
  //    let nombre_sucursal = '';

  let filas = $("#tbody_datos_usuariorol tr");
  $.each(filas, function (index, fila) {
    let elegido = $(this).find("input").prop("checked");
    if (elegido) {
      id_rol = $(this).find("td").eq(2).text();
      nombre_rol = $(this).find("td").eq(3).text();
    }
  });

  //    console.log('id_empresa=' + id_empresa + " - nombre_empresa=" + nombre_empresa);
  //    console.log('id_sucursal=' + id_sucursal + " - nombre_sucursal=" + nombre_sucursal);
  //    elegir_perfil_ajax(id_rol, nombre_rol, id_empresa, nombre_empresa, id_sucursal, nombre_sucursal);
  console.log("id_rol=" + id_rol + " - nombre_rol=" + nombre_rol);
  elegir_perfil_ajax(id_rol);
}
export function elegir_perfil_ajax(id_rol) {
  let pDatosFormulario = "id_rol=" + id_rol;
  console.log(pDatosFormulario);
  let pUrl = "session/actualizar";
  let pBeforeSend = "";
  let pSuccess = "elegir_perfil_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function elegir_perfil_ajax_success(json) {
  //console.log(json);
  if (json.actualizado) {
    //location.href = './menu.html';
    irRuta("./menu.html");
  } else {
    mostrar_mensaje(
      "Mensaje del Sistema",
      "ERROR: No se pudo actualizar los datos",
      "Aceptar",
      "#boton-elegir"
    );
  }
}
export function salir_elegirpefil() {
  //funcion regresar******
  global.location.href = "./";
}

// MENU
let ocultar = false;
export function inicializar_menu() {
  validar_session_ajax();
  $("#boton-menu").on("click", function () {
    $("nav").toggleClass("ocultar");
    $("main").toggleClass("ocultar");
    if (ocultar === false) {
      $(this)
        .removeClass("fas fa-angle-double-left")
        .addClass("fas fa-angle-double-right");
      ocultar = true;
    } else {
      $(this)
        .removeClass("fas fa-angle-double-right")
        .addClass("fas fa-angle-double-left");
      ocultar = false; //estaba false
    }
  });
  $("#boton-logout").on("click", function () {
    global.location.href = "./";
  });
  $("#boton-refrescar").on("click", function () {
    global.location.href = "./menu.html";
  });
  $("#cambiar_clave").on("click", function () {
    cargar_formulario("frm/administracion/procesos/cambiarclave");
  });
  $("#cerrar_sesion").on("click", function () {
    global.location.href = "./";
  });
  generar_menu_ajax();
}
export function generar_menumodificado() {
  let curHost = window.location.host.substring(
    0,
    window.location.host.indexOf(":", 0)
  ); //"https://192.168.0.187:8443/wscam"
  let urlWs = `https://${curHost}:8443/wscam`;
  let urlFotos = `http://${window.location.host}/fotos`; //"http://192.168.0.187:8084/fotos"
  //buscar todos los 'a' cuyo texto es 'Fotos' o 'Web Socket Cam' y establecer propiedades href y onclick=vacio
  let cells = document.querySelectorAll("a");
  console.log(cells);
  [].forEach.call(cells, function (el) {
    if (el.innerText.indexOf("Fotos") !== -1) {
      //el.click(); click or any other option
      el.href = urlFotos;
      el.onclick = "";
    } else if (el.innerText.indexOf("Web Socket Cam") !== -1) {
      el.href = urlWs;
      el.onclick = "";
    }
  });
}
export function generar_menu_ajax() {
  //let pDatosFormulario = "id_rol=1";
  let pDatosFormulario = "";
  let pUrl = "permiso/buscar/rol/permitido";
  let pBeforeSend = "";
  let pSuccess = "generar_menu_ajax_success(json)";
  let pError = "ajax_error()";
  let pComplete = "";
  ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}
export function generar_menu_ajax_success(json) {
  //    console.log(json);  -->devuelve array de menu en la consola
  let menu = "";
  let g_id_sistema = 0,
    id_sistema = 0;
  let g_id_submenu = 0,
    id_submenu = 0;

  $.each(json, (key, value) => {
    id_sistema = value.id_sistema;
    id_submenu = value.id_submenu;

    if (g_id_sistema !== id_sistema) {
      if (g_id_sistema === 0) {
        menu += "<li>";
        menu += ""; /*AI_20171212_1130*/
        menu += "<a class='btn btn-xm btn-success' href='#'>";
        menu +=
          "<i class='fa fa-home'/>Ai System</a>\n"; /*fa fa-home pull-left*/
        menu += "<ul>\n";
      } else {
        g_id_submenu = 0;
        menu += "</ul>\n";
        menu += "</li>\n";
        menu += "</ul>\n";
        menu += "</li>\n";
      }
      menu += "<li>" + value.nombre_sistema + "\n";
      menu += "<ul>\n";
      g_id_sistema = id_sistema;
    }

    if (g_id_submenu !== id_submenu) {
      if (g_id_submenu !== 0) {
        menu += "</ul>\n";
        menu += "</li>\n";
      }
      menu += "<li>" + value.nombre_submenu + "\n";
      menu += "<ul>\n";
      g_id_submenu = id_submenu;
    }
    menu += `<li onclick="cargar_formulario('${value.url_formulario}')">
                    <a href="#">${value.nombre_formulario}</a>
                 </li>`;
  });
  /*vacio-finalizar menu*/
  if (menu !== "") {
    menu += "</ul>\n";
    menu += "</li>\n";
    menu += "</ul>\n";
    menu += "</li>\n";
  }
  $("#menu").html(menu);
  ver_menu();
}

export function ver_menu() {
  //$("#menu ul").show();
  /*$("menu li").has("ul").css("background-color", "red");*/
  //    $("#menu li").each(function () {
  //        let handleSpan = $("<span></span>");
  //        handleSpan.addClass("handle fas fa-plus-circle"); /*fa-check-circle*/
  //        handleSpan.prependTo(this);
  //        if ($(this).has("ul").length > 0) {
  //            handleSpan.addClass("collapsed fas fa-minus-circle"); /*collapsed*/
  //            handleSpan.click(function () {
  //                let clicked = $(this);
  //                clicked.toggleClass("expanded collapsed fas fa-plus-circle"); /*expanded collapsed*/
  //                clicked.siblings("ul").toggle();
  //                //--> chelo -->
  //                //console.log("-->" + $('li').get(0).value);
  //                //console.log("-->" + $("#menu li").attr("id"));
  //            });
  //        } else {
  //            handleSpan.click(function () {
  //                let clicked = $(this);
  //                //console.log('---> ' + clicked.parent().html());
  //                console.log('---> ' + clicked.parent().html()); //agregado por chelo para ver al hacer click donde apunta
  //                console.log($("ul").length);
  //            });
  //        }
  //    });

  $("#menu li").each(function () {
    let handleSpan = $("<span></span>");
    handleSpan.addClass(
      "handle fas fa-chevron-circle-right"
    ); /*fa-chevron-circle-right*/
    handleSpan.prependTo(this);
    if ($(this).has("ul").length > 0) {
      handleSpan
        .removeClass("handle fa-chek-circle")
        .addClass("expanded fa-minus-circle"); /*expanded*/

      handleSpan.click(function () {
        let clicked = $(this);
        //handle fa-chevron-circle-right expanded fa-plus-circle
        //clicked.removeClass('expanded fa-minus-circle').addClass('collapse fa-plus-circle'); //.removeClass('expanded fa-minus-circle').addClass('collapsed fa-plus-circle');
        clicked.toggleClass("collapse fa-times-circle");
        clicked.toggleClass("expanded fa-minus-circle");
        //clicked.siblings("ul").toggle();
        clicked.siblings("ul").toggle();
        /*agregado lo que sigue, para ocultar el div*/
        if (
          $(
            "ul li ul li ul li span.fas.fa-chevron-circle-right.expanded.fa-minus-circle"
          ).length > 0
        ) {
          $("nav div.oculto").toggleClass("oculto");
        }
        /**/
      });
    } else {
      handleSpan.click(function () {
        //agregado por chelo para ver al hacer click donde apunta
        let clicked = $(this);
        console.log("---> " + clicked.parent().html());
        console.log($("ul").length);
      });
    }
  });

  /*ajustar y mostrar los submenus*/
  $(
    "ul li ul li ul li span.fas.fa-chevron-circle-right.expanded.fa-minus-circle"
  ).click();
  generar_menumodificado();
}

// FUNCIONES GENERALES
let ObjetosGlobales = () => {
  //imprimir todos los objetos globales
  //let ObjetosGlobales = () => this;
  return this;
};

//funcion alternar mostrar ocultar tabla-Elemento-------------inicio
export function toggleShowElement(idElement) {
  //validar si existe elemento(tabla) y luego alternar: [ocultar | mostrar]
  let el = document.getElementById(idElement)
    ? document.getElementById(idElement)
    : idElement;
  if (!el.nodeType === 1 || !(el instanceof HTMLElement)) {
    return false;
  }
  let valor = el.hidden ? false : true;
  el.hidden = valor;
  return valor;
}
export function alternarMostrarTabla(elemento) {
  let hermanotabla = elemento.nextElementSibling;
  let resultado = toggleShowElement(hermanotabla);
  let span = elemento.children[0];
  span.classList.remove("glyphicon-menu-up");
  span.classList.remove("glyphicon-menu-down");
  if (!span.classList.contains("glyphicon")) {
    span.classList.add("glyphicon");
  }
  let icon = resultado ? "glyphicon-menu-down" : "glyphicon-menu-up";
  span.classList.toggle(icon);
  return true;
}
//funcion alternar mostrar ocultar tabla-Elemento---------------fin

//--------------------mostrar mensajes ------------------------------------------------Begin
//mostrar_popover(".active", "info", "Resultado", "Success :) ")
export function mostrar_popover(lugar, tipo, titulo, msg) {
  let html = `<div class="popover top">
                    <div class="arrow"></div>
                    <h3 class="popover-title">${titulo}</h3>
                    <div class="popover-content">${msg}</div>
                </div>`;
  $(lugar).before(html);
  if (tipo === "danger") {
    $(".popover-title").css("background-color", "red");
    $(".popover-title").css("color", "white");
  } else if (tipo === "info") {
    $(".popover-title").css("background-color", "blue");
    $(".popover-title").css("color", "white");
    //$('.popover-title').css("float", "right");
  }
  $(".popover").fadeIn("slow", () => {
    $(".popover").fadeOut(3000, function () {
      $(".popover").remove();
    });
  });
}
export function mostrar_mensaje(titulo, mensaje, textoBoton, focusCampo) {
  $("body").append('<div id="mensajes"></div>');
  let modal =
    '<div id="divModal" class="modal fade" tabindex="-1" role="dialog" ';
  modal += '     aria-labelledby="gridSystemModalLabel">';
  modal += '<div class="modal-dialog" role="document">';
  modal += '<div class="modal-content">';
  modal += '  <div class="modal-header">';
  modal += '    <button type="button" class="close" data-dismiss="modal" ';
  modal +=
    '            aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  modal +=
    '    <h4 class="modal-title" id="gridSystemModalLabel">' + titulo + "</h4>";
  modal += "  </div>";
  modal += '  <div class="modal-body">';
  modal += "     " + mensaje;
  modal += "  </div>";
  modal += '  <div class="modal-footer">';
  modal +=
    '    <button id="botonAceptar" type="button" class="btn btn-primary"';
  modal += '            data-dismiss="modal">' + textoBoton + "</button>";
  modal += "  </div>";
  modal += "</div>";
  modal += "</div>";
  modal += "</div>";
  $("#mensajes").html(modal);
  $("#divModal").modal("show");
  $("#divModal").on("shown.bs.modal", function (e) {
    $("#botonAceptar").focus();
  });
  $("#divModal").on("hidden.bs.modal", function (e) {
    $("#mensajes").remove();
    $(focusCampo).focus();
    $(focusCampo).select();
  });
}
export function mostrar_mensaje_validacion(
  titulo,
  mensaje,
  textoBoton,
  focusCampo
) {
  $("body").append('<div id="mensajes"></div>');
  let modal =
    '<div id="divModal" class="modal fade" tabindex="-1" role="dialog" ';
  modal += '     aria-labelledby="gridSystemModalLabel">';
  modal += '<div class="modal-dialog" role="document">';
  modal += '<div class="modal-content">';
  modal += '  <div class="modal-header">';
  modal += '    <button type="button" class="close" data-dismiss="modal" ';
  modal +=
    '            aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  modal +=
    '    <h4 class="modal-title" id="gridSystemModalLabel">' + titulo + "</h4>";
  modal += "  </div>";
  modal += '  <div class="modal-body">';
  modal += "     " + mensaje;
  modal += "  </div>";
  modal += '  <div class="modal-footer">';
  modal +=
    '    <button id="botonAceptar" type="button" class="btn btn-primary"';
  modal += '            data-dismiss="modal">' + textoBoton + "</button>";
  modal += "  </div>";
  modal += "</div>";
  modal += "</div>";
  modal += "</div>";
  $("#mensajes").html(modal);
  $("#divModal").modal("show");
  $("#divModal").on("shown.bs.modal", function (e) {
    $("#botonAceptar").focus();
  });
  $("#divModal").on("hidden.bs.modal", function (e) {
    $("#mensajes").remove();
    //log(true);
    //sincronizar el focus------------inicio
    let id = $(focusCampo).attr("id");
    let el = document.getElementById(id);
    let viewportOffset = el.getBoundingClientRect();
    let top = viewportOffset.top;
    let left = viewportOffset.left;
    //window.scrollTo({top: top, behavior: 'smooth'}); //mejor una animación suave
    $(focusCampo).focus();
    //$(focusCampo).select();
    $(focusCampo).focus((e) => {
      //e.preventDefault();
      e.target.focus({ preventScroll: true });
      e.target.select();
    });
    //sincronizar el focus------------fin
  });
}
export function mostrar_confirmar(titulo, mensaje, textoBoton, funcion) {
  $("body").append('<div id="confirmar"></div>');
  let modal =
    '<div id="divModal" class="modal fade" tabindex="-1" role="dialog" ';
  modal += '     aria-labelledby="gridSystemModalLabel">';
  modal += '<div class="modal-dialog" role="document">';
  modal += '<div class="modal-content">';
  modal += '  <div class="modal-header">';
  modal += '    <button type="button" class="close" data-dismiss="modal" ';
  modal +=
    '            aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  modal +=
    '    <h4 class="modal-title" id="gridSystemModalLabel">' + titulo + "</h4>";
  modal += "  </div>";
  modal += '  <div class="modal-body">';
  modal += "     " + mensaje;
  modal += "  </div>";
  modal += '  <div class="modal-footer">';
  modal +=
    '    <button id="botonAceptar" type="button" class="btn btn-primary"';
  modal += "            onclick=eval(" + funcion + ") ";
  modal += '            data-dismiss="modal">' + textoBoton + "</button>";
  modal +=
    '    <button id="botonCancelar" type="button" class="btn btn-primary"';
  modal += '            data-dismiss="modal">Cancelar</button>';
  modal += "  </div>";
  modal += "</div>";
  modal += "</div>";
  modal += "</div>";
  $("#confirmar").html(modal);
  $("#divModal").modal("show");
  $("#divModal").on("shown.bs.modal", function (e) {
    $("#botonCancelar").focus();
  });
  $("#divModal").on("hidden.bs.modal", function (e) {
    $("#confirmar").remove();
  });
}
//--------------------mostrar mensajes --------------------------------------------------End

//-----------Cargar formularios, hijos------------------------------------------inicio
export function cargar_formulario(frm) {
  $("#boton-menu").click();
  //#1-->   $("#formularios").load(frm);  --en desuso
  //#2-->   $.ajaxSetup({async: true});   --para configurar el Ajax se puede usar no se recomienda
  //#3-->   $.post(frm, function (data) {$("#formularios").html(data);});
  //#4-->   $.post(frm).done(function (htmldevuelto){$("#formularios").html(htmldevuelto);});
  //---ajustado(intento en jQuery para que no salga que esta depreciado el ajax)
  let posting = $.post(frm);
  posting.done(function (data) {
    //let content = $(data).find("#content"); si quiero buscar algo los hijos de #content
    let content = data;
    $("#formularios").empty().append(content);
  });
}
export function cargarHijosHtml(miUrl, selectorDestino, selectorPadre = "") {
  let posting = $.post(miUrl);
  posting.done(function (data) {
    let content = data ? data : "";
    if (selectorPadre !== "") {
      content = $(data).find(selectorPadre);
    }
    $(selectorDestino).empty().append(content);
  });
  //uso:
  //  cargarHijosHtml('frm/auditoriainterna/procesos/tareas/index.html','#formularios','#panel-ingreso')
}
export function loadXMLDoc(targetDivName, url) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        // create a `div` elemenent, append response to `div` element
        // get specific elements by `id`, append `script` element to `document.body`
        let content = document.createElement("div");
        content.innerHTML = xmlhttp.responseText;
        let div = content.querySelector("#htmlContent");
        let contentScript = content.querySelector("#contentScript");
        let script = document.createElement("script");
        script.textContent = contentScript.textContent;
        document.getElementById(targetDivName).innerHTML = div.innerHTML;
        document.body.appendChild(script);
      }
    }
  };
  xmlhttp.sent();
}
//-----------Cargar formularios, hijos---------------------------------------------fin

//----------cargar busquedas-------------------------------------inicio
export function cargar_busqueda(frm) {
  $("main").append('<div id="busquedas" class="oculto"></div>');
  $("#busquedas").load(frm);
  $("#panel-formulario").fadeOut(500, function () {
    $("#busquedas").fadeIn(500, function () {
      // callback - funcion anonima
      $("#buscar_texto").focus();
    });
  });
}
export function cargar_busqueda_multi(frm) {
  $("main").append('<div id="busquedas" class="oculto"></div>');
  $("#busquedas").load(frm);
  $("#templatemain").fadeOut(500, function () {
    $("#busquedas").fadeIn(500, function () {
      // callback - funcion anonima
      $("#buscar_texto").focus();
    });
  });
}
export function cargar_busqueda_detalle(frm) {
  $("main").append('<div id="busquedas" class="oculto"></div>');
  $("#busquedas").load(frm);
  $("#detalles").fadeOut(500, function () {
    $("#busquedas").fadeIn(500, function () {
      // callback - funcion anonima
    });
  });
}
export function cargar_detalle(frm) {
  $("main").append('<div id="detalles" class="oculto"></div>');
  $("#detalles").load(frm);
  $("#panel-formulario").fadeOut(500, function () {
    $("#detalles").fadeIn(500, function () {
      // callback - funcion anonima
    });
  });
}
//----------cargar busquedas----------------------------------------fin

//salir | cerrar formulario o subformulario ------------------------inicio
export function salir_formulario() {
  //$('#s_nombre_formulario').toggleClass("active");
  //    $("#s_nombre_formulario").prev().text("");
  //    $("#s_nombre_formulario").after().text("AFTER");
  $("#boton-menu").click();
  //$("#formularios").html("");  --salir en jQuery
  document.getElementById("formularios").innerHTML = "";
  $("#s_nombre_formulario").text("Principal");
  //-------  establecer scroll  a top  ------------
  //$(window).scrollTop(0);  //set to scroll to Top
  /*
     $('html, body').animate({
     scrollTop: $("#boton-menu").offset().top
     }, 2000);
     */
  window.scrollTo({ top: 0, behavior: "smooth" }); //mejorado el desplazamiento hacia arriba con una animación suave
}
export function salir_busqueda(campo) {
  $("#busquedas").fadeOut(500, function () {
    $("#busquedas").remove();
    $("#panel-formulario").fadeIn(500, function () {
      $(campo).focus();
      $(campo).select();
    });
  });
}
export function salir_detalle() {
  $("#detalles").fadeOut(500, function () {
    $("#detalles").remove();
    $("#panel-formulario").fadeIn(500, function () {});
  });
}
export function salir_busqueda_multi(campo) {
  $("#busquedas").fadeOut(500, function () {
    $("#busquedas").remove();
    $("#templatemain").fadeIn(500, function () {
      $(campo).focus();
      $(campo).select();
    });
  });
}
export function cerrar_modal() {
  $("#").fadeOut(500, function () {
    $("#busquedas").remove();
    $("#detalles").fadeIn(500, function () {});
  });
}
//salir | cerrar formulario o subformulario ---------------------------fin

const irRuta = (URI_ruta, props) => {
  const { history } = props;
  //global.location = URI_ruta;
  return history.push(URI_ruta);
};

export function habilitar_agregar() {
  $("#boton-agregar").prop("disabled", false);
  $("#boton-modificar").prop("disabled", true);
  $("#boton-eliminar").prop("disabled", true);
}
export function deshabilitar_agregar() {
  $("#boton-agregar").prop("disabled", true);
  $("#boton-modificar").prop("disabled", false);
  $("#boton-eliminar").prop("disabled", false);
}

//----anterior-siguiente pagina(formulario detalle paginado)----inicio
export function anterior(pFuncion) {
  let pag = parseInt($("#pagina").val());
  if (pag > 1) {
    $("#pagina").val(pag - 1);
  }
  eval(pFuncion);
}
export function siguiente(pFuncion) {
  let pag = parseInt($("#pagina").val());
  $("#pagina").val(pag + 1);
  eval(pFuncion);
}
//----anterior-siguiente pagina(formulario detalle paginado)-------fin

//----foco, select-------------------------------------------------begin
export function siguiente_campo(actual, siguiente, preventDefault) {
  $(actual).on("keydown", function (event) {
    //console.log("---> "+event.which);
    if (event.which === 13) {
      if (preventDefault) {
        event.preventDefault();
      }
      $(siguiente).focus();
      $(siguiente).select();
    }
  });
}
export function moverFoco(idElement) {
  let el = document.getElementById(idElement)
    ? document.getElementById(idElement)
    : idElement;
  if (!el.nodeType === 1 || !(el instanceof HTMLElement)) {
    return false;
  }
  el.focus();
  el.select();
}
//----foco, select---------------------------------------------------end

// AJAX
// CALLBACK
//function ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete) {
//    $.ajax({
//        type: 'POST',
//        url: pUrl,
//        data: pDatosFormulario,
//        dataType: 'json',
//        beforeSend: function (objeto) {
//            eval(pBeforeSend);
//        },
//        success: function (json) {
//            eval(pSuccess);
//        },
//        error: function (e) {
//            eval(pError);
//        },
//        complete: function (objeto, exito, error) {
//            eval(pComplete);
//        }
//    });
//}

// PROMISE (PROMESAS)
export function ajaxFetch(pDatosFormulario, pUrl) {
  //pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete
  //eval(pBeforeSend);

  let data = new FormData();
  data.append("json", JSON.stringify(pDatosFormulario));
  data.append("id_actividad", 1);
  console.log(data);
  window
    .fetch(pUrl, {
      method: "POST",
      headers: {
        Accept: "Accept: application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
    .then((response) => {
      console.log(response.type);
      console.log(response.headers.get("Content-type"));
      console.log(response.headers.get("Date"));
      switch (response.status) {
        case 200:
          return response.json();
        default:
          console.log(
            `Algo inesperado ocurrió: ${response.status} ${response.statusText}`
          );
      }
    })
    .then((data) => /*eval(pSuccess)*/ console.log("data is", data))
    .catch((err) => /*eval(pError)*/ console.log(err));
}
export function ajax(
  pDatosFormulario,
  pUrl,
  pBeforeSend,
  pSuccess,
  pError,
  pComplete
) {
  eval(pBeforeSend);
  $.ajax({
    type: "POST",
    url: `${basePathAi}/${pUrl}`,
    data: pDatosFormulario,
    dataType: "json",
    async: true,
  })
    .done(function (json) {
      eval(pSuccess);
    })
    .fail(function (e) {
      eval(pError);
    })
    .always(function (objeto, exito, error) {
      eval(pComplete);
    });
}
export function ajax_error() {
  mostrar_mensaje(
    "Mensaje del Sistema",
    "ERROR: No se pudo conectar con el Servidor",
    "Aceptar",
    ""
  );
}

// NUMEROS
export function dar_formato_numero(numero, separador_decimal, separador_miles) {
  let fnumero = "";
  let snumero = numero.toString().replace(/\./g, "");
  snumero = snumero.replace(/[a-z]|_|%/gi, "");
  let pdecimal = snumero.indexOf(",");
  let psigno = snumero.indexOf("-");
  let enumero = snumero;
  let edecimal = "";
  let esigno = "";
  if (psigno !== -1) {
    esigno = "-";
    enumero = snumero.substr(1, snumero.length);
  }
  if (pdecimal !== -1) {
    if (psigno === -1) {
      enumero = snumero.substr(0, pdecimal);
    } else {
      enumero = snumero.substr(1, pdecimal - 1);
    }
    edecimal = snumero.substr(pdecimal, snumero.length);
  }
  let longitud = enumero.length;
  for (let pos = longitud - 1; pos >= 0; pos--) {
    let cnumero = enumero.charAt(pos);
    fnumero = cnumero + fnumero;
    if (longitud - pos !== longitud) {
      if ((longitud - pos) % 3 === 0) {
        fnumero = separador_miles + fnumero;
      }
    }
  }
  fnumero = esigno + fnumero + edecimal;
  return fnumero;
}
export function formatear_numero(id) {
  // eslint-disable-next-line no-restricted-globals
  let tecla = event.which;
  if (
    tecla !== 37 &&
    tecla !== 38 &&
    tecla !== 39 &&
    tecla !== 40 &&
    tecla !== 9
  ) {
    let monto = $(id).val();
    $(id).val(dar_formato_numero(monto, ",", "."));
  }
}
export function quitar_formato_numero(numero) {
  numero = numero.toString().replace(/\./g, "").replace(/\,/g, ".");
  //console.log(numero);
  return parseFloat(numero);
}
export function formatear_vencimiento(vencimiento) {
  console.log("--> " + vencimiento);
  let fvencimiento = "";
  let svencimiento = vencimiento.toString().replace(/\:/g, "");
  let longitud = svencimiento.length - 1;
  if (longitud > 3) {
    longitud = 3;
  }
  for (let pos = longitud; pos >= 0; pos--) {
    let cvencimiento = svencimiento.charAt(pos);
    fvencimiento = cvencimiento + fvencimiento;
    if (pos === 2) {
      fvencimiento = ":" + fvencimiento;
    }
  }
  return fvencimiento;
}
export function getFixed(numero, decimales) {
  let valor = parseFloat(numero).toFixed(decimales);
  let valor_string = valor.toString().replace(".", ",");
  let valor_formateado = dar_formato_numero(
    valor_string.replace(".", ","),
    ",",
    "."
  );
  return valor_formateado;
}
// NUMEROS A LETRAS
export let NumeroALetras = {
  //funcion que convierte de número a letras.
  Unidades: function (num) {
    // eslint-disable-next-line default-case
    switch (num) {
      case 1:
        return "UN";
      case 2:
        return "DOS";
      case 3:
        return "TRES";
      case 4:
        return "CUATRO";
      case 5:
        return "CINCO";
      case 6:
        return "SEIS";
      case 7:
        return "SIETE";
      case 8:
        return "OCHO";
      case 9:
        return "NUEVE";
    }
    return "";
  },
  Decenas: function (num) {
    let decena = Math.floor(num / 10);
    let unidad = num - decena * 10;
    // eslint-disable-next-line default-case
    switch (decena) {
      case 1:
        switch (unidad) {
          case 0:
            return "DIEZ";
          case 1:
            return "ONCE";
          case 2:
            return "DOCE";
          case 3:
            return "TRECE";
          case 4:
            return "CATORCE";
          case 5:
            return "QUINCE";
          default:
            return "DIECI" + this.Unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0:
            return "VEINTE";
          default:
            return "VEINTI" + this.Unidades(unidad);
        }
      case 3:
        return this.DecenasY("TREINTA", unidad);
      case 4:
        return this.DecenasY("CUARENTA", unidad);
      case 5:
        return this.DecenasY("CINCUENTA", unidad);
      case 6:
        return this.DecenasY("SESENTA", unidad);
      case 7:
        return this.DecenasY("SETENTA", unidad);
      case 8:
        return this.DecenasY("OCHENTA", unidad);
      case 9:
        return this.DecenasY("NOVENTA", unidad);
      case 0:
        return this.Unidades(unidad);
    }
  },
  DecenasY(strSin, numUnidades) {
    if (numUnidades > 0) {
      return strSin + " Y " + this.Unidades(numUnidades);
    }
    return strSin;
  },
  Centenas: function (num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - centenas * 100;
    // eslint-disable-next-line default-case
    switch (centenas) {
      case 1:
        if (decenas > 0) {
          return "CIENTO " + this.Decenas(decenas);
        }
        return "CIEN";
      case 2:
        return "DOSCIENTOS " + this.Decenas(decenas);
      case 3:
        return "TRESCIENTOS " + this.Decenas(decenas);
      case 4:
        return "CUATROCIENTOS " + this.Decenas(decenas);
      case 5:
        return "QUINIENTOS " + this.Decenas(decenas);
      case 6:
        return "SEISCIENTOS " + this.Decenas(decenas);
      case 7:
        return "SETECIENTOS " + this.Decenas(decenas);
      case 8:
        return "OCHOCIENTOS " + this.Decenas(decenas);
      case 9:
        return "NOVECIENTOS " + this.Decenas(decenas);
    }
    return this.Decenas(decenas);
  },
  Seccion: function (num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let letras = "";
    if (cientos > 0) {
      if (cientos > 1) {
        letras = this.Centenas(cientos) + " " + strPlural;
      } else {
        letras = strSingular;
      }
    }
    if (resto > 0) {
      letras += "";
    }
    return letras;
  },
  Miles: function (num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let strMiles = this.Seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = this.Centenas(resto);
    if (strMiles === "") {
      return strCentenas;
    }
    return strMiles + " " + strCentenas;
  },
  Millones: function (num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;
    let strMillones = this.Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    let strMiles = this.Miles(resto);
    if (strMillones === "") {
      return strMiles;
    }
    return strMillones + " " + strMiles;
  },
  Transformar: function (num) {
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: Math.round(num * 100) - Math.floor(num) * 100,
      letrasCentavos: "",
      letrasMonedaPlural: ".-", //'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: ".-", //'PESO', 'Dólar', 'Bolivar', 'etc'
      letrasMonedaCentavoPlural: "CENTAVOS",
      letrasMonedaCentavoSingular: "CENTAVO",
    };
    if (data.centavos > 0) {
      data.letrasCentavos =
        "CON " +
        (function () {
          if (data.centavos === 1) {
            return (
              this.Millones(data.centavos) +
              "" +
              data.letrasMonedaCentavoSingular
            );
          } else {
            return (
              this.Millones(data.centavos) + "" + data.letrasMonedaCentavoPlural
            );
          }
        })();
    }
    if (data.enteros === 0) {
      return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    }
    if (data.enteros === 1) {
      return (
        this.Millones(data.enteros) +
        " " +
        data.letrasMonedaSingular +
        " " +
        data.letrasCentavos
      );
    } else {
      return (
        this.Millones(data.enteros) +
        " " +
        data.letrasMonedaPlural +
        " " +
        data.letrasCentavos
      );
    }
  },
};

//---------TAREAS-CALLBACK----------------------------------------------inicio
//    setTimeout(function () {
//            mywindow.print();
//            return null;
//        }, 2000);
export function ejecutarLuego(intervalo, accion, idElementFocus = null) {
  //funcion que ejecuta una acción que es pasodo como parametro luego de un intervalo en milisegundos,
  //opcional como 3er parametro, se puede indicar el id del elemento que desea que tenga el foco.
  let setFocus;
  try {
    let idElement = idElementFocus;
    let el = document.getElementById(idElement)
      ? document.getElementById(idElement)
      : idElement;
    if (typeof el === "string") {
      // eslint-disable-next-line no-throw-literal
      throw "id no encontrado";
    }
    if (
      !el.nodeType === 1 ||
      !(el instanceof HTMLElement) ||
      idElement === null
    ) {
      // eslint-disable-next-line no-throw-literal
      throw false;
    }
    setFocus = () => {
      el.focus();
      el.select();
    };
  } catch (excepcion) {
    if (!excepcion) {
      // sentencias para manejar la excepción si es false
      log("sentencias para manejar la excepción si es false");
      return false;
    } else if (excepcion === "id no encontrado") {
      log("id no encontrado-->", excepcion.name, excepcion.message);
    } else {
      // no se puede manejar esta excepción, así que se vuelve a lanzar
      log("no se puede manejar esta excepción, así que se vuelve a lanzar");
      log("Err-->", excepcion);
      //throw excepcion;
    }
  } finally {
    //Block of code to be executed regardless of the try / catch result
    //Bloque de código a ejecutar independientemente del resultado de try / catch
    setTimeout(() => {
      eval(accion);
      let trigger =
        // eslint-disable-next-line no-undef
        el !== null
          ? setFocus !== undefined
            ? setFocus()
            : ""
          : log("focus()select()===null");
      return true;
    }, intervalo);
  }
}
//---------TAREAS-CALLBACK--------------------------------------------------fin

/*  ------------METODO5--------METODOS MIOS QUE LO HE USADO-------*/
export function tableHeaderToJSON(Tabla_Id) {
  //    Este es una libreria que convierta la tabla en json, pero si esta vacio no lo jala
  //    let jsonObj = $('table').tableToJSON();
  //    for (valor in jsonObj[0]) {
  //        console.log(valor);
  //    }

  let $table = $("#" + Tabla_Id);
  let headers = {},
    header = [];
  $table.find("thead th").each(function () {
    let value = $(this).html();
    //value = value.replace(/º|%/g, "_");
    value = value.replace(/\(%\)/g, "(p)").replace(/º/g, "ro.");
    header.push(value);
  });
  headers.header = header;
  // console.log("header-->" + header);
  return headers;
}
export function tableDataToJSON(Tabla_Id) {
  let $table = $("#" + Tabla_Id);
  let data = {},
    rows = [];

  $table.find("tbody tr").each(function () {
    let row = [];
    $(this)
      .find("td")
      .each(function (i) {
        //lo saque par discriminar los valores numericos sin formatos
        //let value = $(this).html();
        //row.push(value);
        let value = $(this);
        if (value.val() !== "") {
          row.push(value.val());
        } else {
          row.push(value.text());
        }
        //row.push(value.tex);
      });
    rows.push(row);
  });
  data.datos = rows;
  //    console.log("datos-->" + data);
  //    console.log(JSON.stringify(data));
  return data;
}

///*  ------------METODO6--------METODOS MIOS QUE PROBE, PERO FUERON LENTOS-------*/
function tableDataToJSONX(id_tabla) {
  let tabla = document.getElementById(id_tabla);
  let filas = tabla.getElementsByTagName("tr");

  //filtras solo los elementos que usare(solo los td's)
  let dataelements = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //volcar con sus valores en un row array
  let datarows = [].map.call(dataelements, (item) => {
    return [].map.call(item.children, (i) => {
      //console.log(i)
      if (i.value) {
        return i.value;
      } else if (i.textContent) {
        return i.textContent;
      }
    });
  });
  return { datos: datarows };
}
export function tableHeaderToJSONX(id_tabla) {
  let tabla = document.getElementById(id_tabla);
  let filas = tabla.getElementsByTagName("tr");

  //filtras solo los elementos que usare(solo los td's)
  let dataelements = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });
  //volcar con sus valores en un row array
  let datarows = [].map.call(dataelements, (item) => {
    return [].map.call(item.children, (i) => {
      //console.log(i)
      //value = value.replace(/\(%\)/g, "(p)").replace(/º/g, "ro.");
      return i.textContent.replace(/\(%\)/g, "(p)").replace(/º/g, "ro.");
    });
  });
  return { header: datarows[0] };
}

/*genial :) -->*/
function tableToJsonBeforeAjax(tablaId) {
  //funcion que utiliza forEach funcional (nuevo paradigma), el cual convierte
  //una tabla html a json que sera formateado a json para enviar al server
  //y luego  stored in database
  let tabla = document.getElementById(tablaId);
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo los elementos th
  let elRotulos = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });
  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  //recorrer el body en intentar hacer el json
  let json = [].map.call(elBody, (item) => {
    //filtrar solo los 'td'
    let tds = [].filter.call(item.children, (i) => {
      //console.log(i);
      if (i.tagName === "TD") {
        return i;
      }
    });

    let objJson = {};
    //recorrer los tds filtrados
    Array.prototype.forEach.call(tds, (i, index) => {
      let campo = elRotulos[0].children[index].textContent
        ? elRotulos[0].children[index].textContent
        : elRotulos[0].children[index].value
        ? elRotulos[0].children[index].value
        : null;
      let valor = i.textContent ? i.textContent : i.value ? i.value : null;
      let hidden = i.hidden ? true : false;
      //json
      objJson[campo] = {
        valor: valor,
        hidden: hidden,
        tipo: i.dataset.tipo,
      };
    });
    return objJson;
  });
  return json;
}
/*
//Anule esta funcion porque exactamente nose que hacía
export function JsonToTable(json) {
  //converir un json a tabla

  //let tabla = document.getElementById(tablaid);
  //const copyTbl = tabla.cloneNode(true);
  //fragment.appendChild(copyTbl);

  let filas = tabla.getElementsByTagName("tr");
  //filtrar solo los elementos th
  let elRotulos = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });

  let templ_thead;
  templ_thead = "<tr>";
  Array.prototype.forEach.call(elRotulos[0].children, (item) => {
    let hidden = item.hidden ? ` hidden="hidden"` : "";
    templ_thead += `<th${hidden}>${item.textContent}</th>`;
  });
  templ_thead += "</tr>";

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  let templ_tbody = "";
  Array.prototype.forEach.call(json, (item) => {
    //filtrar solo los 'td'
    let tds = [].filter.call(item.children, (i) => {
      //console.log(i);
      if (i.tagName === "TD") {
        return i;
      }
    });

    templ_tbody += "<tr>";
    Array.prototype.forEach.call(tds, (i) => {
      let valor = i.textContent ? i.textContent : i.value ? i.value : null;
      let hidden = i.hidden ? ` hidden="hidden"` : "";
      let estilo = i.style.textAlign ? ` style="text-align: right;"` : "";
      templ_tbody += `<td data-tipo="${i.dataset.tipo}"${estilo}${hidden}>${valor}</td>`;
    });
    templ_tbody += "</tr>";
  });
  //colocar Id correspondiente al thead y tbody
  let id_thead = tabla.children[0].id ? ` id="${tabla.children[0].id}"` : "";
  let id_tbody = tabla.children[1].id ? ` id="${tabla.children[1].id}"` : "";
  return `<thead${id_thead}>${templ_thead}</thead>
            <tbody${id_tbody}>${templ_tbody}</tbody>`;
}
*/

export function storedTableInnerHtml(tablaid) {
  /**************************************************/
  //	resumir tabla Html para ser almacenado en la Base de datos
  /**************************************************/

  //let fragment = document.createDocumentFragment();

  let tabla = document.getElementById(tablaid);
  //const copyTbl = tabla.cloneNode(true);
  //fragment.appendChild(copyTbl);

  let filas = tabla.getElementsByTagName("tr");
  //filtrar solo los elementos th
  let elRotulos = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });

  let templ_thead;
  templ_thead = "<tr>";
  Array.prototype.forEach.call(elRotulos[0].children, (item) => {
    let hidden = item.hidden ? ` hidden="hidden"` : "";
    templ_thead += `<th${hidden}>${item.textContent}</th>`;
  });
  templ_thead += "</tr>";

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  let templ_tbody = "";
  Array.prototype.forEach.call(elBody, (item) => {
    //filtrar solo los 'td'
    let tds = [].filter.call(item.children, (i) => {
      //console.log(i);
      if (i.tagName === "TD") {
        return i;
      }
    });

    templ_tbody += "<tr>";
    Array.prototype.forEach.call(tds, (i) => {
      let valor = i.textContent ? i.textContent : i.value ? i.value : null;
      let hidden = i.hidden ? ` hidden="hidden"` : "";
      let estilo = i.style.textAlign ? ` style="text-align: right;"` : "";
      templ_tbody += `<td data-tipo="${i.dataset.tipo}"${estilo}${hidden}>${valor}</td>`;
    });
    templ_tbody += "</tr>";
  });
  //colocar Id correspondiente al thead y tbody
  let id_thead = tabla.children[0].id ? ` id="${tabla.children[0].id}"` : "";
  let id_tbody = tabla.children[1].id ? ` id="${tabla.children[1].id}"` : "";
  return `<thead${id_thead}>${templ_thead}</thead>
            <tbody${id_tbody}>${templ_tbody}</tbody>`;
}

export function tableToJsonBeforeAjax_tipicoForLoop(tablaId) {
  //funcion que utiliza for loop tradicional, el cual convierte
  //una tabla html a json que sera formateado a json para enviar al server
  let tabla = document.getElementById("tabla");
  let filas = tabla.getElementsByTagName("tr");
  //$$$$ tradicional $$$$
  //tr-->loop-->
  let jsonArr = [];
  for (let i = 1; i < filas.length; i++) {
    //td-->loop-->
    let objJson = {};
    for (let j = 0; j < filas[i].children.length; j++) {
      let campo = filas[0].children[j].textContent
        ? filas[0].children[j].textContent
        : filas[0].children[j].value
        ? filas[0].children[j].value
        : null;
      let valor = filas[i].children[j].textContent
        ? filas[i].children[j].textContent
        : filas[i].children[j].value
        ? filas[i].children[j].value
        : null;
      objJson[campo] = {
        valor: valor,
        hidden: false,
        tipo: "NUMERIC",
      };
    }
    jsonArr.push(objJson);
  }
  return jsonArr;
}

export function verificaJSON(objeto) {
  if (typeof objeto === "object") {
    try {
      objeto = JSON.stringify(objeto);
    } catch (err) {
      return false;
    }
  }

  if (typeof objeto === "string") {
    try {
      objeto = JSON.parse(objeto);
    } catch (err) {
      return false;
    }
  }

  if (typeof objeto !== "object") {
    return false;
  }
  return true;
}

//let TableData;
//TableData = storeTblValues()
//TableData = $.toJSON(TableData);

export function devolverJsonTabla(tablaHtmlId) {
  let $table = $("#" + tablaHtmlId);
  let TablaJsonCompleta = [];
  //ROTULOS
  let rotulo = new Array();
  $($table)
    .find("th")
    .each(function (i) {
      let value = $(this).html();
      rotulo.push(value);
    });
  //REGISTROS-FILAS
  let filas = [];
  $table.find("tbody tr").each(function () {
    let fila = [];
    $(this)
      .find("td")
      .each(function (j) {
        let value = $(this).html();
        fila.push(value);
      });
    filas.push(fila);
  });
  //CREAR EL JSON
  //rotulo=['a','b','c']
  //filas=[[1,2,3],[4,5,6],[7,8,9]]
  let jsonArray = [];
  for (let i = 0; i < filas.length; i++) {
    // verificar la integridad de la matriz de la tabla
    filas.forEach(function (row) {
      //console.log(row.length);
      if (rotulo.length !== row.length) {
        //salirdelafuncion
        console.log("no es cuadrada la tablaHtml");
        return false;
      }
    });
    let json = {};
    for (let j = 0; j < rotulo.length; j++) {
      //jsonObj.members.viewers[newUser] = newValue ;
      //json.members[rotulo[j]]=fila[i][j];
      json[rotulo[j]] = filas[i][j];
    }
    jsonArray.push(json);
  }
  return jsonArray;
  //return TableData;
}

//======================DATE - TIME TOOLS==============================================
export function getDDMMYYYY(fecha) {
  // fecha = 2016-01-02 -> ddmmyyyy = 02/01/2016
  let dd = fecha.substr(8, 2);
  let mm = fecha.substr(5, 2);
  let yyyy = fecha.substr(0, 4);
  let ddmmyyyy = dd + "/" + mm + "/" + yyyy;
  return ddmmyyyy;
}
export function formatear_hora(hora) {
  let fhora = "";
  let shora = hora.toString().replace(/\:/g, "");
  let longitud = shora.length - 1;
  if (longitud > 3) {
    longitud = 3;
  }
  for (let pos = longitud; pos >= 0; pos--) {
    let chora = shora.charAt(pos);
    fhora = chora + fhora;
    if (pos === 2) {
      fhora = ":" + fhora;
    }
  }
  return fhora;
}
export function cambiarFormatoFecha_ddMMYYYY_to_YYYYMMdd(date_ddMMYYYY) {
  let sFecha = date_ddMMYYYY.split("/").reverse().join("/");
  //let isDate = (sFecha.getDate() !== undefined) ? true: false;
  let isDate = new Date(sFecha);
  if (isDate.toString() === "Invalid Date") {
    sFecha = false;
  }
  return sFecha;
}
export function obtenerFechaActual() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;
  return today;
}
export function getNow(
  retornaFechaHora = true,
  retornaFecha = false,
  retornaHora = false
) {
  /*
   * esta funcion retorna la fecha u hora actual
   * */
  let now = new Date();
  let anio = now.getFullYear();
  let mes = now.getMonth() + 1;

  if (mes < 10) {
    mes = "0" + mes;
  }
  let dia = now.getDate();
  if (dia < 10) {
    dia = "0" + dia;
  }
  let hora = now.getHours();
  let minuto = now.getMinutes();
  let segundo = now.getSeconds();

  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minuto < 10) {
    minuto = "0" + minuto;
  }
  if (segundo < 10) {
    segundo = "0" + segundo;
  }

  let pretty;
  if (retornaFechaHora && !retornaFecha & !retornaHora) {
    pretty = [
      dia,
      "-",
      mes,
      "-",
      anio,
      " ",
      hora,
      ":",
      minuto,
      ":",
      segundo,
    ].join("");
  }
  if (!retornaFechaHora && !retornaFecha & retornaHora) {
    pretty = [hora, ":", minuto, ":", segundo].join("");
  }
  if (!retornaFechaHora && retornaFecha & !retornaHora) {
    pretty = [dia, "-", mes, "-", anio].join("");
  }
  return pretty;
}
//muestra '2020/01/20 01:10:50'
const mostrarFechaHora = () => {
  //funcion que muestra la 'fecha hora:minuto:segundo'
  let hoy = new Date();
  let anio = hoy.getFullYear();
  let mes = hoy.getMonth() + 1;
  if (mes < 10) {
    mes = "0" + mes;
  }
  let dia = hoy.getDate();
  if (dia < 10) {
    dia = "0" + dia;
  }
  let hora = hoy.getHours();
  let minuto = hoy.getMinutes();
  let segundo = hoy.getSeconds();
  hora = hoy.getHours();
  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minuto < 10) {
    minuto = "0" + minuto;
  }
  if (segundo < 10) {
    segundo = "0" + segundo;
  }
  return (
    dia + "-" + mes + "-" + anio + " " + hora + ":" + minuto + ":" + segundo
  );
};
//mostrar la fechahora en elemento cuyo id, sea el pasado por parametro
const mostrarRelogFechaHora = (elemento_input_id) => {
  let element = document.getElementById(elemento_input_id);
  element.value = mostrarFechaHora();
};

//PARSEAR DE FORMA SEGURA (parse=analizar)
/*
 Ejemplo de como convertir las cadenas de texto en fechas(date):
 let myObj = JSON.parse(myStringJSON, dateReviver);
 myObj.dateEntry;        //Sat Dec 04 2010 16:00:00 GMT-0800 (Pacific Standard Time)
 */
export function dateReviver(key, value) {
  if (typeof value === "string") {
    let a = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (a) {
      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3]));
    }
  }
  return value;
}
//======================DATE TOOLS==============================================

//$$$$$$$$$$$$$$$$$ Tool de conversión- MANIPULACION DE STRING  $$$$$$$$$$$$$$$-inicio
//------------------------------------------------------------------------------------
export function invertirCadena(cadena) {
  return [].map
    .call(cadena, (x) => x)
    .reverse()
    .join("");
}
export function reemplazarString(cadena_analizada, buscar, reemplazar) {
  if (typeof cadena_analizada === "string") {
    //let str = "Mr Blue has a blue house and a blue car";
    //let res = str.replace(/blue/g, "red");
    let res = cadena_analizada.replace(buscar, reemplazar);
    /*
         //utilizando expresiones regulares
         let a = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
         
         if (a) {
         return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3]));
         }
         */
    return res;
  }
}
export function reemplazarStringRexEx(cadena_analizada, buscar, reemplazar) {
  if (typeof cadena_analizada === "string") {
    //let str = "Mr Blue has a blue house and a blue car";
    //let res = str.replace(/blue/g, "red");
    let res = cadena_analizada.replace(/º|%|(|)/g, "");
  }
}
export function reemplazarCaracteresEspeciales(cadena_analizada) {
  //REEMPLAZAR CARACTERES '%º ASCII[x24-x37] CARACTERES ESPECIALES'

  //1-Reemplazar '(%)' por (p)     --->  { (%) }  x '(p)
  //let res = cadena_analizada.replace(/{(%)}/g, '(p)');  //--> not work
  let res = cadena_analizada.replace(/\(%\)/g, "(p)");
  //console.log(res);

  //2-Reemplazar '%' por '(p)'
  let stringBuscado = "%";
  let patt = new RegExp(stringBuscado, "g");
  res = res.replace(patt, "(p)");

  //3-Reemplazar 'º'(ordinal indicator) por 'o.'
  stringBuscado = "º";
  patt = new RegExp(stringBuscado, "g");
  let myStr = res.replace(patt, "o.");

  console.log(myStr);
  //llamar a funcion SeleccionarCaracteresEspecialesReemplazables
  myStr.replace(/./g, function (char) {
    return SeleccionarCaracteresEspecialesReemplazables(char);
  });
  return myStr;
}
export function SeleccionarCaracteresEspecialesReemplazables(char) {
  //console.log(char);
  let caracter = char.charCodeAt(0); //tomar int ascii del caracter
  //rango de ascii que usare 33-47,58-64,91-96, sino finalizar y devolver el caracter
  if (
    !(
      (caracter >= 33 && caracter <= 47) ||
      (caracter >= 58 && caracter <= 64) ||
      (caracter >= 91 && caracter <= 96) ||
      (caracter >= 123 && caracter <= 126) ||
      (caracter >= 128 && caracter <= 255)
    )
  ) {
    //console.log("rango que no sera modificado-->char: " + caracter);
    return caracter;
  }
  //    /*si por grupos separados*/
  //    if (caracter >= 39 && caracter <= 47) {
  //        console.log("entre 39 y 47");
  //        //return caracter;
  //    } else if(caracter>=58 && caracter<=64){
  //        console.log("entre 58 y 64");
  //        //return caracter;
  //    } else if(caracter>=91 && caracter<=93){
  //        console.log("entre 91 y 93");
  //        //return caracter;
  //    }

  //LISTA NEGRA (SI APARECEN SE REEMPLAZARAN POR VACIO)
  //33	!	(Exclamation mark)
  //37	%	(Percent sign)
  //38	&	(Ampersand)
  //94	^	(Caret or circumflex accent)
  //96	`	(Grave accent)
  //124	|	(vertical-bar, vbar, vertical line or vertical slash)
  //186       º       (Ordinal indicates)
  switch (caracter) {
    case 33:
    case 37:
    case 38:
    case 94:
    case 96:
    case 124:
    case 186:
      return 0;
      break;
    default:
      return caracter;
  }
  //PERMITIDOS --> caracteres especiales que no se modificaran
  // 34	"	(Quotation mark ; quotes)
  // 35	#	(Number sign)
  // 36	$	(Dollar sign)
  // 39	'	(Apostrophe)
  // 40	(	(round brackets or parentheses)
  // 41	)	(round brackets or parentheses)
  // 42	*	(Asterisk)
  // 43	+	(Plus sign)
  // 44	,	(Comma)
  // 45	-	(Hyphen)
  // 46	.	(Dot , full stop)
  // 47	/	(Slash)
  // 58	:	(Colon)
  // 59	;	(Semicolon)
  // 60	<	(Less-than sign)
  // 61	=	(Equals sign)
  // 62	>	(Greater-than sign ; Inequality)
  // 63	?	(Question mark)
  // 64	@	(At sign)
  // 91	[	(square brackets or box brackets)
  // 92	\	(Backslash)
  // 93	]	(square brackets or box brackets)
  // 95	_	(underscore , understrike , underbar or low line)
  return caracter;
}
//------------------------------------------------------------------------------------
//$$$$$$$$$$$$$$$$$ Tool de conversión- MANIPULACION DE STRING  $$$$$$$$$$$$$$$-fin

//DATEPICKER  |  DATETIMEPICKER------------------------------inicio
export function inicializarDatepicker(idDatepicker) {
  let $datepicker = $(idDatepicker);
  let setup = {};
  //    setup.language = 'es';
  //    setup.pickerPosition = 'bottom-right';
  //    setup.clearBtn=true;
  //    setup.format = 'dd/mm/yyyy';
  //    setup.startDate = '01/01/1900';
  //    setup.endDate = '31/12/2030';
  //    setup.startView = 0;  /*estaba-->2    0='hour'; 1='day' ; 2='month' ; 3='year' ;4='decade' ;Default mont view.*/
  //    setup.minView = 2;  /*la vista más baja que debe mostrar*/
  //    setup.maxView = 3; /*la vista más alta que debe mostrar*/
  //    setup.todayBtn = true; /*mostrarBotonHoy*/
  //    setup.todayHighlight = true; /*resaltarHoy*/
  //    setup.keyboardNavigation = true; /*boton de navegacion*/
  //    setup.forceParse = true;
  //    setup.viewSelect = 2;   /*'decade', 'year', 'month', 'day', 'hour' 4,3,2,1,0*/
  //    setup.autoclose = true;
  //    setup.initialDate = new Date(); /*'Fecha inicial: today'*/
  //    setup.pickTime=false;
  //console.log(setup);

  setup.pickerPosition = "bottom-right";
  setup.language = "es";
  setup.clearBtn = true;
  setup.todayBtn = true; //true; /*mostrarBotonHoy*/
  setup.todayHighlight = true; /*resaltarHoy*/

  setup.format = "dd/mm/yyyy";
  setup.startDate = "01/01/1900";
  setup.endDate = "31/12/2030";
  setup.startView = 0; /*estaba-->2    0='hour'; 1='day' ; 2='month' ; 3='year' ;4='decade' ;Default mont view.*/

  setup.minViewMode = 0; /*la vista más baja que debe mostrar*/
  setup.maxViewMode = 3; /*la vista más alta que debe mostrar*/
  setup.multidate = false;
  setup.autoclose = true;

  setup.keyboardNavigation = true; /*boton de navegacion*/
  setup.forceParse = true;
  setup.viewSelect = 2; /*'decade', 'year', 'month', 'day', 'hour' 4,3,2,1,0*/
  setup.initialDate = new Date(); /*'Fecha inicial: today'*/
  //setup.pickTime=false;
  $datepicker.datepicker(setup);
}
//SELECTPICKER
export function inicializar_selectpicker(idSelectPicker) {
  let $selectPicker = $(idSelectPicker);
  $selectPicker.selectpicker();
}
export function actualizar_selectpicker(idSelectPicker) {
  let $selectPicker = $(idSelectPicker);
  /*
     * poner nombre del select a elemento cuyo id="nombre_tipodoc"
     $('#nombre_tipodoc').val($('.selectpicker').val());
     */

  console.log("valor-->" + $(".selectpicker").val()); //imprime el valor
  //   console.log($('.selectpicker').val('val','Cedula de Identidad'));

  //$("#id_tipodoc").selectpicker('refresh');
  $selectPicker.selectpicker("refresh");
}
//DATEPICKER  |  DATETIMEPICKER---------------------------------fin

//======= VALIDACIONES, evaluaciones =========================================inicio
//TYPE (TIPO) --> eval(tipo))
export function isArray(obj) {
  //metodo simple isArray
  return obj.constructor === Array;
}
export function isTipo(objeto) {
  //isType función optimizada por mi(masr)
  let tipo = {};
  tipo.array = false;
  tipo.objeto = false;
  tipo.numerico = false;
  tipo.string = false;
  tipo.expresionesregulares = false;
  tipo.funcion = false;
  tipo.boleano = false;
  tipo.date = false;
  tipo.error = false;

  if (objeto.constructor === Array) {
    tipo.array = true;
  } else if (objeto.constructor === Object) {
    tipo.objeto = true;
  } else if (objeto.constructor === Number) {
    tipo.numerico = true;
  } else if (objeto.constructor === String) {
    tipo.string = true;
  } else if (objeto.constructor === RegExp) {
    tipo.expresionesregulares = true;
  } else if (objeto.constructor === Function) {
    tipo.funcion = true;
  } else if (objeto.constructor === Boolean) {
    tipo.boleano = true;
  } else if (objeto.constructor === Date) {
    tipo.date = true;
  } else if (objeto.constructor === Error) {
    tipo.error = true;
  }
  return tipo;
}
export function validarCampoEntradaNumerica(IdNombreCampo, mensajeAlerta) {
  //funcion que valida si la entrada en el campo y/o input es numerico
  let ok = true;
  let $campoNombre = $(IdNombreCampo);
  let valor = $campoNombre.val();
  if (valor.trim() === "" || valor === null || isNaN(valor)) {
    mostrar_mensaje(
      "Mensaje del Sistema",
      mensajeAlerta,
      "Aceptar",
      IdNombreCampo
    );
    $campoNombre.val(0);
    $campoNombre.select();
    ok = false;
  }
  return ok;
}

/*
//elimine esta funcion porque falta el modulo de clase que esta en otro lugar
export function recibirlote_validarAjaxBefore() {
  let ok = true;
  let id_lotesolicitado = document.querySelector("#id_lotesolicitado");
  let nombre_urgencia = document.querySelector("#nombre_urgencia");
  let fecha_lotesolicitado = document.querySelector("#fecha_lotesolicitado");
  // DE:
  let de_nombrescargo = document.querySelector("#de_nombrescargo");
  let de_sectorlocalempresa = document.getElementById("de_sectorlocalempresa");
  //  A:
  let a_nombrescargo = document.querySelector("#a_nombrescargo");
  let a_sectorlocalempresa = document.getElementById("a_sectorlocalempresa");
  //RECEPCION:
  let recepcion_nombres = document.getElementById("nombres_personasignable");
  let recepcion_cargo = document.getElementById("nombre_cargopersonasignable");
  let recepcion_sector = document.getElementById(
    "nombre_sectorpersonasignable"
  );
  let recepcion_local = document.getElementById("nombre_localpersonasignable");
  let recepcion_empresa = document.getElementById(
    "nombre_empresapersonasignable"
  );

  //let el3 = new miElementoHTML(nombres_personasolicitado);

  let el1 = new miElementoHTML(id_lotesolicitado);
  let el2 = new miElementoHTML(nombre_urgencia);
  let el3 = new miElementoHTML(fecha_lotesolicitado);
  let el4 = new miElementoHTML(de_nombrescargo);
  let el5 = new miElementoHTML(de_sectorlocalempresa);
  let el6 = new miElementoHTML(a_nombrescargo);
  let el7 = new miElementoHTML(a_sectorlocalempresa);
  let el8 = new miElementoHTML(recepcion_nombres);
  let el9 = new miElementoHTML(recepcion_cargo);
  let el10 = new miElementoHTML(recepcion_sector);
  let el11 = new miElementoHTML(recepcion_local);
  let el12 = new miElementoHTML(recepcion_empresa);

  let jarr = [];
  jarr.push(el1);
  jarr.push(el2);
  jarr.push(el3);
  jarr.push(el4);
  jarr.push(el5);
  jarr.push(el6);
  jarr.push(el7);
  jarr.push(el8);
  jarr.push(el9);
  jarr.push(el10);
  jarr.push(el11);
  jarr.push(el12);
  let el_prev = null;
//   let props = {};
//      let args = [`'${nombre_urgencia.value}','${nombreapellido.value}','${nombre_sector.value}'`];
//      let vdom = new virtualdom('el_validados', props, args);
//      let arr_validar = [];
  for (let item of jarr) {
    if (item.id === "nombres_personasignable") debugger;
    if (item.valor.trim() === "" || item.elemento === null) {
      if (item.elemento.readOnly) {
        let el = item.elemento;
        el_prev = el.parentElement.previousElementSibling.firstElementChild
          ? el.parentElement.previousElementSibling.firstElementChild
          : false;
        let mensaje = !el_prev
          ? "campo no puede estar vacio, para procesar la siguiente operación :( "
          : `Falta completar ${el_prev.placeholder}`;
        let id = !el_prev ? el.id : el_prev.id;
        mostrar_mensaje_validacion(
          "Validación del Sistema",
          mensaje,
          "Aceptar",
          `#${id}`
        );
      } else {
        log(item.elemento, item.id);
        mostrar_mensaje_validacion(
          "Validación del Sistema",
          `Falta completar ${item.elemento.placeholder}`,
          "Aceptar",
          `#${item.id}`
        );
        //window.scrollTo({top: 0, behavior: 'smooth'}); //mejor una animación suave
        //item.focus();  //agregado por mi
        //item.select();  //agregado por mi
      }
      ok = false;
      break;
    }
    if (!isNaN(item.valor)) {
      let numero = Number(item.valor);
      if (numero === 0 || numero < 0) {
        let el = item.elemento;
        let mensaje =
          numero < 0
            ? "no se admiten valores negativos :( "
            : `Falta completar ${el.placeholder}`;
        mostrar_mensaje_validacion(
          "Validación del Sistema",
          mensaje,
          "Aceptar",
          `#${el.id}`
        );
        ok = false;
        break;
      }
    }
  }
  return ok;
}
*/

//solicitarlote========FIN
//======= VALIDACIONES, evaluaciones ============================================fin

//=================LocalStorage===========================================inicio
export function guardarLocalStorage(nombreClave, json) {
  //guardar en el localStorege (cualquier objeto u array)
  //localStorage[nombreClave]=JSON.stringify(json);
  localStorage.setItem(nombreClave.toString(), JSON.stringify(json));
}
export function LocalStorage_AgregarArray(nombreClave, arrayJson) {
  //localStorage.setItem(nombreClave, JSON.stringify(objetoJson));
  let existing = JSON.parse(localStorage.getItem(nombreClave.toString()));

  existing.push(arrayJson);

  // Add new data to localStorage Array (Agregar nuevos datos a la matriz de almacenamiento local);

  // Save back to localStorage (Guardar de nuevo en almacenamiento local)
  localStorage.setItem(nombreClave.toString(), JSON.stringify(existing));
}
export function ExampleLocalStorage_AddArray(nombreClave, arrayJson) {
  //localStorage.setItem(nombreClave, JSON.stringify(objetoJson));
  // Get the existing data (Obtener los datos existentes)
  let existing = localStorage.getItem(nombreClave.toString());

  // If no existing data, create an array (Si no hay datos existentes, cree una matriz)
  // Otherwise, convert the localStorage string to an array (De lo contrario, convierte la cadena localStorage en una matriz)
  existing = existing ? existing.split(",") : [];

  // Add new data to localStorage Array (Agregar nuevos datos a la matriz de almacenamiento local)
  existing.push(arrayJson);

  // Save back to localStorage (Guardar de nuevo en almacenamiento local)
  localStorage.setItem(nombreClave.toString(), JSON.stringify(existing));
}
export function localstorage_add_or_update(
  keyNameLocalStorage,
  keyFinderInto,
  jsonPropuesto
) {
  /******* 'detalle-mostrado, detalle-agregado, detalle-modificado, detalle-eliminado'
     keyLocalStorageBuscado="Este parámetro es el nombre para acceder a una objeto|array almacenado en el local"
     keyFinderInto: Es el parámetro que será buscado dentro del json 
     .id_lineaDetalle
     *******/
  //evaluar existencia de detalle
  console.log("KeyNombre-->", keyNameLocalStorage);
  console.log("jsonPropuesto-->", jsonPropuesto);
  var list,
    encontrado = false;
  try {
    list = JSON.parse(localStorage[keyNameLocalStorage]);
    console.log(list);
  } catch (e) {
    console.log("inicial...");
    //si es objeto agregar a un array, de lo contrario pasar directamente el array al localStorage
    if (!isArray(jsonPropuesto)) {
      //ES OBJETO, PUSH ARRAY Y LUEGO AGREGAR AL LOCAL
      var TareaDetalleArray = [];
      TareaDetalleArray.push(jsonPropuesto);
      return (localStorage[keyNameLocalStorage] = JSON.stringify(
        TareaDetalleArray
      ));
    } else {
      //ES ARRAY, AGREGAR DIRECTAMENTE AL LOCAL
      return (localStorage[keyNameLocalStorage] = JSON.stringify(
        jsonPropuesto
      ));
    }
  }
  //if (JSON.parse(localStorage.getItem(keyNameLocalStorage))) {
  //    detalle = JSON.parse(localStorage.getItem(keyNameLocalStorage));
  //    list = detalle[0];
  //}
  var tipo = isTipo(list); //almacenar tipo para uso posterior
  console.log(tipo);
  //JSON ARRAY
  if (tipo.array) {
    //(MASR) --> FOREACH QUE USARE:
    console.log("-->array");
    var encontrado = false;
    for (var i in list) {
      console.log("list[" + i + "]-->", list[i]);
      //control de busqueda
      if (encontrado) {
        console.log("coincidencia encontrada...");
        break;
      }
      //evaluar si es objeto;
      if (list[i].constructor === Object) {
        let obj = list[i];

        //var count = 0;
        for (let k in obj) {
          //                    console.log("count-->", count++);
          //                    console.log("keyName-->" + k);
          //buscar en Objeto:
          if (k === keyFinderInto) {
            encontrado = true;
            let attrName = k;
            let attrValue = obj[k];
            console.log("analizado-->", attrName + ":" + attrValue);
            console.log("propuesto-->", jsonPropuesto[keyFinderInto]);
            if (attrValue === jsonPropuesto[keyFinderInto]) {
              encontrado = true;
              console.log("encontrado id_lineaDetalle similar:");
              console.log("before-->", list[i]);
              list[i] = jsonPropuesto;
              console.log("after-->", list[i]);
              localStorage[keyNameLocalStorage] = JSON.stringify(list);
              break;
            } else {
              console.log("i-->" + i + ", length-->" + list.length);
              if (i == list.length - 1) {
                console.log("ninguno igual:");
                //console.log("before-->", list[i]);
                list.push(jsonPropuesto);
                //console.log("after-->", list[i]);
                localStorage[keyNameLocalStorage] = JSON.stringify(list);
              }
            }
            break;
          }
        }
      }
      //aqui estaba linea comentada if list[i].constructor===Array {...}
    }
  }
  //JSON OBJECT
  if (tipo.objeto) {
    //(MASR) --> FOREACH QUE USARE:
    console.log("-->objeto");
    encontrado = false;
    var obj = list;
    for (let k in obj) {
      console.log("k", k);
      console.log("valor-->" + obj[k]);
      //buscar en Objeto:
      if (k === keyFinderInto) {
        encontrado = true;
        let attrName = k;
        let attrValue = obj[k];
        console.log(attrName + ":" + attrValue);
        console.log(list[i]);
        list[i] = jsonPropuesto;
        localStorage[keyNameLocalStorage] = JSON.stringify(list);
        break;
      }
    }
  }
}
export function localstorage_delete_update(
  keyNameLocalStorage,
  keyFinderInto,
  jsonPropuesto
) {
  /*******eliminar: 'detalle-mostrado, detalle-agregado, detalle-modificado'
     keyLocalStorageBuscado="Este parámetro es el nombre para acceder a una objeto|array almacenado en el local"
     keyFinderInto: Es el parámetro que será buscado dentro del json 
     .id_lineaDetalle
     *******/
  //evaluar existencia de keyNombre en el localStorage
  console.log("KeyNombre-->", keyNameLocalStorage);
  console.log("jsonPropuesto-->", jsonPropuesto);
  var list = [],
    encontrado = false;
  try {
    list = JSON.parse(localStorage[keyNameLocalStorage]);
    console.log(list);
    if (keyNameLocalStorage === "detalle-eliminado") {
      return null;
    }
  } catch (e) {
    if (keyNameLocalStorage === "detalle-eliminado") {
      console.log("inicial... delete--> detalle-eliminar");
      //si es objeto agregar a un array, de lo contrario pasar directamente el array al localStorage
      if (!isArray(jsonPropuesto)) {
        //ES OBJETO, PUSH ARRAY Y LUEGO AGREGAR AL LOCAL
        var TareaDetalleArray = [];
        TareaDetalleArray.push(jsonPropuesto);
        return (localStorage[keyNameLocalStorage] = JSON.stringify(
          TareaDetalleArray
        ));
      } else {
        //ES ARRAY, AGREGAR DIRECTAMENTE AL LOCAL
        return (localStorage[keyNameLocalStorage] = JSON.stringify(
          jsonPropuesto
        ));
      }
    }
  }
  var tipo = isTipo(list); //almacenar tipo para uso posterior
  console.log(tipo);
  //JSON ARRAY
  if (tipo.array) {
    console.log("-->array");
    var encontrado = false;
    for (var i = 0; i < list.length; i++) {
      //control de busqueda
      if (encontrado) {
        console.log("coincidencia encontrada...");
        break;
      }
      //evaluar si es objeto;
      if (list[i].constructor === Object) {
        var obj = list[i];
        var count = 0;
        for (var k in obj) {
          //buscar en Objeto:
          if (k === keyFinderInto) {
            var attrName = k;
            var attrValue = obj[k];
            if (attrValue === jsonPropuesto[keyFinderInto]) {
              console.log("encontrado=true-->i-->", i);
              encontrado = true;
              //delete list[i];
              console.log("antes de eliminar-->", list);
              list.splice(i, 1);
              console.log("despue de eliminado-->", list);
              localStorage[keyNameLocalStorage] = JSON.stringify(list);
              break;
            }
            //break;
          }
        }
      }
      //aqui estaba linea comentada if list[i].constructor===Array {...}
    }
  }
  //JSON OBJECT
  if (tipo.objeto) {
    //(MASR) --> FOREACH QUE USARE:
    console.log("-->objeto");
    encontrado = false;
    var obj = list;
    for (var k in obj) {
      console.log("k", k);
      console.log("valor-->" + obj[k]);
      //buscar en Objeto:
      if (k === keyFinderInto) {
        encontrado = true;
        var attrName = k;
        var attrValue = obj[k];
        console.log(attrName + ":" + attrValue);
        console.log(list[i]);
        //delete obj[k];
        obj = {};
        localStorage[keyNameLocalStorage] = JSON.stringify(obj);
        break;
      }
    }
  }
}
//busquedas:
export function buscarClaveObjetivo_Array(
  arrayList,
  clave_objetivo,
  jsonPropuesto
) {
  let encontrado = false;
  let arrayResultado = [];
  let tipo = isTipo(arrayList);
  console.log(tipo);
  if (tipo.objeto) {
    console.log("--> es un objeto Json");
    return arrayList;
  }
  for (let i = 0; i < arrayList.length; i++) {
    let evaluado = null;
    evaluado = buscarClaveObjetivo_Object(
      arrayList[i],
      clave_objetivo,
      jsonPropuesto
    );
    if (evaluado.constructor === Array) {
      //(Object.values(x).find(x => x==valor))==undefined?false:true;
      //evaluado.find(x => x==jsonPropuesto[clave_objetivo]);
      console.log(Object.values(evaluado));
      console.log("-->otro nivel de array, agruparlos");
      arrayResultado.push(evaluado.flat(1));
    } else {
      if (evaluado) {
        console.log("-->encontrado=true");
        encontrado = true;
        break;
      }
    }
  }
  console.log("arrayResultado.length-->" + arrayResultado.length);
  if (arrayResultado.length > 0) {
    console.log("-->vectores agrupado...");
    return arrayResultado;
  }
  return encontrado;
}
export function buscarClaveObjetivo_Object(obj, clave_objetivo, jsonPropuesto) {
  let arrayEncontrado = [];
  let encontrado = false;
  let tipo = isTipo(obj);
  //console.log(tipo);
  if (tipo.array) {
    console.log("no es un objeto, es un array");
    return obj;
  }

  for (let k in obj) {
    //console.log(k + ":",  obj[k]);
    if (obj[k].constructor === Array) {
      //console.log('constructor=array, agruparlos');
      arrayEncontrado.push(obj[k]);
    } else {
      if (k === clave_objetivo) {
        let attrName = k;
        let attrValue = obj[k];
        //console.log(jsonPropuesto[clave_objetivo]);
        if (attrValue === jsonPropuesto[clave_objetivo]) {
          encontrado = true;
          break;
        }
      }
    }
  }
  if (arrayEncontrado.length > 0) {
    return arrayEncontrado;
  }
  return encontrado;
}
//buscarClaveObjetivo_Array
export function buscarClaveObjetivo_ArrayRecorrer(
  arrayList,
  clave_objetivo,
  jsonPropuesto
) {
  let encontrado = false;
  if (!arrayList.constructor == Array) {
    console.log("objeto json, finalizar");
    return arrayList;
  }
  for (let i = 0; i < arrayList.length; i++) {
    let evaluado = null;
    evaluado = buscarClaveObjetivo_Object(
      arrayList[i],
      clave_objetivo,
      jsonPropuesto
    );
    if (evaluado.constructor === Array) {
      return evaluado;
    } else {
      if (evaluado) {
        console.log("-->encontrado=true");
        encontrado = true;
        break;
      }
    }
  }
  return encontrado;
}
export let localStorageGlobal = {
  numeroGuardado: 10,
  //const multiplyES6 = (x, y) => x * y;
  /*imprimirNumArrowFuncion: () => {console.log(this.NumeroGuardado, this);  
     alert("otra línea");
     },*/
  // eslint-disable-next-line no-undef
  imprimirNumArrowFunction: () => localStorageGeneral.NumeroGuardado,
  imprimirNumGuardado: function () {
    return this.NumeroGuardado;
  },
  crearClave: function (nombre_localstorage, jsonPropuesto) {
    let list;
    try {
      list = JSON.parse(localStorage[nombre_localstorage]);
      console.log("ya existe item denominado: " + nombre_localstorage, list);
      return false;
    } catch (e) {
      //si es objeto agregar a un array, de lo contrario pasar directamente el array al localStorage
      if (!isArray(jsonPropuesto)) {
        //ES OBJETO, PUSH ARRAY Y LUEGO AGREGAR AL LOCAL
        let TareaDetalleArray = [];
        TareaDetalleArray.push(jsonPropuesto);
        localStorage[nombre_localstorage] = JSON.stringify(TareaDetalleArray);
      } else {
        //ES ARRAY, AGREGAR DIRECTAMENTE AL LOCAL
        localStorage[nombre_localstorage] = JSON.stringify(jsonPropuesto);
      }
      console.log(
        "creado correctamente el item denominado: " + nombre_localstorage,
        list
      );
      return true;
    }
  },
  obtenerJson: function (nombre_localstorage) {
    let list = null;
    try {
      list = JSON.parse(localStorage[nombre_localstorage]);
      return list;
    } catch (e) {
      console.log(
        "no existe item denominado " +
          nombre_localstorage +
          " almacenado en el storage"
      );
      return false;
    }
  },
  eliminarClave: function (nombre_localstorage) {
    let list;
    try {
      list = JSON.parse(localStorage[nombre_localstorage]);
      //localStorage.removeItem(nombre_localstorage);
      delete localStorage[nombre_localstorage];
      console.log(
        "item Eliminado existosamente denominado: " + nombre_localstorage,
        list
      );
      return true;
    } catch (e) {
      console.log("no existe item denominado: " + nombre_localstorage);
      return false;
    }
  },
};
//=================LocalStorage===========================================fin

//--------------- manipulaciones JSON --------------------------------------------INICIO
//ARRAY --> NIVEL DE APLANAMIENTO PROFUNDO flatten deep
//para permitir el aplanamiento a nivel profundo use recursión con reduce y concat
export function flattenDeep(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
//  1-->BUSCAR EN UN SOLO OBJETO(por pares--> {KEY:VAL})
export function buscarEntries_enunObjeto(obj, keyBuscado, valBuscado) {
  let result = { encontrado: false, array: [] },
    arr1 = [];
  let temp = Object.entries(obj).some((item, index, arr) => {
    console.warn("buscarEntires-->" + index, item);
    if (item[0] === keyBuscado && item[1] === valBuscado) {
      result.encontrado = true;
      console.log("obj-->result-->", result);
      return result;
    }
    if (Array.isArray(item[1])) {
      arr1.push(item[1]);
    }
  });
  console.log(temp);
  console.log("obj-->resultOut-->", result);
  result.array = arr1.flat(1);
  //debugger;  --> crea un punto de interrupcion en el navegador
  return result;
}
//  2-->RECORRER JSONArray Y BUSCAR OBJETO A OBJETO
export function recorrerJsonArray_buscarEntries(
  jsonArray,
  keyBuscado,
  valBuscado
) {
  let result = { encontrado: false, array: [] },
    arrAcumulador = [];
  let esArray = Array.isArray(jsonArray) ? true : false;
  if (!esArray) {
    return result;
  }
  jsonArray.some((item, index, arr) => {
    let evaluado = null;
    console.log("recorrer_JsonArray-->", item);
    if (Array.isArray(item)) {
      arrAcumulador.push(item[1]);
    } else {
      evaluado = buscarEntries_enunObjeto(item, keyBuscado, valBuscado);
      if (evaluado.encontrado) {
        result.encontrado = true;
        return result;
      } else {
        if (evaluado.array.length > 0)
          arrAcumulador.push(evaluado.array.flat(1));
      }
    }
  });
  result.array = arrAcumulador.flat(1);
  return result;
}
//  3-->ULTIMA FUNCION DE BUSCAR (KEY:VALUE)
export function buscarKeyValue(objeto, keyBuscado, valBuscado) {
  let result = { encontrado: false, array: [] },
    arrAcumulador = [];
  let evaluado = null;
  let esArray = Array.isArray(objeto) ? true : false;
  if (esArray) {
    evaluado = recorrerJsonArray_buscarEntries(objeto, keyBuscado, valBuscado);
    if (evaluado.encontrado) {
      result.encontrado = true;
      return result;
    } else {
      evaluado = recorrerJsonArray_buscarEntries(
        evaluado.array,
        keyBuscado,
        valBuscado
      );
      result.encontrado = evaluado.encontrado;
      return result;
    }
  } else {
    evaluado = buscarEntries_enunObjeto(objeto, keyBuscado, valBuscado);
    if (evaluado.encontrado) {
      result.encontrado = true;
      return result;
    } else {
      evaluado = recorrerJsonArray_buscarEntries(
        evaluado.array,
        keyBuscado,
        valBuscado
      );
      result.array = evaluado.array;
      return result;
    }
  }
}
export function comprobarTernario(objeto, KeyBuscado, valBuscado) {
  valBuscado =
    typeof valBuscado === "number"
      ? valBuscado
      : valBuscado.hasOwnProperty(KeyBuscado)
      ? Array.isArray(valBuscado)
        ? valBuscado[0][KeyBuscado]
        : valBuscado[KeyBuscado]
      : "error KeyBuscado es miembro de objeto";
  console.log(valBuscado);
}
//--------------- manipulaciones JSON -----------------------------------------------FIN

export function tareadetalle(id_lineaDetalle) {
  //solo se hizo para evitar escribir cada instante, pero lo dejare para ilustracion
  //de como se crea un objeto en memoria
  let item = id_lineaDetalle;
  return {
    item: item,
    id_tareadetalle: item * 10,
    id_tareacabeceraLinea: "2",
    id_lineaDetalle: item,
    horainicio_tareadetalle: "13:00",
    horafin_tareadetalle: "12:00",
    id_sector: "3",
    nombre_sector: "Ag.2 - Cajas y Encargado",
    id_personasignable: "3",
    usuario_usuario: "guest",
  };
}

export function elementoPadre_select(elem) {
  //devuelve el elemento padre del elemento pasado como parametro
  let parent = elem.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
}

export function reiniciarInputs(node) {
  //funcion que inicializa [el node que debe ser un input] estableciendo si es numerico=0, String/date=""
  if (node.value !== "") {
    //valor no_vacio
    if (isNaN(Number(node.value))) {
      //no es numerico
      //--------evaluar si es date-------------
      //let isDate = (l.getDate !== undefined) ? true: false;
      let sFecha = cambiarFormatoFecha_ddMMYYYY_to_YYYYMMdd(node.value);
      if (sFecha) {
        node.value = "";
      } else {
        node.value = "";
      }
    } else {
      //numerico
      node.value = "0";
    }
  }
}
export function reiniciarInputsDateNow(node) {
  //igual que reiniciarInputs, pero a diferencia este devuelve en el tipo de datos fecha; la fecha actual
  if (node.value !== "") {
    //valor no_vacio
    if (isNaN(Number(node.value))) {
      //no es numerico
      //--------evaluar si es date-------------
      //let isDate = (l.getDate !== undefined) ? true: false;
      let sFecha = cambiarFormatoFecha_ddMMYYYY_to_YYYYMMdd(node.value);
      if (sFecha) {
        node.value = obtenerFechaActual();
      } else {
        node.value = "";
      }
    } else {
      //numerico
      node.value = "0";
    }
  }
}
export function validarInput24Horas(inputField) {
  let isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    inputField.value
  );
  if (isValid) {
    inputField.style.backgroundColor = "#bfa";
  } else {
    inputField.style.backgroundColor = "#fba";
  }
  return isValid;
}
export function validarInput24HorasHHmm(obj) {
  let timeValue = obj.value;
  //let colorDatoInvalido = '#fba'; //semi-rojo,tiende a rosado
  //let colorDatoCorrecto = '#bfa';//semi-verde,suave
  if (timeValue === "" || timeValue.indexOf(":") < 0) {
    //alert("Invalid Time format");
    //obj.style.backgroundColor = colorDatoInvalido;
    return false;
  } else {
    let sHours = Number(timeValue.split(":")[0]).toString();
    let sMinutes = Number(timeValue.split(":")[1]).toString();
    //console.log('hora-->', sHours, "\nmin-->", sMinutes);
    if (sHours === "" || isNaN(sHours) || parseInt(sHours) > 23) {
      //alert("Invalid Time format");
      //obj.style.backgroundColor = colorDatoInvalido;
      return false;
    } else if (parseInt(sHours) === 0) {
      sHours = "00";
    } else if (sHours < 10) {
      sHours = "0" + sHours;
    }
    if (sMinutes === "" || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
      //alert("Invalid Time format");
      //obj.style.backgroundColor = colorDatoInvalido;
      return false;
    } else if (parseInt(sMinutes) === 0) {
      sMinutes = "00";
    } else if (sMinutes < 10) {
      sMinutes = "0" + sMinutes;
    }
    //obj.style.backgroundColor = colorDatoCorrecto;
    obj.value = sHours + ":" + sMinutes;
  }
  return true;
}

export function permutarClass_correctaIncorrecta(
  sClassPadre,
  sClassCorrecta,
  sClassIncorrecta
) {
  //------3-------
  let nodeList = document.querySelectorAll("." + sClassPadre);
  Array.prototype.forEach.call(nodeList, (elem) => {
    if (elem.classList.contains(sClassCorrecta)) {
      elem.classList.remove(sClassCorrecta);
      if (!elem.classList.contains(sClassIncorrecta)) {
        elem.classList.add(sClassIncorrecta);
      }
    } else {
      elem.classList.add(sClassCorrecta);
      if (elem.classList.contains(sClassIncorrecta)) {
        elem.classList.remove(sClassIncorrecta);
      }
    }
  });
}
export function quitarAll_ClaseHijaDeClasePadre(sClassPadre, sClaseHija) {
  //quitar clase hija de todos los elementos con la clase padre
  let nodeList = document.querySelectorAll("." + sClassPadre);
  Array.prototype.forEach.call(nodeList, (elem) => {
    if (elem.classList.contains(sClaseHija)) {
      elem.classList.remove(sClaseHija);
    }
  });
}
export function agregarClase_a_elementoSeleccionado(
  elementoSeleccionado,
  sClaseAgregada
) {
  console.log(elementoSeleccionado.id);
  if (!elementoSeleccionado.classList.contains(sClaseAgregada)) {
    elementoSeleccionado.classList.add(sClaseAgregada);
  }
}
export function inicializar_claseInputHora() {
  quitarAll_ClaseHijaDeClasePadre("hora", "horaincorrecta");
  quitarAll_ClaseHijaDeClasePadre("hora", "horacorrecta");
}
//función creada para determinar el tipo de dato para formatear
//es decir si es numerico | date | string

//=============================================
/* export function check_isNumber(valor) {
    let resultado;
    let test_val = Number(valor);
    if (isNaN(test_val)) {
        resultado = "string";
        test_val = valor;
        // Object.prototype.toString.call(test_val) === '[object Date]'
        if (moment(test_val, "DD/MM/YYYY", true).isValid()) {
            resultado = "date";
        } else {
            test_val = valor;
        }
    } else {
        resultado = "numeric";
    }
    return { tipo: resultado, newval: test_val };
} */
//=============================================

//ESTE LO USE PARA OCULTAR COLUMNAS QUE NOS SE QUIEREN MOSTRAR EN: LOTESOLICITAR Y RECIBIR
export function show_hide_column(col_no, do_show) {
  //let stl=do_show?stl='block':stl='none';
  // let stl;
  // if (do_show) stl = 'block';
  // else         stl = 'none';
  let id_of_table = "tabla";
  let tbl = document.getElementById(id_of_table);
  let rows = tbl.getElementsByTagName("tr");

  for (let row = 0; row < rows.length; row++) {
    let cels = null;
    if (row === 0) {
      cels = rows[row].getElementsByTagName("th");
    } else if (row > 0) {
      cels = rows[row].getElementsByTagName("td");
    }
    //let cels =(row>0)?cels=rows[row].getElementsByTagName('td'):cels=rows[row].getElementsByTagName('th')
    //rows[0].style.visibility="visible"
    //cels[col_no].style.display=stl;
    //cels[col_no].style.visibility=stl;
    if (do_show) cels[col_no].removeAttribute("hidden");
    else cels[col_no].setAttribute("hidden", "hidden");
  }
}

export function ocultar_mostrar_columna(columna, do_show, idTabla = "tabla") {
  //versión mejorada de show_hide_column()
  //esta version hace exactamente lo mismo solo que como tercer parametro opcional
  //se establece como id='tabla' si no se establece, de lo contrario se usa el id pasodo por parametro

  //let stl=do_show?stl='block':stl='none';
  // let stl;
  // if (do_show) stl = 'block';
  // else         stl = 'none';
  let id_of_table = idTabla;
  let tbl = document.getElementById(id_of_table);
  let rows = tbl.getElementsByTagName("tr");

  for (let row = 0; row < rows.length; row++) {
    let cels = null;
    if (row === 0) {
      cels = rows[row].getElementsByTagName("th");
    } else if (row > 0) {
      cels = rows[row].getElementsByTagName("td");
    }
    //let cels =(row>0)?cels=rows[row].getElementsByTagName('td'):cels=rows[row].getElementsByTagName('th')
    //rows[0].style.visibility="visible"
    //cels[col_no].style.display=stl;
    //cels[col_no].style.visibility=stl;
    if (do_show) cels[columna].removeAttribute("hidden");
    else cels[columna].setAttribute("hidden", "hidden");
  }
}

export function agregarEventOnChange_inputHora() {
  //AGREGAR EVENTO a elmentos cuya clase='.hora'
  let inputsHora = document.getElementsByClassName("hora");

  //Recorres la lista de elementos seleccionados
  for (let i = 0; i < inputsHora.length; i++) {
    //Añadir o quitar eventos a cada input cuya clase sea .hora
    inicializar_claseInputHora(); //quitar clases horacorrecta y horaincorrecta
    inputsHora[i].addEventListener("change", function (event) {
      let elemento = event.target; //optener elemento seleccionado
      console.log(elemento.id); //id elemento seleccionado
      console.log(validarInput24HorasHHmm(elemento)); //validar
      if (validarInput24HorasHHmm(elemento)) {
        quitarAll_ClaseHijaDeClasePadre("hora", "horaincorrecta");
        agregarClase_a_elementoSeleccionado(elemento, "horacorrecta");
        //APLICA A UNA TABLA CUYO tr td input
        if (
          elemento.parentElement.nextElementSibling.firstElementChild
            .tagName === "BUTTON"
        ) {
          if (
            elemento.parentElement.nextElementSibling.nextElementSibling
              .firstElementChild === "INPUT"
          ) {
            elemento.parentElement.nextElementSibling.nextElementSibling.firstElementChild
              .focus()
              .select();
          }
        } else {
          if (
            elemento.parentElement.nextElementSibling.firstElementChild ===
            "INPUT"
          ) {
            elemento.parentElement.nextElementSibling.firstElementChild
              .focus()
              .select();
          }
        }
      } else {
        quitarAll_ClaseHijaDeClasePadre("hora", "horacorrecta");
        agregarClase_a_elementoSeleccionado(elemento, "horaincorrecta");
        elemento.focus();
      }
      //transcurrido 1 segundo quitar todo
      setTimeout(() => {
        inicializar_claseInputHora();
      }, 1000);
    });
  }
}

export function contains(src, test) {
  return src.indexOf(test) !== -1;
}
export function filtraElementByTagName(elemento_padre, nombre_tag) {
  /*
   * esta funcion retorna el primer elemento hijo filtrado que fue buscado que coincide con nombre_tag
   * el primer parametro elemento padre, el segundo nombre_tag es el nombre del tag a buscar dentro del elemento padre
   * solo se devuelve si existe coicidencia
   * */
  let filtrado = Array.prototype.filter.call(
    elemento_padre.children,
    (item) => {
      if (item.tagName === nombre_tag.toUpperCase()) {
        return item;
      }
    }
  );
  if (filtrado.length > 0) return filtrado[0];
}

//function show_hide_column(col_nro, do_show) {
//
//    let stl;
//    if (do_show) stl = 'block'
//    else         stl = 'none';
//
//    let tbl  = document.getElementById('id_of_table');
//    let rows = tbl.getElementsByTagName('tr');
//
//    for (let row=1; row<rows.length;row++) {
//      let cels = rows[row].getElementsByTagName('td')
//      cels[col_nro].style.display=stl;
//    }
//  }

//--------------------------------------------------------------
//escuchar el evento input para convertir todo a mayuscula
//bind input event
export let escucharEventKeyupInput = () => {
  //escuchar el evento input para convertir todo a mayuscula
  //bind input event
  $("#test").bind("input", function () {
    this.value = this.value.toUpperCase();
  });
  //bind keyup event
  $("#test2").bind("keyup", function () {
    this.value = this.value.toUpperCase();
  });
};
//--------------------------------------------------------------

export function cambiarNulos_o_Indefinidos(
  elemento_a_Reemplazar = "td",
  textoReemplazo = ""
) {
  //función que recorre todos los elementos(que por default es 'td', buscando si es null or undefided reemplazandolo por un textRemplazo que por default es ""
  let elems = document.querySelectorAll(elemento_a_Reemplazar);
  [].forEach.call(elems, function (item) {
    if (
      item.textContent.trim() === "null" ||
      item.textContent.trim() === "undefined"
    ) {
      item.textContent = "";
    }
  });
}
//$$$$$$$$$$  FUNCION QUE BUSCA UN TEXTO EN TABLA  $$$$$$$$$$$$$$$$$$$$$$$-----INICIO
export function buscarTexto_en_Tabla(textoBuscado, tablaId, index_columna) {
  //FUNCION QUE BUSCA UN TEXTO EN UNA COLUMNA DETERMINADA Y TABLA PROPORCIONADA POR PARAMETROS:
  // 1-> 'textoBuscado'= es el texto a ser buscado
  // 2-> 'tablaId'= es el Id de la tabla, o se puede pasar directamente el elementoTabla
  // 3-> 'index_columna' = es el número de columna iniciado en 1, contando de izquierda a derecha
  // El resultado es que muestra solo las filas que contienen coincidencia con en el valor 'textoBuscado'

  let tr, td, i, txtValue;
  let filter = textoBuscado.toUpperCase();

  let elTabla = document.getElementById(tablaId)
    ? document.getElementById(tablaId)
    : tablaId;
  //valido el element tabla
  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }

  //accion de busqueda --> BEGIN:
  tr = elTabla.getElementsByTagName("tr"); //fila
  index_columna = index_columna - 1; //ajustar el indice de columna para iniciar en cero
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[index_columna];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  //-->END
}

//MEJORADO BY ME (ver1.2)********************************************inicio
//buscarTextContent enElemento-->  function 'contains' estilo jquery
export function contienen(selector, text) {
  /*Descripción: funcion similar a $('selector:contains(text)',
   * retorna un array con los elementos resultantes de búsqueda
   * cuyo texContent(coinciden con ciertos patrones) --> querySelector('a[href *="solicitud"]')
   * */
  //--> Y luego llámalo así
  //  contains('div', 'sometext'); // find "div" that contain "sometext"
  //  contains('div', /^sometext/); // find "div" that start with "sometext"
  //  contains('div', /sometext$/i); // find "div" that end with "sometext", case-insensitive

  let elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    let textcontent = element.textContent || element.innerText || element.value;
    return RegExp(text).test(textcontent);
  });
}
//MEJORADO BY ME (ver1.2)***********************************************fin

export function getIndexColumn_from_table(td_seleccionado) {
  //let elTd = document.getElementById(tablaId)?document.getElementById(tablaId):tablaId;
  let elTd = td_seleccionado;
  //valido el element
  if (!elTd.nodeType === 1 || !(elTd instanceof HTMLElement)) {
    return false;
  }
  return td_seleccionado.cellIndex + 1;
}
//$$$$$$$$$$  FUNCION QUE BUSCA UN TEXTO EN TABLA  $$$$$$$$$$$$$$$$$$$$$$$--------FIN

//====================================
//Una vez que tenga su cadena JSON puede guardarla usando esta función:
export function saveText(text, filename) {
  let a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-u," + encodeURIComponent(text)
  );
  a.setAttribute("download", filename);
  a.click();
  /*
     Llámalo:
     let obj = {a: "Hello", b: "World"};
     saveText( JSON.stringify(obj), "filename.json" );
     */
}
//PROMISES
export function fadeInDone(id_render, delay = 500) {
  //Analogo a $('selector').fadeIn pero con promises
  return new Promise((resolve, reject) => {
    /*const number = Math.floor(Math.random() * max);
         setTimeout(
         () => number > expected ? resolve(number) :reject(new Error('número menor al esperado')), 
         delay
         );*/
    $(`#${id_render}`).fadeIn(delay, () => {
      //callback();
      resolve(true);
    });
  });
}
export function fadeOutDone(id_render, delay = 500) {
  //Analogo a $('selector').fadeOut pero con promises
  return new Promise((resolve, reject) => {
    /*HACER ALGO*/
    $(`#${id_render}`).fadeOut(delay, () => resolve(true));
  });
}
export function load_html(url, id_render) {
  //analogo a $('selector').load(url) pero con promises
  let render = document.getElementById(id_render);
  return fetch(url)
    .then(function (response) {
      console.log(response);
      return response.text();
    })
    .then(function (text) {
      //render.innerHTML = text;
      $(render).html(text);
    });
}
export function virtualdom_fn(type, props, ...args) {
  const children = args.length ? [].concat(...args) : null;
  return {
    type,
    props,
    children,
  };
}

// export let VirtualDOM = {
//   inicializar: function () {
//     let json_inicial = PanelIngreso.get();
//     return json_inicial;
//   },
//   getRotulos: function () {
//     //ROTULOS
//     //tomar el atributo name de los input y almacenarlos al array 'rotulos'
//     let named = document.getElementById("panel-ingreso");
//     let tags = named.getElementsByTagName("input");
//     let rotulos = [];

//     for (let i = 0, n = tags.length; i < n; i++) {
//       let nombre = "";
//       nombre = tags[i].name;
//       rotulos.push(nombre);
//     }
//     return rotulos;
//   },
//   empty: function () {
//     let json_inicial = null;
//     let json_final = null;
//     return true;
//   },
//   set: function (key, value) {
//     console.log("set fue llamado..");
//   },
//   get: function (key) {
//     let named = document.getElementById("panel-ingreso");
//     let tags = named.getElementsByTagName("input");
//     let panel_ingreso = [];

//     let registro = {};
//     for (let i = 0, n = tags.length; i < n; i++) {
//       let nombre = tags[i].name;
//       let valor = tags[i].value;
//       registro[nombre] = valor;
//     }
//     panel_ingreso.push(registro);
//     return panel_ingreso;
//   },
//   isChanged: function () {
//     //aqui hacer algo
//   },
// };

// export function vDOM() {
//   vdom = {};
// }
//CLONAR JSON(CREAR UNA COPIA DE OTRO JSON SIN QUE LO MODIFIQUE AL ORIGINAL)
export function jsonCopy(src) {
  //copiando su texto usando su JSON.stringify
  //te dará una copia profunda, Ahora mencionaré,
  //esta es una forma rápida y sucia de clonar profundamente un objeto.
  //Para una solución más robusta, recomendaría usar algo como 'lodash'
  return JSON.parse(JSON.stringify(src));
}
//Usando Object.assign
export function bestCopyEver(src) {
  //3er metodo el recomendado, pero cuidado hace una copia superficial y algunas propiedades se pasan por referencia
  return Object.assign({}, src);
}

//Usando Spread(Metodo directo) --> const clonePersona={...persona };
/*
 * Using the Object Spread operator:
 * El operador de propagación es una función ES6 / ES2015 que proporciona una forma muy conveniente de realizar un clon superficial,
 * equivalente a lo que Object.assign()hace.
 */

//-----------------------------------------------------------
//Preparar el JSON, es decir quitar de la Tabla html
//y formatear a JSON para su almacenamiento en la Base de Datos
export function resultJSON_loterecibir(tablaId) {
  let tabla = document.getElementById(tablaId);
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo los elementos th
  let elRotulos = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  //===> recorrer el body, retornar el json
  let json = [].map.call(elBody, (item, fila) => {
    //filtrar solo los 'td'
    let tds = [].filter.call(item.children, (i) => {
      //console.log(i);
      if (i.tagName === "TD") {
        return i;
      }
    });

    let objJson = {};
    //recorrer los tds filtrados
    Array.prototype.forEach.call(tds, (i, index) => {
      //rotulos(key)
      let key = elRotulos[0].children[index].textContent
        ? elRotulos[0].children[index].textContent
        : elRotulos[0].children[index].value
        ? elRotulos[0].children[index].value
        : null;

      //valor(value)
      let value;

      //obtener elemento evaluado, es hijo o no.
      let evalElement = i.children.length === 0 ? i : i.children[0];
      if (i.children.length > 0) {
        if (
          evalElement.tagName === "INPUT" &&
          evalElement.type === "checkbox"
        ) {
          //checkbox
          let valor = evalElement.checked ? true : false;
          value = valor;
        } else if (
          evalElement.tagName === "INPUT" &&
          evalElement.type === "text"
        ) {
          //text
          let valor = evalElement.textContent
            ? evalElement.textContent
            : evalElement.value
            ? evalElement.value
            : "";
          value = valor;
        }
      } else {
        //default td>text
        let valor = evalElement.textContent
          ? evalElement.textContent
          : evalElement.value
          ? evalElement.value
          : "";
        value = valor;
      }
      let hidden = i.hidden ? true : false;
      let tipo = evalElement.dataset.tipo;
      let valorformateado = value;
      value = tipo === "NUMERIC" ? quitar_formato_numero(value) : value;
      //json
      objJson[key] = {
        valor: value,
        valorformateado: valorformateado,
        hidden: hidden,
        tipo: tipo,
        fila: fila,
      };
    });
    return objJson;
  });
  return json;
}
let sameKeys = (jsonArray) => {
  return jsonArray.reduce((valAnt, valAct) => {
    //log(valAnt,valAct,Object.keys(valAct).length)
    let valor =
      Object.keys(valAct).length !== valAnt
        ? false
        : Object.keys(valAct).length;
    log("valor", valor);
    return valor;
  }, Object.keys(jsonArray[0]).length);
};
//version 2(mejorada) que retorna la cantidad de elementos de cada item del array si todos son iguales
let sameKeys2 = (jsonArray) => {
  let x = jsonArray.slice(0);
  return x.reduce((valAnt, valAct, index, arr) => {
    //log(valAnt, valAct, Object.keys(valAct).length);
    let valor =
      Object.keys(valAct).length !== valAnt
        ? false
        : Object.keys(valAct).length;
    //log('valor', valor);
    if (!valor) {
      //x=false;
      arr.splice(1); // eject early(expulsar temprano)
    }
    return valor;
  }, Object.keys(jsonArray[0]).length);
};

//-----------------------------------------------------------
//CONVERTIR EL JSON A UNA TABLA HTML
export function loterecibir_jsonToTable(jsonArr) {
  if (!sameKeys2(jsonArr)) {
    log(
      "no se puede procesar no es un array, o la cantidad de key es diferente en este array"
    );
    return false;
  }

  //FRAGMENT
  let fragment = document.createDocumentFragment();
  let elTabla = document.createElement("table");
  elTabla.classList.add(
    "table",
    "table-bordered",
    "table-hover",
    "table-striped",
    "table-condensed"
  );

  fragment.appendChild(elTabla.cloneNode(true));
  log(fragment);
  let tabla = fragment.children[0];

  //thead
  let el_thead = document.createElement("thead");

  let head = "<tr>";
  Object.entries(jsonArr[0]).forEach(([key, value]) => {
    let hidden = value.hidden ? ` hidden="hidden"` : "";
    head += `<th${hidden}>${key}</th>`;
  });
  if (head !== "<tr>") {
    head += `<th>Item</th>`;
  }
  head += "</tr>";
  el_thead.innerHTML = head;
  tabla.appendChild(el_thead);

  //tbody
  let tbody = "";
  [].forEach.call(jsonArr, (item, index) => {
    tbody += "<tr>";
    //ES8 (este es el estilo que usare para obtener los values)
    Object.values(item).forEach((value) => {
      //console.log(value) // key - value
      let dataset_tipo = value.tipo !== "" ? ` data-tipo="${value.tipo}"` : "";
      let valor =
        value.tipo === "NUMERIC"
          ? value.valorformateado
          : value.tipo === "CHECKBOX"
          ? value.valor
            ? "NO"
            : "SI"
          : value.valor;
      let hidden = value.hidden ? ` hidden="hidden"` : "";
      let formato =
        value.tipo === "NUMERIC" ? ` style="text-align: right;"` : "";
      tbody += `<td${dataset_tipo}${formato}${hidden}>${valor}</td>`;
    });
    if (Object.values(item).length > 0) {
      let indice = index + 1;
      //log(indice);
      tbody += `<td>${indice}</td>`;
    }
    tbody += "</tr>";
  });
  let el_tbody = document.createElement("tbody");
  el_tbody.id = "tbody_new";
  el_tbody.insertAdjacentHTML("beforeend", tbody);
  tabla.appendChild(el_tbody);
  return tabla;
}
//--------------------------------------------------------
export function tablaAddCheckObs(idTabla) {
  let tabla = document.getElementById(idTabla);
  let countCheck = 0,
    countNOcheck = 0;
  if (!tabla) {
    return false;
  }

  //............................................................
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item, index) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            //log('input type=checkbox  :)');
            let vecino;
            switch (true) {
              case index < 9: //entre 0 y 8
                if (index === 0) {
                  vecino =
                    evalElement.parentElement.nextElementSibling.children[0];
                  if (vecino && vecino.value.length === 0) {
                    vecino.value = "Falta fotocopia de cédula del titular";
                  }
                }
                evalElement.checked = true;
                countCheck++;
                return i;
                break;
              case index === 10: //index igual a 10-->check
                evalElement.checked = true;
                countCheck++;
                return i;
                break;
              default:
                //todos los demas evalElement.checked=false;
                vecino =
                  evalElement.parentElement.nextElementSibling.children[0];
                if (vecino && vecino.value.length === 0) {
                  if (index === 9) {
                    vecino.value =
                      "No recibido, s/ archivo esta en poder de Asesoría Jurídica";
                  } else if (index === 11) {
                    vecino.value = "No ubicado";
                  } else if (index === 12) {
                    vecino.value =
                      "No recibido, s/ archivo esta en poder de la Fiscalía Barrial Nro.2";
                  }
                }
                countNOcheck++;
                return i;
            }
          }
        }
      }
    });
  });
  return { check: countCheck, NOcheck: countNOcheck };
}

export function tablaToggleCheckAll(idTabla) {
  let tabla = document.getElementById(idTabla);
  if (!tabla) {
    return false;
  }

  //............................................................
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i, index) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            //log('input type=checkbox  :)');
            let vecino;
            let valor = evalElement.checked ? false : true;
            evalElement.checked = valor;
            return i;
          }
        }
      }
    });
  });
  return true;
}
export function tablaDeleteObs(idTabla) {
  let tabla = document.getElementById(idTabla);
  if (!tabla) {
    return false;
  }

  //............................................................
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            log("input type=checkbox  :)");
            let vecino =
              evalElement.parentElement.nextElementSibling.children[0];
            if (
              vecino &&
              vecino.tagName === "INPUT" &&
              vecino.type === "text"
            ) {
              vecino.value = "";
            }
          }
        }
      }
    });
  });
  return true;
}
export function tablaCheckAll(idTabla, check = true) {
  let elTabla = document.getElementById(idTabla)
    ? document.getElementById(idTabla)
    : idTabla;
  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }

  //............................................................
  let filas = elTabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i, index) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            evalElement.checked = check;
            return i;
          }
        }
      }
    });
  });
  return true;
}

//000000000000000000000 1er. Paso-Funcion formatearTabla
//==================================================================
//================formatear la tabla-previamente
//==================================================================
export function tablaPreformato(
  tablaId,
  nombreCloneTable = "clonTablaPreformateada"
) {
  //retorna una tabla preformateado como para informe sin input, es decir quitando los input y poniendo el texto  en el elemento 'td' de la tabla
  //USO:
  //          let tablaFormateada = tablaPreformato('tabla')
  //          let tablaPadre = tabla.parentElement
  //          tablaPadre.children[0].hidden=true;  //oculto table#tabla
  //          tablaPadre.appendChild(tablaFormateada)
  //**************************************************************************

  //FRAGMENT
  let fragment = document.createDocumentFragment();

  let elTabla = document.getElementById(tablaId)
    ? document.getElementById(tablaId)
    : tablaId;

  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }

  // Clonar el contenido del tbody en el fragment
  fragment.appendChild(elTabla.cloneNode(true));
  //log(fragment);
  let tabla = fragment.children[0];

  let filas = tabla.getElementsByTagName("tr");

  /*     //filtrar solo los elementos th
     let elRotulos = [].filter.call(filas, (item) => {
     if (item.querySelector('th')) {
     return item;
     }
     });           */

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  //checkados
  let elCheks = [].filter.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elemento elBody(row)
    let tds = [].filter.call(item.children, (i) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //verificar que tenga hermanos empezando por elementos a la izquierda
        //y por la derecha veficar que i tenga hijos realizar acciones con el input
        if (i.previousElementSibling !== null) {
          //obtener elemento evaluado,si no es hijo y si es hijo
          let evalElement = i.children.length === 0 ? i : i.children[0];
          if (i.children.length > 0) {
            if (
              evalElement.tagName === "INPUT" &&
              evalElement.type === "text"
            ) {
              //input
              //log('input type=text  :)');
              let valor = evalElement.textContent
                ? evalElement.textContent
                : evalElement.value
                ? evalElement.value
                : "";
              i.removeChild(evalElement);
              i.textContent = valor;
            }
          }
          //eval(
          //elThis.previousElementSibling.children.length>0 &&
          //elThis.previousElementSibling.children[0].type==='checkbox' &&
          //elThis.previousElementSibling.children[0].checked)

          //let valor=evalElement.checked?true:false; if(valor) return i;
          let hermano = i.previousElementSibling
            ? i.previousElementSibling
            : false;
          //log('hermano-->', hermano);
          if (
            hermano &&
            hermano.children.length > 0 &&
            hermano.children[0].type === "checkbox" &&
            hermano.children[0].checked
          ) {
            //checkbox(true)
            //console.log('chekbox :)')
            return i;
          }
        }
      }
    });
    //log('tds-->', tds, ' size-->', tds.length)
    if (tds.length > 0) {
      return item;
    }
  });
  //tabla.id='cloneTable'
  tabla.id = nombreCloneTable;
  //elTabla.parentElement.appendChild(tabla);
  return tabla;
}
//--------------------------------------------------------

//000000000000000000000 3er. Paso-funcion que ocultara agrupara los check (1:showCheck, 2:showNOchek)
export function tablaOcultarCheks(idTabla, checkValue, nombreCloneTabla) {
  //retorna una tabla resultante, de acuerdo al paramentro checkValue: 1==check, 2==uncheck, 3=='con observaciones'
  //USO; por ejemplo se puede agrupar asi: -->
  //      let clonTablaCheck = tablaOcultarCheks(tablaFormateada, 1, 'clonTablaCheck')
  //      let clonTablaNOchek = tablaOcultarCheks(tablaFormateada, 2, 'clonTablaNOcheck')
  //      let clonTablaNOcheckObs = tablaOcultarCheks('clonTablaPreformateada', 3, 'clonTablaNOchekObs')

  let elTabla = document.getElementById(idTabla)
    ? document.getElementById(idTabla)
    : idTabla;
  //FRAGMENT
  let fragment = document.createDocumentFragment();
  // Clonar el contenido del tbody en el fragment
  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }
  fragment.appendChild(elTabla.cloneNode(true));
  log(fragment);
  let tabla = fragment.children[0];

  //............................................................
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            //log('input type=checkbox  :)');
            let valor;
            switch (checkValue) {
              case 1: //mostrar checkados y ocultar los que no
                valor = evalElement.checked ? false : true;
                evalElement.parentElement.parentElement.hidden = valor;
                break;
              case 2: //mostrar los NO checkados y ocultar los que no
                valor = evalElement.checked ? true : false;
                evalElement.parentElement.parentElement.hidden = valor;
                break;
              case 3: //mostrar los NO chekados y con observacion
                valor = evalElement.checked ? true : false;
                let vecino = evalElement.parentElement.nextElementSibling;
                if (vecino && vecino.textContent.length > 0) {
                  valor = false;
                }
                evalElement.parentElement.parentElement.hidden = valor;
                break;
              default:
              //return caracter;
            }
            return i;
          }
        } else if (i.children.length === 0) {
          //no tiene hijos
          //<td>Texto<td>
          if (evalElement.dataset.tipo === "CHECKBOX") {
            //validar si es CHECKBOX
            let valor;
            switch (checkValue) {
              case 1: //mostrar 'SI' y ocultar los que 'NO'
                valor = evalElement.textContent === "NO" ? true : false;
                evalElement.parentElement.hidden = valor;
                break;
              case 2: //mostrar los NO checkados y ocultar los que no
                valor = evalElement.textContent === "NO" ? false : true;
                evalElement.parentElement.hidden = valor;
                break;
              case 3: //mostrar los NO chekados y con observacion
                valor = evalElement.textContent === "NO" ? true : false;
                let vecino = evalElement.parentElement.nextElementSibling;
                if (vecino && vecino.textContent.length > 0) {
                  valor = false;
                }
                evalElement.parentElement.hidden = valor;
                break;
              default:
              //return caracter;
            }
            return i;
          }
        }
      }
    });
  });
  tabla.id = nombreCloneTabla;
  return tabla;
}

//000000000000000000000 7mo. Paso - cambiar los check.value por 'SI' |  'NO'
//Cambiar el elemento checkbox por 'SI'===true, 'NO'===false, paso de argumento una elmento table
export function tablaChangeCheckForYesNo(idTabla) {
  //cambiar todos los checkbox  por valor SI|NO dependiendo de si esta checkado='SI', SINO 'NO'
  let elTabla = document.getElementById(idTabla)
    ? document.getElementById(idTabla)
    : idTabla;
  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }

  //............................................................
  let filas = elTabla.getElementsByTagName("tr");

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });
  //............................................................

  //checkados
  [].forEach.call(elBody, (item) => {
    //filtrar solo los 'td' por cada elBody(row)
    let tds = [].filter.call(item.children, (i, index) => {
      //solo los 'TD'
      if (i.tagName === "TD") {
        //log(i);
        //obtener elemento evaluado,si no es hijo y si es hijo
        let evalElement = i.children.length === 0 ? i : i.children[0];
        if (i.children.length > 0) {
          if (
            evalElement.tagName === "INPUT" &&
            evalElement.type === "checkbox"
          ) {
            //input
            //log('input type=checkbox  :)');
            let padre = evalElement.parentElement;
            let valor = evalElement.checked ? "SI" : "NO";
            padre.removeChild(evalElement);
            padre.textContent = valor;
            return i;
          }
        }
      }
    });
  });
  return true;
}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//      recorrer el body de la tabla y hacer el json
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export function resultJSON_loterecibir2(tablaId) {
  //convertir de una tabla html5 to-->JSON para ser enviado al servidor
  let tabla = document.getElementById(tablaId);
  let filas = tabla.getElementsByTagName("tr");

  //filtrar solo los elementos th
  let elRotulos = [].filter.call(filas, (item) => {
    if (item.querySelector("th")) {
      return item;
    }
  });

  //filtrar solo las fila de datos sin los th
  let elBody = [].filter.call(filas, (item) => {
    if (!item.querySelector("th")) {
      return item;
    }
  });

  //===> recorrer el body, retornar el json
  let json = [].map.call(elBody, (item, fila) => {
    //filtrar solo los 'td'
    let tds = [].filter.call(item.children, (i) => {
      //console.log(i);
      if (i.tagName === "TD") {
        return i;
      }
    });

    let objJson = {};
    //recorrer los tds filtrados
    Array.prototype.forEach.call(tds, (i, index) => {
      //rotulos(key)
      let key = elRotulos[0].children[index].textContent.trim().toLowerCase()
        ? elRotulos[0].children[index].textContent.trim().toLowerCase()
        : elRotulos[0].children[index].value.trim().toLowerCase()
        ? elRotulos[0].children[index].value.trim().toLowerCase()
        : null;

      //valor(value)
      let value;

      //obtener elemento evaluado, es hijo o no.
      let evalElement = i.children.length === 0 ? i : i.children[0];
      if (i.children.length > 0) {
        if (
          evalElement.tagName === "INPUT" &&
          evalElement.type === "checkbox"
        ) {
          //checkbox
          let valor = evalElement.checked ? true : false;
          value = valor;
        } else if (
          evalElement.tagName === "INPUT" &&
          evalElement.type === "text"
        ) {
          //text
          let valor = evalElement.textContent
            ? evalElement.textContent
            : evalElement.value
            ? evalElement.value
            : "";
          value = valor;
        }
      } else {
        //default td>text
        let valor = evalElement.textContent
          ? evalElement.textContent
          : evalElement.value
          ? evalElement.value
          : "";
        value = valor;
      }
      let hidden = i.hidden ? true : false;
      let tipo = evalElement.dataset.tipo;
      let valorformateado = value;
      value = tipo === "NUMERIC" ? quitar_formato_numero(value) : value;
      //json
      objJson[key] = {
        valor: value,
        valorformateado: valorformateado,
        hidden: hidden,
        tipo: tipo,
        fila: fila,
      };
    });
    return objJson;
  });
  return json;
}

//-----------------------------------------------------------
//CONVERTIR EL JSON A UNA TABLA HTML
export function loterecibir_jsonToTable1(jsonArr) {
  //(proceso inverso) entra un json y devuelve una tabla
  //esta versión inicial agrega un contador al final de la tabla
  if (!sameKeys2(jsonArr)) {
    log(
      "no se puede procesar no es un array, o la cantidad de key es diferente en este array"
    );
    return false;
  }

  //FRAGMENT
  let fragment = document.createDocumentFragment();
  let elTabla = document.createElement("table");
  elTabla.classList.add(
    "table",
    "table-bordered",
    "table-hover",
    "table-striped",
    "table-condensed"
  );

  fragment.appendChild(elTabla.cloneNode(true));
  log(fragment);
  let tabla = fragment.children[0];

  //thead
  let el_thead = document.createElement("thead");

  let head = "<tr>";
  Object.entries(jsonArr[0]).forEach(([key, value]) => {
    let hidden = value.hidden ? ` hidden="hidden"` : "";
    head += `<th${hidden}>${key}</th>`;
  });
  if (head !== "<tr>") {
    head += `<th>Item</th>`;
  }
  head += "</tr>";
  el_thead.innerHTML = head;
  tabla.appendChild(el_thead);

  //tbody
  let tbody = "";
  [].forEach.call(jsonArr, (item, index) => {
    tbody += "<tr>";
    //ES8 (este es el estilo que usare para obtener los values)
    Object.values(item).forEach((value) => {
      //console.log(value) // key - value
      let dataset_tipo = value.tipo !== "" ? ` data-tipo="${value.tipo}"` : "";
      let hidden = value.hidden ? ` hidden="hidden"` : "";
      //let valor=value.tipo==='NUMERIC'?value.valorformateado:value.valor
      let valor =
        value.tipo === "NUMERIC"
          ? value.valorformateado
          : value.tipo === "CHECKBOX"
          ? value.valor
            ? "SI"
            : "NO"
          : value.valor;
      let formato =
        value.tipo === "NUMERIC" ? ` style="text-align: right;"` : "";
      tbody += `<td${dataset_tipo}${formato}${hidden}>${valor}</td>`;
    });
    if (Object.values(item).length > 0) {
      let indice = index + 1;
      log(indice);
      tbody += `<td>${indice}</td>`;
    }
    tbody += "</tr>";
  });
  let el_tbody = document.createElement("tbody");
  el_tbody.id = "tbody_new";
  el_tbody.insertAdjacentHTML("beforeend", tbody);
  tabla.appendChild(el_tbody);
  return tabla;
}
//-----------------------------------------------------------
//CONVERTIR EL JSON A UNA TABLA HTML VERSION2
export function loterecibir_jsonToTable_v2(jsonArr) {
  //(proceso inverso) entra un json y devuelve una tabla versión 2(mejorada item delante)
  if (!sameKeys2(jsonArr)) {
    log(
      "no se puede procesar no es un array, o la cantidad de key es diferente en este array"
    );
    return false;
  }

  //FRAGMENT
  let fragment = document.createDocumentFragment();
  let elTabla = document.createElement("table");
  elTabla.classList.add(
    "table",
    "table-bordered",
    "table-hover",
    "table-striped",
    "table-condensed"
  );

  fragment.appendChild(elTabla.cloneNode(true));
  log(fragment);
  let tabla = fragment.children[0];

  //thead
  let el_thead = document.createElement("thead");

  let head = "<tr>";
  head += `<th>Item</th>`;
  Object.entries(jsonArr[0]).forEach(([key, value]) => {
    let hidden = value.hidden ? ` hidden="hidden"` : "";
    head += `<th${hidden}>${key}</th>`;
  });
  head += "</tr>";
  el_thead.innerHTML = head;
  tabla.appendChild(el_thead);

  //tbody
  let tbody = "";
  [].forEach.call(jsonArr, (item, index) => {
    tbody += "<tr>";
    if (Object.values(item).length > 0) {
      let indice = index + 1;
      //log(indice);
      tbody += `<td>${indice}</td>`;
    }
    //ES8 (este es el estilo que usare para obtener los values)
    Object.values(item).forEach((value) => {
      //console.log(value) // key - value
      let dataset_tipo = value.tipo !== "" ? ` data-tipo="${value.tipo}"` : "";
      let hidden = value.hidden ? ` hidden="hidden"` : "";
      //let valor=value.tipo==='NUMERIC'?value.valorformateado:value.valor
      let valor =
        value.tipo === "NUMERIC"
          ? value.valorformateado
          : value.tipo === "CHECKBOX"
          ? value.valor
            ? "SI"
            : "NO"
          : value.valor;
      let formato =
        value.tipo === "NUMERIC" ? ` style="text-align: right;"` : "";
      tbody += `<td${dataset_tipo}${formato}${hidden}>${valor}</td>`;
    });
    tbody += "</tr>";
  });
  let el_tbody = document.createElement("tbody");
  el_tbody.id = "tbody_new";
  el_tbody.insertAdjacentHTML("beforeend", tbody);
  tabla.appendChild(el_tbody);
  return tabla;
}

//------------contextMenu----------------------------------------------INICIO
export function fragmentMenuContextual(el) {
  let items = [
    {
      type: "item",
      title: "Marcar Todos",
      icon: "glyphicon glyphicon-check",
      fn: `tablaCheckAll('${el.parentElement.parentElement.parentElement.id}',true)`,
    },
    {
      type: "item",
      title: "Desmarcar Todos",
      icon: "glyphicon glyphicon-unchecked",
      fn: `tablaCheckAll('${el.parentElement.parentElement.parentElement.id}',false)`,
    },
    {
      type: "item",
      title: "Invertir Selección",
      icon: "",
      fn: `tablaToggleCheckAll('${el.parentElement.parentElement.parentElement.id}')`,
    },
  ];
  let menuHTML = `<style>
							.contextmenu{
								background-color:#ccc;
								border-style:solid;
								border-width:1px;
								width:100px;
								display:none;
								position: absolute;
							}
							.contextmenu td{
								border-bottom-style: solid;
								border-bottom-width: 1px;
								padding:2px;
								padding-left:4px;
							}
						</style>

						<!--Menu Contextual-->
						<div class="contextmenu">
							<table class="table table-hover table-condensed" style="background:#03c2fc;">`;
  items.forEach((item) => {
    let icono = item.icon === "" ? "glyphicon glyphicon-menu-right" : item.icon;
    menuHTML += `<tr onclick="${item.fn}"><td><span class="${icono}"></span>${item.title}</td></tr>`;
  });
  menuHTML += "</table></div>";
  //FRAGMENT(USARE TEMPLATE PARA USAR innerHTML)
  let renderer = document.createElement("template");
  renderer.innerHTML = menuHTML;

  // Clonar el contenido del tbody en el fragment  -->elTabla.cloneNode(true)

  //retornar el template.content, esto es analogo a devolver un fragment
  return renderer.content;
}
export function agregarMenuContextual(elementoId) {
  let el = document.getElementById(elementoId)
    ? document.getElementById(elementoId)
    : elementoId;
  if (!el.nodeType === 1 || !(el instanceof HTMLElement)) {
    return false;
  }
  let menuFragment = fragmentMenuContextual(el);
  document["body"].appendChild(menuFragment);
}

//AGREGAR EVENTO PARA QUE REACCIONE
export function escucharEventoContextMenu(el) {
  //    $(el).bind('contextmenu', function (event) {
  //        $(".contextmenu").css({"top": event.pageY + "px", "left": event.pageX + "px"}).show();
  //        event.preventDefault();
  //    });
  $(el).bind("contextmenu", function (event) {
    $(".contextmenu")
      .css({ top: event.pageY + "px", left: event.pageX + "px" })
      .show();
    event.preventDefault();
  });
  $(document).bind("click", function () {
    $(".contextmenu").hide();
  });
}
export function simulaEventContextMenu() {
  //simula disparado de funcion escucharEventoContextMenu(el) al hacer 'contextmenu' (click derecho)
  //1-->Crear Objeto Evento tipo 'click'
  let event = new Event("contextmenu");
  //indicamos el selector
  let el = document.querySelector(".context");
  //simulamos el evento por programación
  el.dispatchEvent(event);
}
export function mostrarMenuContextual(visible = true, top, left) {
  //top=event.pageY;
  //left=event.pageX;
  let menu = document.querySelector(".contextmenu");
  //mostrar
  if (visible) {
    menu.style.top = top + "px";
    menu.style.left = left + "px";
    menu.style.display = "block";
    //event.preventDefault();
  } else {
    menu.style.display = "none";
  }
}

//el.addEventListener('click',function(event){mostrarMenu(true,event.pageY,event.pageX)})
//document.addEventListener('click',function(event){mostrarMenu(false,event.pageY,event.pageX)})
//------------contextMenu-------------------------------------------------FIN

//============================================================================INICIO
//===CSS-Circular-Menu==============================================================
export function fragmentCssCircularMenu(el) {
  //obtener el id de la tabla en la cual se realizará la accción
  let idTabla = el.parentElement.parentElement.parentElement.id;

  let items = [
    {
      type: "item",
      title: "Marcar Todos",
      icon: "glyphicon glyphicon-check",
      fn: `tablaCheckAll('${idTabla}',true)`,
    },
    {
      type: "item",
      title: "Desmarcar Todos",
      icon: "glyphicon glyphicon-unchecked",
      fn: `tablaCheckAll('${idTabla}',false)`,
    },
    {
      type: "item",
      title: "Invertir Selección",
      icon: "glyphicon glyphicon-menu-right",
      fn: `tablaToggleCheckAll('${idTabla}')`,
    },
  ];

  let fragmt_css = `<style>
                            .css-circular-menu {
                                  font-size: 9px;
                                  position: relative;
                                  background: black;
                                  width: 1.4em;
                                  height: 1.4em;
                                  border-radius: 50%;
                                  /*margin: auto;*/
                                  margin-top: 0px;
                                  margin-bottom: -5px;
                                  cursor: pointer;
                                  border: 1.3em solid #110F0F;
                                }
                                .css-circular-menu:after {
                                  content: "";
                                  position: absolute;
                                  /*top: -0.4em;
                                  left:-0.6em;*/
                                  top: -4px;
                                  left:-5px;
                                  width: 1em;
                                  height: 0.8em;
                                  border-top: 0.4em double #fff;
                                  border-bottom: 0.1em solid #fff;
                                }
                                .css-circular-menu ul {
                                  list-style: none;
                                  padding: 0;
                                }
                                .css-circular-menu li {
                                  width: 9em;
                                  height: 1.9em;
                                  padding: 0.2em;
                                  margin-top: 0.6em;
                                  text-align: center;
                                  border-top-right-radius: 0.4em;
                                  border-bottom-right-radius: 0.8em;
                                  transition: all 1s;
                                  background: #110F0F;
                                  opacity: 0;
                                  z-index: -1;
                                }
                                .css-circular-menu:hover li {
                                  opacity: 0.8;
                                }
                                /**
                                 * Add a pseudo element to cover the space
                                 * between the links. This is so the menu
                                 * does not lose :hover focus and disappear
                                 */
                                .css-circular-menu:hover ul::before {
                                  position: absolute;
                                  content: "";
                                  width: 0;
                                  height: 0;
                                  display: block;
                                  left: 50%;
                                  top: -5.0em;
                                  /**
                                   * The pseudo-element is a semi-circle
                                   * created with CSS. Top, bottom, and right
                                   * borders are 6.5em (left being 0), and then
                                   * a border-radius is added to the two corners
                                   * on the right.
                                   */
                                  border-width: 6.5em;
                                  border-radius: 0 7.5em 7.5em 0;
                                  border-left: 0;
                                  border-style: solid;
                                  /**
                                   * Have to have a border color for the border
                                   * to be hoverable. I'm using a very light one
                                   * so that it looks invisible.
                                   */
                                  border-color: rgba(0,0,0,0.01);
                                  /**
                                   * Put the psuedo-element behind the links
                                   * (So they can be clicked on)
                                   */
                                  z-index: -1;
                                  /**
                                   * Make the cursor default so it looks like
                                   * nothing is there
                                   */
                                  cursor: default;
                                }
                                .css-circular-menu a {
                                  color: white;
                                  text-decoration: none;
                                  /**
                                   * This is to vertically center the text on the
                                   * little tab-like things that the text is on.
                                   */
                                  line-height: 1.5em;
                                }
                                .css-circular-menu a {
                                  color: white;
                                  text-decoration: none;
                                }
                                .css-circular-menu ul {
                                  transform: rotate(180deg) translateY(-1em);
                                  transition: 1s all;
                                }
                                .css-circular-menu:hover ul {
                                  transform: rotate(0deg) translateY(-0.5em);
                                }
                                .css-circular-menu li:hover {
                                  background: #423636;
                                  z-index: 10;
                                }

                                /*.menu li:nth-of-type(1) {
                                  transform: rotate(-90deg);
                                  position: absolute;
                                  left: -1.2em;
                                  top: -4.2em;
                                }*/
                                .css-circular-menu li:nth-of-type(1) {
                                  position: absolute;
                                  left: 0.8em;
                                  top: -1em;
                                }
                                .css-circular-menu li:nth-of-type(2) {
                                  transform: rotate(45deg);
                                  position: absolute;
                                  left: -1.3em;
                                  top: 2.5em;
                                }

                                .css-circular-menu li:nth-of-type(3) {
                                  transform: rotate(90deg);
                                  position: absolute;
                                  left: -4.6em;
                                  top: 3.3em;
                                }

                                .hint {
                                  text-align: center;
                                }
                                .contenedor-css-circular-menu{
                                    display: inline-block;
                                }
                      </style>`;

  let fragmt_HTML = fragmt_css;
  fragmt_HTML += `<!--CSS Circular Menu-->
                        <!--
                        <div class="css-circular-menu">
                            <ul>
                                <li onclick="alert('todos')"> <a href="#"><span class="glyphicon glyphicon-check"></span> Marcar Todos</a> </li>
                                <li onclick="alert('desmarcar')"> <a href="#"><span class="glyphicon glyphicon-unchecked"></span> Desmarcar Todos</a> </li>
                                <li onclick="alert('invertir')"> <a href="#"><span class="glyphicon glyphicon-menu-right"></span> Invertir Selección</a> </li> 
                            </ul>
                        </div>
                        -->
                        
                        <div class="contenedor-css-circular-menu">
                            <div class="css-circular-menu">
                                <ul>`;

  items.forEach((item) => {
    let icono = item.icon;
    let rotulo = item.title;
    let funcion = item.fn;
    fragmt_HTML += `<li onclick="${funcion}"> <a href="javascript:;"><span class="${icono}"></span> ${rotulo}</a> </li>`;
  });

  //cerramos los elementos
  fragmt_HTML += "</ul></div></div>";

  //FRAGMENT(USARE TEMPLATE PARA USAR innerHTML)
  let renderer = document.createElement("template");
  renderer.innerHTML = fragmt_HTML;

  // Clonar el contenido del tbody en el fragment  -->elTabla.cloneNode(true)

  //retornar el template.content, esto es analogo a devolver un fragment
  return renderer.content;
}
//===============================================================================FIN
export function fragmt_modal() {
  let items = {
    titulo: "TITULO DEL MODAL",
    icon: "glyphicon glyphicon-menu-right",
    fn: `log('modal activado');`,
  };
  //obtener el id de la tabla en la cual se realizará la accción
  //let idTabla = el.parentElement.parentElement.parentElement.id;

  //let fragmt_css = `<style></style>`;
  //let fragmt_HTML = fragmt_css;
  let fragmt_HTML = `<!-- MODAL-BEGIN  -->
                    <!-- <div class="modal hide fade" data-width="600">  -->
                    <div id="lightbox-template" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <!--
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">TITULO</h4>
                                    -->
                                    <button type="button" class="close modal-okcerrar" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4><i class="glyphicon glyphicon-thumbs-up centrado"></i> ${items.titulo}</h4>
                                </div>
                                <div class="modal-body" id="modal-body-content">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="modal-btn-aceptar" class="btn btn-primary pull-right modal-okcerrar" data-dismiss="modal">
                                        <span class="glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span>Aceptar
                                    </button>
                                </div>
                            </div><!--.modal-content-Fin -->
                        </div>
                    </div><!-- MODAL-END  -->`;

  //FRAGMENT(USARE TEMPLATE PARA USAR innerHTML)
  let renderer = document.createElement("template");
  renderer.innerHTML = fragmt_HTML;

  // Clonar el contenido del tbody en el fragment  -->elTabla.cloneNode(true)
  //retornar el template.content, esto es analogo a devolver un fragment
  return renderer.content;
}

export function obtenerAlturaAncho_de_elemento(elmnt) {
  //Obtenga toda la altura y el ancho de un elemento, incluido el relleno:
  return { scrollHeight: elmnt.scrollHeight, scrollWidth: elmnt.scrollWidth };
}
export function setFocus_a_filaTabla(idTabla, filaIndex) {
  //establecer y mover el foco a fila correspondiente de tabla indicada dentro del navegador
  //filaIndex: es le número de fila iniciando desde fila 1(uno)
  let indice = filaIndex > 0 ? filaIndex : false;
  //validar indice
  if (!indice) {
    return false;
  }
  //validar '#tabla' o elTabla{}
  let elTabla = document.getElementById(idTabla)
    ? document.getElementById(idTabla)
    : idTabla;
  if (!elTabla.nodeType === 1 || !(elTabla instanceof HTMLElement)) {
    return false;
  }
  //obtener elemento fila seleccionada a donque quiero move el foco
  let id_tabla = elTabla.id ? `table#${elTabla.id}` : "table:nth-child(1)";
  let elFilaSelect = document.querySelector(
    `${id_tabla} tbody>tr:nth-child(${indice})`
  );
  //mover el foco y activar
  //elFilaSelect.scrollIntoView(true);  //general
  elFilaSelect.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  //desactivar
  let filas = elTabla.querySelectorAll("tr");
  filas.forEach((row) => row.classList.remove("active"));
  //activar
  elFilaSelect.classList.add("active");
  /*  estilo que esta vigente
     .table-hover > tbody > tr:hover {
     background-color: #D4DADF;
     }
     */
  //elFilaSelect.classList.add(':hover');
  return true;
}

export function fragmentListaDesordenadaMenu() {
  let items = [
    {
      type: "item",
      title: "Archivo",
      icon: "glyphicon glyphicon-check",
      fn: `log('opcio1')`,
    },
    {
      type: "item",
      title: "Ver",
      icon: "glyphicon glyphicon-unchecked",
      fn: `log('Opcion2')`,
    },
    { type: "item", title: "Formato", icon: "", fn: `log('Opcion3')` },
  ];
  let menuHTML = `<!--Elemento: evento mouseover-->
                    <div class="wn-masthead">
                        <nav id="nav-hover" class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                            <a class="navbar-brand" href="index.html">
                                <img src="img/logo.png" width="30" height="30" class="d-inline-block align-top" alt="logo">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">
                                    Sitio de demostración de Bootstrap 4
                                    </font>
                                </font>
                            </a>
                            <ul id="test">`;
  items.forEach((item) => {
    let icono = item.icon === "" ? "glyphicon glyphicon-menu-right" : item.icon;
    menuHTML += `<li onclick="${item.fn}"><span class="${icono}"></span><a href="#">${item.title}</a></li>`;
  });
  menuHTML += "</ul></nav></div>";
  //FRAGMENT(USARE TEMPLATE PARA USAR innerHTML)
  let renderer = document.createElement("template");
  renderer.innerHTML = menuHTML;

  // Clonar el contenido del tbody en el fragment  -->elTabla.cloneNode(true)

  //retornar el template.content, esto es analogo a devolver un fragment
  return renderer.content;
}
//simular hover
export function simulaHover_mouseenter(elementId) {
  //validar '#element' o element{}
  let el = document.getElementById(elementId)
    ? document.getElementById(elementId)
    : elementId;
  if (!el.nodeType === 1 || !(el instanceof HTMLElement)) {
    return false;
  }
  el.addEventListener(
    "mouseenter",
    function (event) {
      // highlight the mouseenter target(resaltar al mover el mouse)
      event.target.style.color = "purple";

      // reset the color after a short delay
      setTimeout(function () {
        event.target.style.color = "";
      }, 500);
    },
    false
  );
}
export function simulaHover_mouseover(elementId) {
  //validar '#element' o element{}
  let el = document.getElementById(elementId)
    ? document.getElementById(elementId)
    : elementId;
  if (!el.nodeType === 1 || !(el instanceof HTMLElement)) {
    return false;
  }
  el.addEventListener(
    "mouseover",
    function (event) {
      // highlight the mouseenter target(resaltar al mover el mouse)
      event.target.style.color = "orange";

      // reset the color after a short delay
      setTimeout(function () {
        event.target.style.color = "";
      }, 500);
    },
    false
  );
}
//agregar y simular menu hover
export function agregarFragmntMenuHover() {
  let navMenuFragmnt = fragmentListaDesordenadaMenu();
  document["body"].appendChild(navMenuFragmnt);
  //escuchar evento click derecho y desactivar con cualquier click
  let elNavHover = document.getElementById(".wn-masthead");
  $(elNavHover).bind("contextmenu", function (event) {
    $(".wn-masthead")
      .css({ top: event.pageY + "px", left: event.pageX + "px" })
      .show();
    event.preventDefault();
  });
  $(document).bind("click", function () {
    $(".wn-masthead").hide();
  });
  let element_ul = document.getElementById("test");
  simulaHover_mouseover(element_ul);
}
export function mostrarMenu(
  top,
  left,
  selector = ".cotextmenu",
  visible = true
) {
  //top=event.pageY;
  //left=event.pageX;
  let menu = document.querySelector(selector);
  //mostrar
  if (visible) {
    menu.style.position = "absolute;";
    menu.style.display = "block";
    menu.style.top = top + "px";
    menu.style.left = left + "px";
    //event.preventDefault();
  } else {
    menu.style.display = "none";
  }
}

const AGREGAR = 0,
  MODIFICAR = 2,
  ELIMINAR = 3;
