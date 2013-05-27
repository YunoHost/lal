function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (hour == 0) { hour = '00'; }
    if (min == 0) { min = '00'; }
    var time = date+' '+month+' '+year+' at '+hour+':'+min;
    return time;
 }



$(document).ready(function () {
    $('#content').html($('#home').html());
    $.getJSON('list.json', function(app_list) {
        console.log(app_list)
        $("#app-list").html('');
        $.each(app_list, function(app_id, infos) {
            $('#app-list').append('<li><a data-app-id="'+ app_id +'">'+ infos.manifest.name +'</a></li>');
        });
        $("#app-list").on('click', "a:not('active')", function() {
           $("#app-list a").removeClass('active');
           $(this).toggleClass('active');
           var app_id = $(this).attr('data-app-id');
           var html = $('#template').html();
           app_list[app_id].lastUpdate2 = timeConverter(app_list[app_id].lastUpdate);
           $('#content').html(Mustache.to_html(html, app_list[app_id]));
        });
    });
});
