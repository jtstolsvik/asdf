$.getJSON('/api/users', function (users) {
    _.each(users, function (user) {
        $('#users').append('<li>' + JSON.stringify(user) + '</li>')
    })
});

$.getJSON('/api/secretInformationForGrinchOnly', function (secret) {
    $('#secretInformationForGrinchOnly').append(JSON.stringify(secret))
});