var gLat_gps, gLng_gps;
function gps() {
    if (navigator.geolocation) {
        // 現在の位置情報取得を実施
        navigator.geolocation.getCurrentPosition(// 位置情報取得成功時
        function(pos) {
            gLat_gps = pos.coords.latitude;
            gLng_gps = pos.coords.longitude;
            getAdrs();
        }, function(pos) {
            // 位置情報取得失敗時
            alert("位置情報を有効にしてください");
        });
    } else {
        window.alert("本ブラウザではGeolocationが使えません");
    }
}

function getAdrs() {

    var latlng = new google.maps.LatLng(gLat_gps,gLng_gps);
    var gc = new google.maps.Geocoder();
    gc.geocode({
        location: latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var adrsData = results[0].address_components;
            var address = "";
            for (var i = adrsData.length - 3; i > 0; i--) {
                address += adrsData[i].long_name;
            }
            document.getElementById("address").value = address;
        } else {
            alert(status + " : ジオコードに失敗しました");
        }
    });
}

function getLatLng() {
    // 入力住所取得
    var address = document.getElementById("address").value;
    if(!address || address.match("^\[ 　]")) {
        alert("住所を入力してください");
        return;
    }

    //ジオコードオブジェクト
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address,
        'region': 'jp'
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            gLat_gps = results[0].geometry.location.lat();
            gLng_gps = results[0].geometry.location.lng();

            // 緯度経度をセット
            document.getElementById("pos").setAttribute("value", gLat_gps+","+gLng_gps);
            document.forms.gpsform.submit();
        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert(address + "は見つかりませんでした。");
        }
    });
}