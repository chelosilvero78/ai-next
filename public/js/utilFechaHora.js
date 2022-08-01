function validarHora24HHmm(obj) {
    var timeValue = obj.value;
    //var colorDatoInvalido = '#fba'; //semi-rojo,tiende a rosado
    //var colorDatoCorrecto = '#bfa';//semi-verde,suave
    if (timeValue === "" || timeValue.indexOf(":") < 0) {
        //alert("Invalid Time format");
        //obj.style.backgroundColor = colorDatoInvalido;
        return false;
    } else {
        var sHours = Number(timeValue.split(':')[0]).toString();
        var sMinutes = Number(timeValue.split(':')[1]).toString();
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
function validarTest() {
    return true;
}

let utilDateTime={validarHora:validarHora24HHmm,validarTest:validarTest};

export default utilDateTime;

