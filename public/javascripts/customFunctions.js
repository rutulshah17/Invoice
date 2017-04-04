$('#deleteRecord').on('show.bs.modal', function (e) {
    var recordName = $(e.relatedTarget).data('delete-name-id');
    var recordAmount = $(e.relatedTarget).data('delete-amount-id');
    var link = $(e.relatedTarget).data('delete-link');
    $(e.currentTarget).find('p[id="recordId"]').text("Are your sure you want to delete" + " " + recordName.toUpperCase() +" who has been paid with $"+ recordAmount + "?");
    $(e.currentTarget).find('a[id="link"]').attr('href',link);
});
