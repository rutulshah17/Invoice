$('#deleteRecord').on('show.bs.modal', function (e) {
    console.log('error');
    var bookId = $(e.relatedTarget).data('delete-modal-id');
    $(e.currentTarget).find('input[name="recordId"]').val(bookId);
});

document.getElementById('dateTo').valueAsDate = new Date();
