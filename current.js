$(document).ready(function() {
    $("#error").html("");
    $("#submitcurrent").click(function() {
        $("#error").html("");
        return getWeather();
    });
});


function getWeather() {
    var city = $("#city").val();
    if (city != '') {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=e70b5efc0d1e99e84e4030774d91c196",
            type: "GET",
            dataType: 'jsonp',
            success: function(data) {
                // console.log(data)
                var widget = showresults(data);
                $("#showweather").html(widget);
                $("#city").val('');
            }
        });
    } else {
        $("#error").html("<div class='alert alert-danger' id='errorcity'><a href='#' class='close' data-dismiss='alert' aria-label='close'></a>Please Enter a City</div>");
        $("#showweather").html("");
        $("#city").val('');
    }
}




function showresults(data) {
    return "<h2 style='font-weight: bold; font-size: 3vw; margin-top:50px; padding-bottom: 30px;' class='text-center'>Current Weather For " + data.name + "  " + data.sys.country + "</h2>" +
        "<hr / style='width:80%;margin-top:-20px;'>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Weather</b> : " + data.weather[0].main + "</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Weather description</b> : " + data.weather[0].description + "</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Temperature</b> : " + data.main.temp + " &deg;c</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Pressure</b> : " + data.main.pressure + " hpa</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Humidity</b> : " + data.main.humidity + " %</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Min Temp</b> : " + data.main.temp_min + " &deg;c</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Max Temp</b> : " + data.main.temp_max + " &deg;c</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; font-size: 3.5vmin;'><b>Wind Speed</b> : " + data.wind.speed + " m/s</h3>" +
        "<h3 style='padding-left: 20px; font-family: sans-serif; padding-bottom: 30px; font-size: 3.5vmin;'><b>Wind Direction</b> : " + data.wind.deg + " &deg;</h3>";
}