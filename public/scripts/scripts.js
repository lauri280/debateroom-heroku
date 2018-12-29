let osalejad = [];
let tiimid = []
let kohtunikud = []

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
        $(".people-list").append($(`<li>${element["nimi"]}</li>`));
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
    console.log(osalejad);
});


// contextMenu, et osalejate nimekirjas olevate nimedega tegeleda