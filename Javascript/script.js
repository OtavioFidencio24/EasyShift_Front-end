$("#btnCreateEmployee").on('click', function() {
    $("#section-employee-form").toggleClass("hidden");
    $("#btnCreateEmployee").toggleClass("hidden");
});

$("#btnSubmit").on('click', function() {
    $("#btnCreateEmployee").toggleClass("hidden");
    $("#btnCreateRoster").toggleClass("hidden");
});

$("#btnCreateRoster").on('click', function() {
    $("#section-roster-form").toggleClass("hidden");
    $("#btnCreateRoster").toggleClass("hidden");
});
