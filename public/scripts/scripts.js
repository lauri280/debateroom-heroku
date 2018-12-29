let osalejad = [];

// osaleja nime lisamine "osalejad" array'sse nupu või enter klahviga
// ja kuvamine osalejate nimekirjas
$("#lisa").on("click", function() {
    let name = $("#name").val();
    osalejad.push(name);

    $(".people-list").empty();
    osalejad.forEach(element => {
        $(".people-list").append($(`<li>${element}</li>`));
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


let testNimi = $("#testNimi");

testNimi.on("mouseenter", function() {
    
});

// "osalejad" listi elemendi valimine ja tegevused
testNimi.on("click", function() {
    if ($(this).css("opacity") == "1") {
        testNimi.css({"background": "#dfdbdb"});
    } else {
        testNimi.css({"background": "none"});
    }
    
});