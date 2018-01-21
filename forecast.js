$(document).ready(function() {
    $("#submitforecast").click(function() {

        return getforecast();
    });
});


function getforecast() {
    var city = $("#city").val();
    var days = $("#days").val();



    if (city == '') {
        $("#error").html("<div class='alert alert-danger text-center' id='error' style='margin-top: 20px; margin-left: auto; margin-right: auto; width:50%;'>Please Enter a City</div>");
        $("#forecastweather").html("");
        $("#header").html("");
    }
    if (days == '') {
        $("#error").html("<div class='alert alert-danger text-center' id='error' style='margin-top: 20px; margin-left: auto; margin-right: auto; width:50%;'>Please Enter No.of days</div>");
        $("#forecastweather").html("");
        $("#header").html("");
    }
    if (city == '' && days == '') {
        $("#error").html("<div class='alert alert-danger text-center' id='error' style='margin-top: 20px; margin-left: auto; margin-right: auto; width:50%;'>Please Enter a City and No.of days</div>");
        $("#forecastweather").html("");
        $("#header").html("");
    }

    if (city != '' && days != '') {
        $("#error").html("");
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=metric" + "&cnt=" + days + "&APPID=e70b5efc0d1e99e84e4030774d91c196",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                //console.log(data)
                /* if (data.city.cod == 404) {
                     $("#error").html("please enter a valid city name!!!")
                 } else {*/
                var table = '';
                var header = '<h2 style="font-weight:bold; font-size:30px; font-family: sans-serif; margin-top:20px;">Weather Forecast For ' + data.city.name + ',' + data.city.country + '</h2>';

                for (var i = 0; i < data.list.length; i++) {
                    table += "<tr>";

                    table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                    table += "<td>" + data.list[i].weather[0].main + "</td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + data.list[i].temp.morn + "&deg;C</td>";
                    table += "<td>" + data.list[i].temp.night + "&deg;C</td>";
                    table += "<td>" + data.list[i].temp.min + "&deg;C</td>";
                    table += "<td>" + data.list[i].temp.max + "&deg;C</td>";
                    table += "<td>" + data.list[i].pressure + "hpa</td>";
                    table += "<td>" + data.list[i].humidity + "%</td>";
                    table += "<td>" + data.list[i].speed + "m/s</td>";


                    table += "</tr>";
                }
                $("#forecastweather").html(table);
                $("#header").html(header);
                $("#city").val('');
                $("#days").val('');
            },

            error: function(data) {
                if (Statuscode == 404) {
                    $("#error").html("please enter a valid city!!!!");
                }
            }
        });

    }
}