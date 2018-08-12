let buttonLisa = $("#lisa");

buttonLisa.on("click", function() {
    console.log("vajutus"); /* ajutine */
    let name = $("#name").val();
    $(".people-list").append($(`<li>${name}</li>`));
});


let testNimi = $("#testNimi");

testNimi.on("mouseenter", function() {
    
});

testNimi.on("click", function() {
    if ($(this).css("opacity") == "1") {
        testNimi.css({"background": "#dfdbdb"});
    } else {
        testNimi.css({"background": "none"});
    }
    
});