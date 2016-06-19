var map, directionsService;
var center;
function initialize() {
    // GSP位置
    var query = window.location.search.toQueryParams();
    var gpslatlng = query["pos"].split(",");
    var address = query["address"];
    center = new google.maps.LatLng(gpslatlng[0],gpslatlng[1]);
    //オプション設定
    var myOptions = {
        zoom: 17,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
    };
    directionsService = new google.maps.DirectionsService();
    var directionsDisplay;
    //マップを描画
    var mapdiv = document.getElementById('map_canvas');
    map = new google.maps.Map(mapdiv,myOptions);
}
function getPlace(address) {
    if (address) {
        var service = new google.maps.places.PlacesService(map);
        var placeRequest = {
            //入力したテキスト
            query: address,
        }
        //リクエストを送ってあげるとプライス情報を格納したオブジェクトを返してくれます。
        service.textSearch(placeRequest, function(results, status) {
            var places = results[0];
            toGeocode(places);
        });
    }
}
function toGeocode(places) {
    //取得したplacesオブジェクトから緯度と経度をgeocodeとして渡します。
    var tolatlng = new google.maps.LatLng(places.geometry.location.lat(),places.geometry.location.lng());
    //ルート取得
    getRoute(tolatlng);
}
//ルート描画用
function getRoute(latlng) {
    var request = {
        //入力地点の緯度、経度
        origin: center,
        //到着地点の緯度、経度
        destination: latlng,
        //ルートの種類
        travelMode: google.maps.DirectionsTravelMode.WALKING
    }
    directionsService.route(request, function(result, status) {
        toRender(result);
    });
}
function toRender(result) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    //取得した情報をセット
    directionsDisplay.setDirections(result);
    //マップに描画
    directionsDisplay.setMap(map);
}
