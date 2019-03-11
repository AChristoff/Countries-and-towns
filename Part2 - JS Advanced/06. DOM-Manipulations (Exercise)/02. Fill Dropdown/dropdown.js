function addItem() {
    let text = $('#newItemText');
    let value = $('#newItemValue');
    let menu = $('#menu');

    let option = $('<option>');
    option.attr('value', value.val());
    option.text(text.val());
    option.appendTo(menu);

    text.val('');
    value.val('');
}