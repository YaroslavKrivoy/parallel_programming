strings = {
    'connected': '[sys][time]%time%[/time]: Вы успешно соединились к сервером как [user]%name%[/user].[/sys]',
    'userJoined': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] присоединился к чату.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] покинул чат.[/sys]'
};
window.onload = () => {

    var socket = io.connect('http://localhost:3000');

    socket.on('connect',  () => {
        socket.on('message',  (msg) => {
            $('#content').append(strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>');
            $('#content').scrollTop = $('#content').scrollHeight;
        });

        $('#field').on('keypress', (e) => {
            if (e.which == '13') {
                socket.send(escape($('#field').val()));
                $('#field').val('');
            }
        });
        $('#send').on('click',() => {
            socket.send(escape($('#field').val()));
            $('#field').val('');
        });
    });
};