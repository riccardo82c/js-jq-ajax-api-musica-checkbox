/* Attraverso una chiamata AJAX all’ Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo.
In questo momento non è importante la parte grafica. */

$(document).ready(function () {

	$.ajax({
		"url": "https://flynn.boolean.careers/exercises/api/array/music",
		"method": "GET",
		success: function (data) {

			// trasformo minuscolo un attributo di un array di oggetti
			transformAttr(data.response, 'genre');

			// creo array di category
			const allCategory = reduceCategory(data.response, 'genre');

			// crea il DOM
			createDOM(data.response);
			// crea le opzioni delle checkbox DINAMICAMENTE
			createOptions(allCategory);

			// funzione al change di una checkbox
			$('input').change(allCategory, controlCheck);
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
function createOptions(categories) {
	$('header').after('<div id="check-box"></div');
	/* var allCategory = reduceCategory(obj, 'genre'); */

	for (var i = 0; i < categories.length; i++) {
		$('#check-box').append(`<div class='box'>	<input type="checkbox" id="genere${i}" value="${categories[i]}"><label  for = "genere${i}" > ${categories[i].toUpperCase()} </label> </div>`);
	}
}

// Controllo il cambio di 'checked' nelle checkbox e mostro o nascondo di conseguenza gli elementi con 'genre' = valore checkbox
function controlCheck(obj) {
	let countUnCheck = 0;

	for (let i = 0; i < obj.data.length; i++) {
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


// riduce array di oggetti per attributo e lo ordina
function reduceCategory(arr, attr) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (!result.includes(arr[i][attr])) {
			result.push(arr[i][attr])
		}
	}
	return result.sort();
}

// capitalizza una stringa
function capitalize(stringa) {
	var primoCarattere = stringa.charAt(0).toUpperCase();
	return primoCarattere + stringa.slice(1).toLowerCase();
};