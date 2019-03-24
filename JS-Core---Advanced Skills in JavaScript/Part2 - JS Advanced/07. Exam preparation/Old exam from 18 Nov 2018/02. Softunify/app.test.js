const SoftUniFy = require('./app');
const assert = require('chai').assert;

describe('Testing SoftUniFy', function () {

    let unify;

    beforeEach(function () {
        unify = new SoftUniFy();
    });

    it('allSongs()', function () {
        assert.deepEqual(unify.allSongs, {});
    });


    it('downloadSong( artist, song, lyrics )', function () {
        unify.downloadSong('Alex', 'Code', 'ma3x');
        assert.equal(unify.downloadSong(), unify);
    });

    describe('playSong( song )', function () {
        it('song is not found', function () {
            unify.downloadSong('Alex', 'Code', 'ma3x');

            assert.equal(unify.playSong('Test'), `You have not downloaded a Test song yet. Use SoftUniFy's function downloadSong() to change that!`);
        });

        it('song found', function () {
            unify.downloadSong('Alex', 'Code', 'ma3x');

            assert.equal(unify.playSong('Code'), `Alex:\nCode - ma3x\n`);
        });
    });

    describe('songsList()', function () {
        it('print song list', function () {
            unify.downloadSong('Alex', 'Code', 'ma3x');
            unify.downloadSong('Andrey', 'CodeMaster', 'Neo');

            assert.equal(unify.songsList, `Code - ma3x\nCodeMaster - Neo`);
        });

        it('empty song list', function () {
            assert.equal(unify.songsList, `Your song list is empty`);
        });
    });

    describe('rateArtist() ', function () {
        it('rate artist', function () {

            unify.downloadSong('Alex', 'Code', 'ma3x');
            unify.rateArtist('Alex', 50);

            assert.equal(unify.allSongs['Alex']['rate'], 50);
        });

        it('artist not found', function () {

            assert.equal(unify.rateArtist('Eminem', 50), 'The Eminem is not on your artist list.');
        });
    });

});