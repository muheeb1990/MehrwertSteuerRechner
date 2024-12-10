/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

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
        alert("bitte wähle einen Merwertsteuersatz aus.!!");
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
        alert("Bitte gib entweder einen Nettobetrag oder  Bruttobetrag ein.");
    }
}

document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9.,]/g, ''); 
    });

    input.addEventListener('focus', function() {
        if (this.id === 'netto') {
            document.getElementById('netto').value = ""
            document.getElementById('brutto').value = "";
            document.getElementById('betrag').value = "";
        } else if (this.id === 'brutto') {
            document.getElementById('netto').value = "";
            document.getElementById('betrag').value = "";
            document.getElementById('brutto').value = "";
        }
    });
});
