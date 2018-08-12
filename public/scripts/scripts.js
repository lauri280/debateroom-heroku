let buttonLisa = $("#lisa");

buttonLisa.on("click", function() {
    console.log("vajutus"); /* ajutine */
    let name = $("#name").val();
    $(".people-list").append($(`<li>${name}</li>`));
});