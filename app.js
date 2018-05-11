import * as dragon from "./dragon.js";

const DOM = {
	result: document.querySelector("#result"),
	width: document.querySelector("[name=width]"),
	generations: document.querySelector("[name=generations]"),
	coloring: document.querySelector("[name=coloring]"),
	thickness: document.querySelector("[name=thickness]")
}

function render() {
	let options = {
		width: Number(DOM.width.value),
		generations: Number(DOM.generations.value),
		coloring: DOM.coloring.value,
		thickness: Number(DOM.thickness.value)
	}

	let old = DOM.result.querySelector("canvas");
	if (old) { old.width = old.width; }

	setTimeout(() => {	
		let c = dragon.render(options);
		DOM.result.innerHTML = "";
		DOM.result.appendChild(c);
	}, 20);
}

function initControls() {
	let o = dragon.defaultOptions;
	DOM.width.value = o.width;
	DOM.generations.value = o.generations;
	DOM.coloring.value = o.coloring;
	DOM.thickness.value = o.thickness;

	document.addEventListener("change", e => render());
}

function init() {
	initControls();
	render();
}

init();