export function getNextSem(lastSem) {
	const [year, sem] = lastSem.split('-');
	const yearNum = parseInt(year.substring(0, year.length - 1));
	const semNum = sem.charAt(0);
	const nextSem = semNum === 'M' ? `${yearNum + 1}Y-1S` : `${yearNum}Y-${semNum === '1' ? '2' : 'M'}S`;
	return nextSem;
}
