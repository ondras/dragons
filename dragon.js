import * as math from "./math.js";
import * as style from "./style.js";

export const defaultOptions = {
	generations: 15,
	width: 800,
	thickness: 0.02,
	thicknessDecay: 0.7,
	coloring: "reds",
	shadowBlur: 0.75
}

let lastCP, ctx;

function curve(a, b, cp, depth) {
	if (depth) {
		let cp1 = math.computeCP(a, cp, 1);
		curve(a, cp, cp1, depth-1);
		let cp2 = math.computeCP(cp, b, -1);
		curve(cp, b, cp2, depth-1);
		return;
	}
	
	if (!lastCP) {
		let mid = math.mid(a, b);
		let vec = [mid[0]-cp[0],mid[1]-cp[1]];
		lastCP = [mid[0]+vec[0],mid[1]+vec[1]];
	}
	drawArc(lastCP, a, cp);
	drawArc(a, cp, b);
	lastCP = cp;
}

function drawArc(p1, p2, p3) {
	let mid1 = math.mid(p1, p2);
	let mid2 = math.mid(p2, p3);
	let center = math.mid(p1, p3);
	let vec = [p2[0]-p1[0], p2[1]-p1[1]];
	let dist = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);

	let a1 = Math.atan2(mid1[1]-center[1], mid1[0]-center[0]);
	let a2 = Math.atan2(mid2[1]-center[1], mid2[0]-center[0]);
	
	let pvl = math.pointVsLine(p3, p1, p2);
	let ccw = (pvl == -1);
	ctx.arc(...center, dist/2, a1, a2, ccw);
}

function generation(depth, options) {
	lastCP = null;
	style.apply(ctx, depth, options);

	let p1 = [ctx.canvas.width*1/4, ctx.canvas.height/2];
	let p2 = [ctx.canvas.width*3/4, ctx.canvas.height/2];
	let cp1 = math.computeCP(p1, p2, 1);
	let cp2 = math.computeCP(p2, p1, 1);

	ctx.beginPath();
	curve(p1, p2, cp1, depth);
	curve(p2, p1, cp2, depth);
	ctx.stroke();
}

export function render(options) {
	let o = Object.assign({}, defaultOptions, options);
	ctx = document.createElement("canvas").getContext("2d");

	ctx.canvas.width = o.width;
	ctx.canvas.height = ctx.canvas.width / 1.25;

	let i = o.generations;
	while (i-->0) { generation(i, o); }
	return ctx.canvas;
}
