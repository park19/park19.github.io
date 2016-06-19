function initialize() {
    // GSP位置
    var query = window.location.search.toQueryParams();
    var latlng = query["pos"].split(",");
    var address = query["address"];
    var center = new google.maps.LatLng(latlng[0],latlng[1]);
    var mapOptions = {
        zoom: 17,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    var station = new google.maps.LatLng(35.68140,139.76607);
    var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: address
    });
}
