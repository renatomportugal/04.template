/* Formatação para qualquer mascara */

function formatar(src, mask)
{
var i = src.value.length;
var saida = mask.substring(0,1);
var texto = mask.substring(i)
if (texto.substring(0,1) != saida)
{
src.value += texto.substring(0,1);
}
}

/* Valida Data */

var reDate4 = /^((0?[1-9]|[12]\d)\/(0?[1-9]|1[0-2])|30\/(0?[13-9]|1[0-2])|31\/(0?[13578]|1[02]))\/(19|20)?\d{2}$/;
var reDate = reDate4;

function doDateVenc(Id, pStr, pFmt){
d = document.getElementById(Id);
if (d.value != ""){
if (d.value.length < 10){
alert("Data Inválida!\nDigite corretamente a data: dd/mm/aaaa !");
d.value="";
d.focus();
return false;
}else{

eval("reDate = reDate" + pFmt);
if (reDate.test(pStr)) {
return false;
} else if (pStr != null && pStr != "") {
alert("ALERTA DE ERRO!!\n\n" + pStr + " NÃO é uma data válida.");
d.value="";
d.focus();
return false;
}
}
}else{
return false;
}
}
/*
function aparece(){
if(document.getElementById("velho").checked){
document.forms[0].mais50.style.visibility="visible";
document.forms[0].menos50.style.visibility="hidden";
}
else {
document.forms[0].menos50.style.visibility="hidden";
document.forms[0].mais50.style.visibility="hidden";
}
}
*/

$(document).ready(function() {
  var dateMin = new Date();
  var weekDays = AddWeekDays(1);
  dateMin.setDate(dateMin.getDate() + weekDays);
  var natDays = [
    //Ano Novo
    [12, 30, 'uk'],
    [12, 31, 'uk'],
    [1, 1, 'uk'],
    
    //Emancipação do Município de Novo Hamburgo
    [4, 3, 'uk'],
    [4, 4, 'uk'],
    [4, 5, 'uk'],
    
    //Tiradentes
    [4, 19, 'uk'],
    [4, 20, 'uk'],
    [4, 21, 'uk'],
        
    //Dia do Trabalho
    [4, 29, 'uk'],
    [4, 30, 'uk'],
    [5, 1, 'uk'],
    
    //Independência do Brasil
    [9, 5, 'uk'],
    [9, 6, 'uk'],
    [9, 7, 'uk'],
    
    //Revolução Farroupilha
    [9, 18, 'uk'],
    [9, 19, 'uk'],
    [9, 20, 'uk'],
    
    //Nossa Senhora Aparecida - Padroeira
    [10, 10, 'uk'],
    [10, 11, 'uk'],
    [10, 12, 'uk'],
    
    //Finados
    [10, 31, 'uk'],
    [11, 1, 'uk'],
    [11, 2, 'uk'],
    
    //Proclamação da República
    [11, 13, 'uk'],
    [11, 14, 'uk'],
    [11, 15, 'uk'],
    
    //Natal
    [12, 23, 'uk'],
    [12, 24, 'uk'],
    [12, 25, 'uk'],
   
    //Datas não fixas
    
    //Carnaval
    [3, 3, 'uk'],
    [3, 4, 'uk'],
    [3, 5, 'uk'],
        
     //Sexta-feira Santa
    [4, 17, 'uk'],
    [4, 18, 'uk'],
    [4, 19, 'uk'],
    
    //Páscoa
    [4, 19, 'uk'],
    [4, 20, 'uk'],
    [4, 21, 'uk'],
    
    //Ascensão do Senhor
    [5, 28, 'uk'],
    [5, 29, 'uk'],
    [5, 30, 'uk'],
    
    //Corpus Christi
    [6, 18, 'uk'],
    [6, 19, 'uk'],
    [6, 20, 'uk']
  ];

  function noWeekendsOrHolidays(date) {
    var noWeekend = $.datepicker.noWeekends(date);
    if (noWeekend[0]) {
      return nationalDays(date);
    } else {
      return noWeekend;
    }
  }

  function nationalDays(date) {
    for (i = 0; i < natDays.length; i++) {
      if (date.getMonth() == natDays[i][0] - 1 && date.getDate() == natDays[i][1]) {
        return [false, natDays[i][2] + '_day'];
      }

    }
    return [true, ''];
  }

  function AddWeekDays(weekDaysToAdd) {
    var mydate = new Date();
    if (mydate.getHours() >= 10) var daysToAdd = 1;
    else var daysToAdd = 0;
    var day = mydate.getDay()
    weekDaysToAdd = weekDaysToAdd - (5 - day)
    if ((5 - day) < weekDaysToAdd || weekDaysToAdd == 1) {
      daysToAdd = (5 - day) + 2 + daysToAdd
    } else { // (5-day) >= weekDaysToAdd
      daysToAdd = (5 - day) + daysToAdd
    }
    while (weekDaysToAdd != 0) {
      var week = weekDaysToAdd - 5
      if (week > 0) {
        daysToAdd = 7 + daysToAdd
        weekDaysToAdd = weekDaysToAdd - 5
      } else { // week < 0
        daysToAdd = (5 + week) + daysToAdd
        weekDaysToAdd = weekDaysToAdd - (5 + week)
      }

    }
    return daysToAdd;
  }

  jQuery('#datepicker').datepicker({
    minDate: dateMin,
    minDate: 30,
    defaultDate: +1,
    firstDay: 0,
    changeFirstDay: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    constrainInput: true,
    beforeShowDay: function(day) {
      if (day.getDay() < 1 || day.getDay() > 4) {
        return [false, ""];
      }
      return noWeekendsOrHolidays(day);
    }
  });
  // Quando houver uma alteração no valor do input days
  jQuery('#days').change(function() {
    // Se o valor do input datepicker estiver vazio, não faz nada
    if(jQuery("#datepicker").val() == "" ) return;
    // Pego a data do input datepicker
    var date = $("#datepicker").datepicker("getDate");
    // Adiciono o valor de dias digitado no input days
    date.setDate(date.getDate() + Number(this.value));
    // Seto a data no input return
    $("#return").datepicker("setDate", date);
  });
  jQuery('#return').datepicker({
    dateFormat: "dd/mm/yy",
  }); 
});