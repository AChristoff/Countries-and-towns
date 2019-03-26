function attachEvents() {
    let url = 'https://messanger-b24ae.firebaseio.com/messages.json';
    let firstMessage = 0;
    let firstMessageKey = '';

    $('#submit').on('click', sendMessage => {
        firstMessage++;


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
            success: (id) => {
                $('#author').val('');
                $('#content').val('');

                if (firstMessage === 1) {
                    firstMessageKey = id.name;
                }

                $.ajax({
                    method: 'GET',
                    url,
                    success: (data) => {
                        let flag = false;
                        let newMessages = '';
                        for (let [key, message] of Object.entries(data)) {
                            if (key === firstMessageKey) {
                                flag = true;
                            }
                            if (flag) {
                                newMessages += `${message.author}: ${message.content}\n`;
                                $('#messages').text(newMessages);
                            }
                        }
                    }
                })
            }
        })
    });

    $('#refresh').on('click', showMessages => {

        $.ajax({
            method: 'GET',
            url,
            success: (data) => {
                let allMessages = '';
                if (data !== null) {
                    for (let message of Object.values(data)) {
                        allMessages += `${message.author}: ${message.content}\n`
                    }
                    $('#messages').text(allMessages);
                } else {
                    $('#messages').text('No history')
                }
            }
        })
    });

    $('#delete').on('click', deleteHistory => {
        $.ajax({
            method: 'DELETE',
            url,
            success: () => {
                $('#messages').text('No history');
            }
        })
    });
}