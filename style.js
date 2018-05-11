function width(depth, options) {
	return options.width * options.thickness * (options.thicknessDecay ** depth);
}

function hue(depth, offset) {
	let step = 30;
	let range = 90;
	return offset + (depth * step) % range;
}

export function apply(ctx, depth, options) {
	let w = width(depth, options);
	ctx.lineWidth = w;
	ctx.shadowBlur = w * options.shadowBlur;
	let frac = depth / (options.generations-1);

	switch (options.coloring) {
		case "black": 
			ctx.strokeStyle = "#000";
			ctx.shadowColor = "#fff";
		break;

		case "reds": 
			ctx.strokeStyle = `hsl(${hue(depth, 0)}, 100%, 50%)`;
			ctx.shadowColor = "#000";
		break;

		case "greens": 
			ctx.strokeStyle = `hsl(${hue(depth, 120)}, 100%, 50%)`;
			ctx.shadowColor = "#000";
		break;

		case "blues": 
			ctx.strokeStyle = `hsl(${hue(depth, 240)}, 100%, 50%)`;
			ctx.shadowColor = "#000";
		break;

		case "hue": 
			ctx.strokeStyle = `hsl(${360*depth/options.generations}, 100%, 50%)`;
			ctx.shadowColor = "#000";
		break;
	}
}
