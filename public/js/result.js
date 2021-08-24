let map;
let nowLatLng;

function initMap() {
    //マップの生成
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
    });
    getNowLocation();
    showMarkers();
    
    const input = document.getElementById('address');
    
    const options = {
    //   bounds: defaultBounds,
      componentRestrictions: { country: "jp" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    
}

//現在地を取得
function getNowLocation(){
    infoWindow = new google.maps.InfoWindow();
    
    //現在地の取得
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                nowLatLng = pos;
                infoWindow.setPosition(pos);
                infoWindow.setContent("Your Location");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        hadleLocationError(false, infoWindow, map.getCenter());
    }
}

//現在地取得時のエラー
function handleLocationError(browserHasGeolocation, infoWindows, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

//マーカーの表示
function showMarkers() {
    let markers = [];
    for (let i = 0; i < posts.length; i++) {
        markers[i] = createMarker(posts[i]['id'], posts[i]['name'], posts[i]['lat'], posts[i]['lng']);
    }
}

//マーカーの作成
function createMarker(id, name, lat, lng) {
    let marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      name: name,
      icon: "../marker3.png",
      animation: google.maps.Animation.DROP,
    });
    const infoWindow = new google.maps.InfoWindow({
        content: createContent(id, name),
    });
    marker.addListener("click", () => {
      infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
      }) 
    });
    
    return marker;
}

//マーカーのコンテンツ作成
function createContent(id, name) {
    const content = 
        '<h1>' + name + '</h1>' + 
        '<button id="deleteButton' + id + '" onclick="sendDeleteForm(' + id + ')">削除</button>';
        
    return content;
}

//住所から緯度経度取得し登録
function codeAddress() {
    let address = document.getElementById('address').value;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();
            sendAddForm();
        } else {
            alert('Geocode was not successful for the following reason: ' + status)
        }
    })
}

//現在地からデータを登録
function storeByLocation() {
    document.getElementById('lat').value = nowLatLng['lat'];
    document.getElementById('lng').value = nowLatLng['lng'];
    sendAddForm();
}

// /storeへのフォームの送信
function sendAddForm() {
    let form = document.getElementById('addForm');
    form.action = '/store';
    form.method = 'post';
    form.submit();
}

// /posts/{id}/deleteへのフォームを送信
function sendDeleteForm(id) {
    let form = document.getElementById('deleteForm');
    form.action = '/posts/' + id + '/delete';
    form.method = 'post';
    form.submit()
}

