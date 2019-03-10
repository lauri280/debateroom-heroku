let osalejad = [];
let vaitlejad = [];
let tiimid = [];
let kohtunikud = [];

// for science
let testSortedArray = 
    [
    [{"nimi": "11", "staatus": "kogenu"},
    {"nimi": "22", "staatus": "kogenu"},
    {"nimi": "33", "staatus": "kogenu"},
    {"nimi": "44", "staatus": "kogenu"},
    {"nimi": "55", "staatus": "kogenu"}],
    [{"nimi": "66", "staatus": "algaja"},
    {"nimi": "77", "staatus": "algaja"},
    {"nimi": "88", "staatus": "algaja"},
    {"nimi": "99", "staatus": "algaja"}]
    ];


// osaleja nime lisamine "osalejad" array'sse nupu või enter klahviga
// ja kuvamine osalejate nimekirjas
$("#lisa").on("click", function() {
    let name = $("#name").val();
    // kontrolli staatust (algaja/kogenu) ja osaleja lisamine
    if (name !== "" && onOsalejateHulgas(name, osalejad) == false) {
        if ($("#beginnerChkbox").is(":checked")) {
            osalejad.push({"nimi": name, "staatus": "algaja"})
        } else {
            osalejad.push({"nimi": name, "staatus": "kogenu"})
        }
    }
    

    // kuvamine
    $(".people-list").empty();
    osalejad.forEach(element => {
        $(".people-list").append($(`<li>${element["nimi"]}</li>`)
       .addClass("person"));
    });

    $("#name").val("");
});
// enter klahvi fn
$("#name").keypress(function(e) {
    if (e.which == 13) {
        $("#lisa").click();
        return false;
    }
});

// fn, mis tagastab selle, kas nimi on osalejate hulgas või mitte
function onOsalejateHulgas(nimi, osalejateList) {
    let onOlemas = false;

    osalejateList.forEach(element => {
        if (element.nimi == nimi) {
            onOlemas = true;
        }
    });

    return onOlemas;
}

// "määra positioonid" nupu fn
$("#positsioonid").on("click", function() {
    if (osalejad.length >= 9) {
        $(".debater").remove();
        kuvaRuum(annaRollid(sorteeriOsalejad(osalejad)));
    }
});

// "eemalda" nupu fn
$("#eemalda").on("click", function() {
    // leiab selected elemendid, selle järgi objekti ja eemaldab selle osalejad arrayst
    $(".selected").each(function() {
        let index = osalejad.findIndex(x => x.nimi==$(this).text());
        osalejad.splice(index, 1);
    });

    $(".people-list").empty(); // selle asja peaks ka eraldi funktsioon liigutama
    osalejad.forEach(element => {
        $(".people-list").append($(`<li>${element["nimi"]}</li>`)
       .addClass("person"));
    });
});


// nimede select'imine
$(document).click(function(event) {
    if ($(event.target).hasClass("person") && !($(event.target).hasClass("selected"))) {
        $(event.target).addClass("selected");
    } else if ($(event.target).hasClass("person") && ($(event.target).hasClass("selected"))) {
        $(event.target).removeClass("selected");
    }
});

// contextMenu, et osalejate nimekirjas olevate nimedega tegeleda

// --- Ruumi loomise funktsioonid ---

/*
// tagastab tiimid ja kohtunikud
function annaRollid (osalejateList) {
    let newOsalejad = osalejateList.slice();
    shuffleArray(newOsalejad);

    let tulem = [];
    let tiimid = [];
    let kohtunikud = [];

    for (i = 0; i < 4; i++) {
        let tiim = [];

        tiim.push(newOsalejad.pop());
        tiim.push(newOsalejad.pop());
        tiimid.push(tiim);
    }

    kohtunikud = newOsalejad.slice();

    tulem.push(tiimid);
    tulem.push(kohtunikud);
    return tulem;
}
*/

function annaRollid (sortedOsalejad) { // võtab argumendiks juba sorteeritud array

    let tulem = [];
    let finalTiimid = [];
    let finalKohtunikud = [];

    let tempOsalejaList = sortedOsalejad.slice();
    shuffleArray(tempOsalejaList[0]);
    shuffleArray(tempOsalejaList[1]);

    // siia tuleb osa, mis võtab eelnevalt määratud tiimid ja kohtunikud
        
    // esmalt lisab kohtuniku
    if (finalKohtunikud.length == 0) {
        if (tempOsalejaList[0].length > 0) {
            finalKohtunikud.push(tempOsalejaList[0].pop());
        } else {
            finalKohtunikud.push(tempOsalejaList[1].pop());
        }
    }


    // loob tiimid, eelistatult kogenu-algaja
    while (finalTiimid.length < 4) {
        let tiim = [];

        if (tempOsalejaList[0].length > 0 && tempOsalejaList[1].length > 0) {
            tiim.push(tempOsalejaList[0].pop(), tempOsalejaList[1].pop());
        } else if (tempOsalejaList[0].length > 1 && tempOsalejaList[1].length == 0) {
            tiim.push(tempOsalejaList[0].pop(), tempOsalejaList[0].pop());
        } else if (tempOsalejaList[0].length == 0 && tempOsalejaList[1].length > 1) {
            tiim.push(tempOsalejaList[1].pop(), tempOsalejaList[1].pop());
        } else {
            console.log("Error with creating teams!");
        }

        finalTiimid.push(tiim);
    }

    // ülejäänud määrab kohtunikuks
    if (tempOsalejaList[0].length > 0) {
        tempOsalejaList[0].forEach(element => {
            finalKohtunikud.push(element);
            tempOsalejaList[0].shift();
        });
    }
    if (tempOsalejaList[1].length > 0) {
        tempOsalejaList[1].forEach(element => {
            finalKohtunikud.push(element);
            tempOsalejaList[1].shift();
        });
    }

    tulem.push(finalTiimid);
    tulem.push(finalKohtunikud);
    return tulem;
}



// fn tagastab osalejate listi, kus on eraldi kogenud ja algajad
function sorteeriOsalejad (osalejateList) {
    let tulem = [];
    let kogenud = [];
    let algajad = [];

    osalejateList.forEach(element => {
        if (element["staatus"] === "kogenu") {
            kogenud.push(element);
        } else {
            algajad.push(element);
        }
    });

    tulem.push(kogenud);
    tulem.push(algajad);
    return tulem;
}

function kuvaRuum (ruum) {
    $(".og").append($(`<p>${ruum[0][0][0]["nimi"]}</p>`).addClass("debater"));
    $(".og").append($(`<p>${ruum[0][0][1]["nimi"]}</p>`).addClass("debater"));

    $(".oo").append($(`<p>${ruum[0][1][0]["nimi"]}</p>`).addClass("debater"));
    $(".oo").append($(`<p>${ruum[0][1][1]["nimi"]}</p>`).addClass("debater"));

    $(".cg").append($(`<p>${ruum[0][2][0]["nimi"]}</p>`).addClass("debater"));
    $(".cg").append($(`<p>${ruum[0][2][1]["nimi"]}</p>`).addClass("debater"));

    $(".co").append($(`<p>${ruum[0][3][0]["nimi"]}</p>`).addClass("debater"));
    $(".co").append($(`<p>${ruum[0][3][1]["nimi"]}</p>`).addClass("debater"));

    let adjString = ""
    ruum[1].forEach(element => {
        adjString = adjString + element["nimi"] + ", ";
    });
    let newAdjString = adjString.substring(0, adjString.length - 2);
    $(".adj").append($(`<p>${newAdjString}</p>`).addClass("debater"));

}







// stackoverflow'st array shuffle (Durstenfeld shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// random elemendi leidmine:
// var rand = myArray[Math.floor(Math.random() * myArray.length)];