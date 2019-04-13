handlers.getAllSongs = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let userID = sessionStorage.getItem('userID');

    songService.getAllSongs()
        .then((res) => {

            res.forEach((song) => {
                song.isCreator = song._acl.creator === userID;
            });

            context.songs = songService.sortAllSongs(res);

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs',
                song: './views/song/song.hbs',
            }).then(function () {
                this.partial('./views/song/allSongs.hbs')
            });
        })

};

handlers.getMySongs = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    let userID = sessionStorage.getItem('userID');

    songService.getMySongs(userID)
        .then((res) => {

            res.forEach((song) => {
                song.isCreator = song._acl.creator === userID;
            });

            context.songs = res;

            context.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs',
                song: './views/song/song.hbs',
            }).then(function () {
                this.partial('./views/song/mySongs.hbs')
            });

        })

};

handlers.getCreateSong = function (context) {

    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/song/createSong.hbs')
    });

};

handlers.postCreateSong = function (context) {

    let title = context.params.title;
    let artist = context.params.artist;
    let imageURL = context.params.imageURL;

    if (title.length < 6) {
        return notify.showError('Title must be more than five characters long')
    } else if (artist.length < 2) {
        return notify.showError('Artist must be more than two characters long')
    } else if (!imageURL.startsWith('http')) {
        return notify.showError('Link must start with "http://" or "https://"')
    }

    songService.createSong({...context.params, likes: 0, listened: 0})
        .then(() => {
            notify.showInfo('Song created successfully.');
            context.redirect('#/mySongs');
        });
};

handlers.getRemoveSong = function (context) {
    let songID = context.params.id;

    songService.removeSong(songID)
        .then(() => {
            notify.showInfo('Song removed successfully!');
            context.redirect('#/mySongs');
        });
};

handlers.getLikeSong = function (context) {
    let songID = context.params.id;

    songService.getSong(songID)
        .then(function (res) {

            //Edin old params --------------------------
            let updatedSongObj = res;
            let newLikes = Number(updatedSongObj.likes) + 1;
            //Set new params ---------------------------
            updatedSongObj.likes = newLikes;
            //--------------------------------------

            songService.editSong(songID, updatedSongObj)
                .then(function () {
                    notify.showInfo('Liked');
                    context.redirect('#/allSongs');
                })
                .catch(function (err) {
                    notify.showError(err);
                })
        });
};

handlers.getListenSong = function (context) {
    let songID = context.params.id;

    songService.getSong(songID)
        .then(function (res) {
            let songName = res.title;

            //Edin old params --------------------------
            let updatedSongObj = res;
            let newLikes = Number(updatedSongObj.listened) + 1;
            //Set new params ---------------------------
            updatedSongObj.listened = newLikes;
            //--------------------------------------

            songService.editSong(songID, updatedSongObj)
                .then(function () {
                    notify.showInfo(`You just listened ${songName}`);
                    context.redirect('#/allSongs');
                })
                .catch(function (err) {
                    notify.showError(err);
                })
        });
};