self.onmessage = handleMessage

function handleMessage(e) {
	console.log(e.data);
	var hasilAkhir = parseFloat(e.data.uangAwal);
	for (var i = 0; i < e.data.lamaPenyimpanan; i++) {
		hasilAkhir += hasilAkhir * (parseFloat(e.data.sbpt) / 100);
	}
	console.log(hasilAkhir);
	e.data['hasilAkhir'] = hasilAkhir;
	postMessage(e.data);
}
