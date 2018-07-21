// Kendo UI listboxide jaoks

let buttonLisa = $("#lisa");

buttonLisa.on("click", function() {
    console.log("vajutus");
    let name = $("#name").val();
    $(".people").append($(`<p>${name}</p>`));
});