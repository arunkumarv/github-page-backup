let info;

let baseOsList;

let version;

$(document).ready(function () {

    $.get("https://raw.githubusercontent.com/Bugazelle/chromium-all-old-stable-versions/master/chromium.stable.json", function (data) {

        info = JSON.parse(data);

        baseOsList = Object.getOwnPropertyNames(info)

        var $baseOsSelect = $("#base-os");

        $.each(baseOsList, function (index, value) {

            $baseOsSelect.append($("<option />").val(value).text(value));
        });
    })
});

function getBuilds (){

    let selectedOs = $("#base-os").val();

    let majorNumber = $("#major-number").val();

    let versions = Object.getOwnPropertyNames(info[selectedOs]).filter ( e => e.startsWith(majorNumber));
    
    $('ul#link-list').empty()

    versions.forEach( version => {

        let href = info[selectedOs][version]['download_url'];

        if ( href.startsWith('http')){
            
            $("ul#link-list").append(`<li><a href="${href}" class="linkman"><span class="tab">${selectedOs}_${version}</span></a></li>`);
        }
    })
}