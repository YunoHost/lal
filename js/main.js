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

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

$(document).ready(function () {
    $('#content').html($('#home').html());
    $.getJSON('list.json', function(app_list) {
        console.log(app_list)
        $("#app-list").html('');
        $.each(app_list, function(app_id, infos) {
            $('#app-list').append('<li><a data-app-id="'+ app_id +'">'+ infos.manifest.name +'</a></li>');
        });
        if (typeof GetURLParameter('app') === 'string') {
            var app_id = GetURLParameter('app');
            $('#app-list a[data-app-id="'+ app_id +'"]').toggleClass('active');
            if ($('#app-list a.active').length > 0) {
                var html = $('#template').html();
                app_list[app_id].lastUpdate2 = timeConverter(app_list[app_id].lastUpdate);
                $('#content').html(Mustache.to_html(html, app_list[app_id]));
            }
        }
        $("#app-list").on('click', "a:not('active')", function() {
            $("#app-list a").removeClass('active');
            $(this).toggleClass('active');
            var app_id = $(this).attr('data-app-id');
            window.history.pushState({foo: "bar"}, "YNH App | "+ app_list[app_id].name, "/?app="+ app_id);
            var html = $('#template').html();
            app_list[app_id].lastUpdate2 = timeConverter(app_list[app_id].lastUpdate);
            $('#content').html(Mustache.to_html(html, app_list[app_id]));
        });

        /* Install actions */
        $("#content").on('click', ".install-button", function() {
            $('#modal').html($('#install-form').html());
            $('#modal').foundation('reveal', 'open');
        });

        $("#modal").on('click', ".install-app", function(event) {
            event.preventDefault();
            var url =  $("#yuno-url").val();
            if (url.substr(-1) != '/') url += '/';
            window.location.href = url + 'app/install/?git-url='+ app_list[app_id].git.url +'&git-branch='+ escape(app_list[app_id].git.branch) +'&git-rev=' + app_list[app_id].git.revision;
        });

        $("#new-request-button").click(function() {
            $('#modal').html($('#new-request').html());
            $('#modal').foundation('reveal', 'open');
        });

        /* New request actions */
        $("#modal").on('click', ".send-request", function(event) {
            event.preventDefault();
            var request = escape($("#modal input[type='radio']:checked").val());
            var appname =  escape($("#appname").val());
            var url =  escape($("#url").val());
            var branch = escape($("#branch").val());
            var rev = escape($("#rev").val());
            var comment = escape($('#comment').val());
            var link = "mailto:app-request@yunohost.org"
                     + "?subject=" + "[YNH "+ request +" Request] "+ appname
                     + "&body= Repo URL: " + url + "%0D%0A Branch: "+ branch +"%0D%0A Revision: "+ rev +"%0D%0A%0D%0A Comment: %0D%0A"+ comment;

            window.location.href = link;
            console.log('You mail is being sent');
        });


    });
});
