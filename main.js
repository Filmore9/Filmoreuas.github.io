if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
    	var checkhasil = localStorage.getItem('hasilAkhir');
    	var checknama = localStorage.getItem('nama');
    	var checkusia = localStorage.getItem('usia');
    	var checklama = localStorage.getItem('lamaPenyimpanan');
    	if (checkhasil && checknama && checkusia && checklama) {
    		setTable(checkhasil, checknama, checkusia, checklama);
    	}

        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => {
                console.log('Service worker registered. scope: ', reg.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const nama 			  = document.getElementById('input-nama');
const usia 			  = document.getElementById('input-usia');
const uangAwal 		  = document.getElementById('input-uang-awal');
const sbpt 			  = document.getElementById('input-sbpt');
const lamaPenyimpanan = document.getElementById('input-lama');

document.getElementById('submit-button').onclick = submitOnChange;

const worker = new Worker('worker.js');

function saveToLocal(e) {
	localStorage.setItem('nama', e.data.nama);
	localStorage.setItem('usia', e.data.usia);
	localStorage.setItem('uangAwal', e.data.uangAwal);
	localStorage.setItem('sbpt', e.data.sbpt);
	localStorage.setItem('lamaPenyimpanan', e.data.lamaPenyimpanan);
	localStorage.setItem('hasilAkhir', e.data.hasilAkhir);
	console.log(localStorage.getItem('nama'),
				localStorage.getItem('usia'),
				localStorage.getItem('uangAwal'),
				localStorage.getItem('sbpt'),
				localStorage.getItem('lamaPenyimpanan'),
				localStorage.getItem('hasilAkhir'));
}

worker.onmessage = function(e) {
	setTable(e.data.hasilAkhir, e.data.nama, e.data.usia, e.data.lamaPenyimpanan);
	saveToLocal(e);
}

function setTable(akhir, nama, usia, lama){
	document.getElementById('hasil-akhir').innerHTML = akhir;
	document.getElementById('hasil-usia').innerHTML = nama + " Usia " + usia + " Tahun";
	document.getElementById('hasil-lama').innerHTML = "Menyimpan uang selama " + lama + " Tahun";
}

function submitOnChange() {
	var data = {
		'nama': nama.value,
		'usia': usia.value,
		'uangAwal': uangAwal.value,
		'sbpt': sbpt.value,
		'lamaPenyimpanan': lamaPenyimpanan.value
	}
	worker.postMessage(data);
}
