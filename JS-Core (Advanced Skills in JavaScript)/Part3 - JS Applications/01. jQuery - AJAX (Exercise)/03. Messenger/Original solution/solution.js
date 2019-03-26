function attachEvents() {
    let url = 'https://messanger-b24ae.firebaseio.com/messages.json';

    $('#submit').on('click', sendMessage => {
        let author = $('#author').val();
        let content = $('#content').val();
        let timeStamp = Date.now();
        let message = {
            author,
            content,
            timeStamp
        };

        $.ajax({
            method: 'POST',
            url,
            data: JSON.stringify(message),
            success: () => {
                $('#refresh').click();
                $('#author').val('');
                $('#content').val('');
            }
        })
    });

    $('#refresh').on('click', showMessages => {

        $.ajax({
            method: 'GET',
            url,
            success: (data) => {
                let allMessages = '';
                for (let message of Object.values(data)) {
                    allMessages += `${message.author}: ${message.content}\n`
                }
                $('#messages').text(allMessages);
            }
        })
    });
}