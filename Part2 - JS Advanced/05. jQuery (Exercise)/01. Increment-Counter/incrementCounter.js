function increment(selector) {

    let parent = $(`${selector}`);

    let textArea = $('<textarea>');
    textArea.attr('class', 'counter');
    textArea.attr('disabled', true);
    textArea.val(0);

    let incrementBtn = $('<button>');
    incrementBtn.attr('class', 'btn');
    incrementBtn.attr('id', 'incrementBtn');
    incrementBtn.text('Increment');
    incrementBtn.on('click', function () {
        textArea.val(+$('textarea').val() + 1);
    });

    let list = $('<ul>');
    list.attr('class', 'results');

    let addBtn = $('<button>');
    addBtn.attr('class', 'btn');
    addBtn.attr('id', 'addBtn');
    addBtn.text('Add');
    addBtn.on('click' ,function () {
        let newRow = $('<li>');
        newRow.text($('textarea').val());
        list.append(newRow);
    });

    appendElements([textArea, incrementBtn, addBtn, list]);

    function appendElements(elements) {
        elements.forEach((el) => parent.append(el));
    }
}
