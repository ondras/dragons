function width(depth, options) {
	return options.thickness * (options.thicknessDecay ** depth);
}

export function apply(ctx, depth, options) {
	let w = width(depth, options);
	ctx.lineWidth = w;
	ctx.shadowBlur = w * options.shadowBlur;
	ctx.shadowColor = options.shadowColor;

	switch (options.coloring) {
		case "solid": ctx.strokeStyle = "#000"; break;
		case "hue1": 
			ctx.strokeStyle = `hsl(${360 * (depth % 4) / options.generations}, 100%, 50%)`;
		break;
		case "hue": 
			ctx.strokeStyle = `hsl(${360 * depth / options.generations}, 100%, 50%)`;
		break;
	}
}
