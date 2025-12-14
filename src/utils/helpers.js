function generateID(arr) {
	return arr.length ? arr[arr.length - 1].id + 1 : 1;
}

module.exports = { generateID };
