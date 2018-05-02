import * as dragon from "./dragon.js";

const DOM = {
	result: document.querySelector("#result"),
	width: document.querySelector("#width"),
	autoRender: document.querySelector("#autorender"),
	render: document.querySelector("#render"),
	generations: document.querySelector("#generations"),
	thickness: document.querySelector("#thickness"),
	thicknessDecay: document.querySelector("#thicknessdecay"),
	shadowColor: document.querySelector("#shadowcolor"),
	shadowBlur: document.querySelector("#shadowblur"),
}

function render() {
	let options = {
		width: DOM.width.valueAsNumber,
		generations: DOM.generations.valueAsNumber,
		thickness: DOM.thickness.valueAsNumber,
		thicknessDecay: DOM.thicknessDecay.valueAsNumber / 100,
		shadowColor: DOM.shadowColor.value,
		shadowBlur: DOM.shadowBlur.valueAsNumber / 100
	}
	DOM.result.innerHTML = "";
	let c = dragon.render(options);
	DOM.result.appendChild(c);
}

function onChange(e) {
	if (!DOM.autoRender.checked) { return; }
	render();
}

function initControls() {
	let o = dragon.defaultOptions;
	DOM.width.value = o.width;
	DOM.generations.value = o.generations;
	DOM.thickness.value = o.thickness;
	DOM.thicknessDecay.value = o.thicknessDecay * 100;
	DOM.shadowColor.value = o.shadowColor;
	DOM.shadowBlur.value = o.shadowBlur * 100;

	function sync(input) {
		input.nextSibling.innerHTML = input.value;
	}
	Array.from(document.querySelectorAll("[type=range]")).forEach(input => {
		input.addEventListener("input", e => sync(e.target));
		sync(input);
	});

	document.addEventListener("input", onChange);
	DOM.autoRender.addEventListener("click", onChange);
}

function init() {
	initControls();
	render();
}

init();