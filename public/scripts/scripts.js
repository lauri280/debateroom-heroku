let osalejad = [];
let vaitlejad = [];
let tiimid = [];
let kohtunikud = [];


// osaleja nime lisamine "osalejad" array'sse nupu või enter klahviga
// ja kuvamine osalejate nimekirjas
$("#lisa").on("click", function() {
    let name = $("#name").val();
    // kontrolli staatust (algaja/kogenu) ja osaleja lisamine
    if ($("#beginnerChkbox").is(":checked")) {
        osalejad.push({"nimi": name, "staatus": "algaja"})
    } else {
        osalejad.push({"nimi": name, "staatus": "kogenu"})
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

// ajutine "määra positioonid" nupu fn
$("#positsioonid").on("click", function() {
    console.log(looRuum());
});


// contextMenu, et osalejate nimekirjas olevate nimedega tegeleda


// --- Ruumi loomise funktsioonid ---

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


function looRuum () {
    if (osalejad.length >= 9) {
        let rollid = annaRollid(osalejad);
        console.log(rollid);
    }
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