const songService = (() => {

    function getMySongs(userID) {
        return kinvey.get('appdata', `songs?query={"_acl.creator":"${userID}"}&sort={"likes": -1, "listened": -1}`, 'kinvey')
    }

    function getAllSongs() {
        return kinvey.get('appdata', `songs`, 'kinvey')
    }

    function createSong(songObj) {
        return kinvey.post('appdata', 'songs', 'kinvey', songObj);
    }

    function removeSong(songID) {
        return kinvey.remove('appdata', `songs/${songID}`, 'kinvey');
    }

    function editSong(songID, updatedSongObj) {
        return kinvey.update('appdata', `songs/${songID}`, 'kinvey', updatedSongObj)
    }

    function getSong(songID) {
        return kinvey.get('appdata', `songs/${songID}`, 'kinvey');
    }


    function sortAllSongs(songs) {
        let userID = sessionStorage.getItem('userID');

        let ownSongs = songs
            .filter(s => s._acl.creator === userID)
            .sort((a, b) => {
                return b.likes - a.likes || b.listened - a.listened
            });

        let otherSongs = songs
            .filter(s => s._acl.creator !== userID)
            .sort((a, b) => {
                return b.likes - a.likes;
            });

        return otherSongs.concat(ownSongs);
    }


    return {
        getAllSongs,
        sortAllSongs,
        createSong,
        removeSong,
        editSong,
        getSong,
        getMySongs,

    }
})();