function processState( selectedState ){

    console.log ( selectedState );
    $('#state').html ( selectedState );

    let confirmed = Math.floor(Math.random() * 100 + 100);
    let recovered = Math.floor(Math.random() * 50 + 10);
    let dead = Math.floor(Math.random() * 10 + 1);

    $('#confirmed').html (data[selectedState].confirmed);
    $('#active').html (data[selectedState].active);
    $('#recovered').html (data[selectedState].recovered);
    $('#deceased').html (data[selectedState].deceased); 

}