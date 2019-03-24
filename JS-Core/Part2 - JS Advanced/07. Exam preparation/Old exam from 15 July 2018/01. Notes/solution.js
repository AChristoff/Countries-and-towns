function addSticker() {

    let stickerBoard = $('#sticker-list');
    let [title, text] = $('.text input').toArray().map((x) => $(x));

    if (title.val() && text.val()) {
        let a = $('<a class="button">x</a>');
        let h2 = $('<h2>');
        let hr = $('<hr>');
        let p = $('<p>');
        let li = $('<li class="note-content">');

        a.on('click', () => a.parent().remove());

        a.appendTo(li);
        h2.text(title.val()).appendTo(li);
        hr.appendTo(li);
        p.text(text.val()).appendTo(li);
        li.appendTo(stickerBoard);
    }

    title.val('');
    text.val('')
}