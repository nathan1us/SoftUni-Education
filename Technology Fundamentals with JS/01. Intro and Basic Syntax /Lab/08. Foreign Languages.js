function printLanguage(country) {
    const countries = {
        'England': 'English',
        'USA': 'English',
        'Spain': 'Spanish',
        'Argentina': 'Spanish',
        'Mexico': 'Spanish'
    }

    console.log(countries.hasOwnProperty(country) ? countries[country] : 'unknown');
}

/*
printLanguage('USA');
printLanguage('Germany');
*/