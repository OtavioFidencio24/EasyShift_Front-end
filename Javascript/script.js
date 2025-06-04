$("#btnCreate").on('click', function() {
    $("#section-form").toggleClass("hidden");
    $("#btnCreate").toggleClass("hidden");
});
$("#btnSubmit").on('click', function() {
    $("#btnCreate").toggleClass("hidden");
});