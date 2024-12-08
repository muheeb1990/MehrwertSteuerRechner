function bruttoRechnen() {
    const nettoInput = document.getElementById("netto");
    const bruttoInput = document.getElementById("brutto");
    const betragInput = document.getElementById("betrag");
    const satzAllgemein = document.getElementById("satz-allgemein");
    const satzErmaessigt = document.getElementById("satz-ermäßigt");

    let mwstSatz = 0;
    if (satzAllgemein.checked) {
        mwstSatz = parseFloat(satzAllgemein.value);
    } else if (satzErmaessigt.checked) {
        mwstSatz = parseFloat(satzErmaessigt.value);
    } else {
        alert("Bitte wähle einen Mehrwertsteuersatz aus.");
        return;
    }

    const netto = parseFloat(nettoInput.value);
    const brutto = parseFloat(bruttoInput.value);
    if (!isNaN(netto) && netto !== "") {
        const bruttoBerechnet = netto * (1 + mwstSatz);
        bruttoInput.value = bruttoBerechnet.toFixed(2);

        const betrag = netto * mwstSatz;
        betragInput.value = betrag.toFixed(2);
    } else if (!isNaN(brutto) && brutto !== "") {
        const nettoBerechnet = brutto / (1 + mwstSatz);
        nettoInput.value = nettoBerechnet.toFixed(2);
        const betrag = brutto - nettoBerechnet;
        betragInput.value = betrag.toFixed(2);
    } else {
        alert("Bitte gib entweder einen Netto- oder Bruttobetrag ein.");
    }
}

document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9.,]/g, ''); 
    });

    input.addEventListener('focus', function () {
        if (this.id === 'netto') {
            document.getElementById('netto').value = ""
            document.getElementById('brutto').value = "";
            document.getElementById('betrag').value = "";
        } else if (this.id === 'brutto') {
            document.getElementById('netto').value = "";
            document.getElementById('betrag').value = "";
        }
    });
});
