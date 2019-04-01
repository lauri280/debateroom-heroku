let osalejad = [];
let vaitlejad = [];
let tiimid = [];
let kohtunikud = [];


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
    
    kuvaListid();
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

// "määra kohtunik" nupu fn
$("#kohtunikuks").on("click", function() {
    // leiab selected elemendid, selle järgi objekti ja lisab selle
    // kohtunike array'sse, seejärel eemaldab selle osalejad arrayst
    $(".selected").each(function() { // todo: peab kontrollima, et selected elem on õiges kohas
        let index = osalejad.findIndex(x => x.nimi==$(this).text());
        kohtunikud.push(osalejad[index]);
        osalejad.splice(index, 1);
    });

    kuvaListid();
});

// "määra tiim" nupu fn
$("#tiimi").on("click", function() {
    let tiim = [];

    if ($(".selected").length == 2 && selectedOnlyOsalejad() && tiimid.length < 4) {
        $(".selected").each(function() {
            let index = osalejad.findIndex(x => x.nimi==$(this).text());
            tiim.push(osalejad[index]);
            osalejad.splice(index, 1);
        });
    }

    tiimid.push(tiim);
    kuvaListid();
});

//fn, mis veendub, et selected elemendid on ainult osalejate seas
function selectedOnlyOsalejad() {
    let tulem = true;

    $(".selected").each(function() {
        if (!($(this).parent().hasClass("people-list"))) {
            tulem = false;
        }
    });

    return tulem;
}

// "eemalda" nupu fn
$("#eemalda").on("click", function() {
    // leiab selected elemendid, selle järgi objekti ja eemaldab selle osalejad arrayst
    $(".selected").each(function() {
        if ($(this).parent().hasClass("adj-list")) {
            let index = kohtunikud.findIndex(x => x.nimi==$(this).text());
            osalejad.push(kohtunikud[index])
            kohtunikud.splice(index, 1);
        } else if ($(this).parent().hasClass("people-list")) {
            let index = osalejad.findIndex(x => x.nimi==$(this).text());
            osalejad.splice(index, 1);
        }

        // todo: if tiim -> liiguta osalejate hulka
    });

    kuvaListid();
});


// nimede select'imine
$(document).click(function(event) {
    if ($(event.target).hasClass("person") && !($(event.target).hasClass("selected"))) {
        $(event.target).addClass("selected");
    } else if ($(event.target).hasClass("person") && ($(event.target).hasClass("selected"))) {
        $(event.target).removeClass("selected");
    }
});

// --- Ruumi loomise funktsioonid ---



function annaRollid (sortedOsalejad) { // võtab argumendiks juba sorteeritud array

    let tulem = [];
    let finalTiimid = [];
    let finalKohtunikud = [];

    let tempOsalejaList = sortedOsalejad.slice();
    shuffleArray(tempOsalejaList[0]);
    shuffleArray(tempOsalejaList[1]);

    // todo: siia tuleb osa, mis võtab eelnevalt määratud tiimid ja kohtunikud
    kohtunikud.forEach(element => {
        finalKohtunikud.push(element);
    })
        
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

// fn, mis lisab elemendid array'dest html listidesse
function kuvaListid() {
    $(".people-list").empty();
    $(".adj-list").empty();

    osalejad.forEach(element => {
        $(".people-list").append($(`<li>${element["nimi"]}</li>`)
       .addClass("person"));
    });

    kohtunikud.forEach(element => {
        $(".adj-list").append($(`<li>${element["nimi"]}</li>`)
       .addClass("person"));
    });
}

// fn, mis annab osalejate koguarvu
function osalejaCount() {
    let count = 0;

    count += osalejad.length + kohtunikud.length;
    tiimid.forEach(element => {
        count += element.length;
    });

    return count;
}

// fn, mis võtab argumendiks array, mis sisaldab tiime ja kohtunikke
// ja seejärel lisab need HTMLi
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