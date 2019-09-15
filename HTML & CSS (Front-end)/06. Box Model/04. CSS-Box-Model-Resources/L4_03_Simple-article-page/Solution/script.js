function changeTheme() {
    let themeBody = $('body[class^="theme"]'),
        themeSection = $('section[class^="section"]'),
        themeButton = $('button[class^="button"]');

    if (themeBody.attr('class') === 'theme-standard') {
        themeBody.attr('class','theme-dark');
        themeSection.attr('class','section-dark');
        themeButton.attr('class', 'button-dark');
        return;
    }

    if (themeBody.attr('class') === 'theme-dark') {
        themeBody.attr('class','theme-standard');
        themeSection.attr('class','section-standard');
        themeButton.attr('class', 'button-standard')
    }

}