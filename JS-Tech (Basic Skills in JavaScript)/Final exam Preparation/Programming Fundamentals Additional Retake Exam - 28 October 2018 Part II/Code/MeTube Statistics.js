function solve(inputArr) {

    let regExVidViews = /(.*)-(\d+)/;
    let regExVidRatings = /(like|dislike):(.*)\b/;

    let videosObj = {};
    let viewsAndLikesObj = {};

    for (let input of inputArr) {

        if (input.match(regExVidViews)) {
            let [, video, views] = input.match(regExVidViews);

            if (!videosObj.hasOwnProperty(video)) {
                videosObj[video] = {};
                viewsAndLikesObj = videosObj[video];
                viewsAndLikesObj['views'] = +views;
                viewsAndLikesObj['likes'] = 0;
            } else {
                viewsAndLikesObj = videosObj[video];
                viewsAndLikesObj['views'] += +views;
            }
        }
        if (input.match(regExVidRatings)) {
            let [, rating, video] = input.match(regExVidRatings);

            if (videosObj.hasOwnProperty(video)) {
                if (rating === 'like') {
                    viewsAndLikesObj = videosObj[video];

                    viewsAndLikesObj['likes'] += 1;
                } else if (rating === 'dislike') {
                    viewsAndLikesObj = videosObj[video];
                    viewsAndLikesObj['likes'] -= 1;
                }
            }
        }

        if (input === 'by likes') {

            let mostLikedVid = Object.entries(videosObj);
            mostLikedVid = mostLikedVid.sort(sortByLikes);
            mostLikedVid.forEach(x =>
                console.log(`${x[0]} - ${x[1].views} views - ${x[1].likes} likes`));

        } else if (input === 'by views') {

            let mostViewedVid = Object.entries(videosObj);
            mostViewedVid = mostViewedVid.sort(sortByViews);
            mostViewedVid.forEach(x =>
                console.log(`${x[0]} - ${x[1].views} views - ${x[1].likes} likes`));
        }
    }

    function sortByViews(a, b) {

        let [aKey, aSubObject] = a;
        let [baKey, bSubObject] = b;

        return bSubObject.views - aSubObject.views;
    }

    function sortByLikes(a, b) {

        let [aKey, aSubObject] = a;
        let [baKey, bSubObject] = b;

        return bSubObject.likes - aSubObject.likes;
    }
}

solve(['Eninem Venom-500',
    'like:Eninem Venom',
    'Funny Cats-700',
    'like:Funny Cats',
    'like:Funny Cats',
    'Eninem Venom-300',
    'stats time',
    'by likes']);