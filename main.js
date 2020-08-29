/* Attraverso una chiamata AJAX all’ Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
In questo momento non è importante la parte grafica. */

$(document).ready(function () {

	$.ajax({
		"url": "https://flynn.boolean.careers/exercises/api/array/music",
		"method": "GET",
		success: function (data) {

			transformAttr(data.response, 'genre');


			let allCategory = reduceCategory(data.response, 'genre');
			// crea il DOM
			createDOM(data.response);
			// crea le opzioni delle checkbox DINAMICAMENTE
			createOptions(data.response);

			// funzione al change di una checkbox
			$('input').change(controlCheck);
		},
		'error': function (richiesta, stato, errori) {
			alert("E' avvenuto un errore.");
		}
	});
});


/* FUNZIONI */

// Trasforma in lowerCase un attributo di un oggetto in un array

function transformAttr(arr, attr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i][attr] = arr[i][attr].toLowerCase();
	}
}

// popolazione del DOM
function createDOM(obj) {
	var source = $('#template').html();
	var template = Handlebars.compile(source);
	for (var i = 0; i < obj.length; i++) {
		var html = template(obj[i]);
		$('.cds-container').append(html);
	}
}

// Creazione dinamica delle option delle checkbox
function createOptions(obj) {
	$('header').after('<div id="check-box"></div');
	var allCategory = reduceCategory(obj, 'genre');
	console.log(allCategory);
	for (var i = 0; i < allCategory.length; i++) {
		$('#check-box').append(`<div class='box'>	<input type="checkbox" id="genere${i}" value="${allCategory[i]}"><label  for = "genere${i}" > ${allCategory[i].toUpperCase()} </label> </div>`);
	}
}

// Controllo il cambio di 'checked' nelle checkbox e mostro o nascondo di conseguenza gli elementi con 'genre' = valore checkbox
function controlCheck() {
	let countUnCheck = 0;
	for (let i = 0; i < 4; i++) {
		let thisCategory = $(`#genere${i}`);
		if (!thisCategory.prop('checked')) {
			$('.cd.' + thisCategory.val()).hide();
			countUnCheck++;
		} else {
			$('.cd.' + thisCategory.val()).show();
		}
	}
	if (countUnCheck == 0 || countUnCheck == 4) {
		$('.cd').show();
	}
}




// riduce array di oggetti per attributo
function reduceCategory(arr, attr) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (!result.includes(arr[i][attr])) {
			result.push(arr[i][attr])
		}
	}
	return result
}

// capitalizza una stringa
function capitalize(stringa) {
	var primoCarattere = stringa.charAt(0).toUpperCase();
	return primoCarattere + stringa.slice(1).toLowerCase();
};