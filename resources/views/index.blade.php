<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
        
        
        
    </head>
    <body>
        <div class="flex-center position-ref full-height">
       
    
            <div id="map" style="height:500px">
                
            </div>
            <h2>住所を登録</h2>
            <form id="addForm">
                @csrf
                <input id="name" type="text" placeholder="名前" name="name">
                <input id="address" type="text" value="東京タワー" name="address">
                <input id="lat" type="hidden" value="" name="lat">
                <input id="lng" type="hidden" value="" name="lng">
                <input type="button" value="登録" onclick="codeAddress()">
                <input type="button" value="現在地を登録" onclick="storeByLocation()">
            </form>
            <form id="deleteForm">
                @csrf
            </form>
            
            
            <script>
                const posts = @json($posts);
                console.log(posts);
            </script>
            
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="{{ asset('/js/result.js') }}"></script>
            <script async src="https://maps.googleapis.com/maps/api/js?key={{ config('services.google-map.apikey') }}&callback=initMap&libraries=places">
            </script>
        </div>
    </body>
</html>
