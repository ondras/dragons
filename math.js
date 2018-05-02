export function pointVsLine(p, a, b) {
	return Math.sign((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
}

export function computeCP(a, b, orientation) {
	let dir = [b[0]-a[0],b[1]-a[1]];
	let norm = [orientation*-1*dir[1], orientation*dir[0]];
	return [
		a[0]+dir[0]/2+norm[0]/2,
		a[1]+dir[1]/2+norm[1]/2
	];
}

export function mid(a, b) {
	return [a[0]+b[0],a[1]+b[1]].map($=>$/2)
}
