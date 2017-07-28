require([
    'esri/Map',
    'esri/views/SceneView',
    'esri/layers/FeatureLayer',
    'esri/geometry/Point',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/PointSymbol3D',
    'esri/symbols/IconSymbol3DLayer',
    'esri/widgets/Popup',
    'esri/request',
    'dojo/_base/array',
    'dojo/domReady!'
], function(Map, SceneView, FeatureLayer, Point, SimpleRenderer, PointSymbol3D, IconSymbol3DLayer, Popup, esriRequest, arrayUtils) {

    // Define the specficiation for each field to create in the layer
    var httpMembersFields = [
        {
            name: 'ObjectID',
            alias: 'ObjectID',
            type: 'oid'
        },
        {
            name: 'user',
            alias: 'user',
            type: 'string'
        }
    ];

    // Define the map
    var theMap = new Map({
        basemap: 'streets-night-vector',
        ground: 'world-elevation',
    });

    // Define the 3D view
    var theView = new SceneView({
        container: 'httpmap',
        map: theMap
    });

    // Define the renderer for symbolizing HTTPChat members
    var httpMembersRenderer = new SimpleRenderer({
        symbol: new PointSymbol3D({
            symbolLayers: [new IconSymbol3DLayer({
                size: 14,
                resource: {
                    primitive: 'circle'
                },
                material: {
                    color: '#FF5A5F'
                },
                outline: {
                    color: 'black',
                    size: 1.25
                }
            })]
        }),
    });

    theView.then(function() {
        getData()
            .then(createGraphics)
            .then(createLayer);
    });

    // Request the data from httpchat-members.json
    function getData() {
        return esriRequest('httpchat-members.json', {
            responseType: 'json'
        });
    }

    // Create graphics with returned JSON data
    function createGraphics(response) {

        // Raw JSON data
        var httpMembersJson = response.data;

        // Create an array of Graphics from each JSON item
        return arrayUtils.map(httpMembersJson, function(feature, i) {
            return {
                geometry: new Point({
                    x: feature.longitude,
                    y: feature.latitude
                }),
                attributes: {
                    ObjectID: feature.id,
                    user: feature.user
                }
            };
        });

    }

    // Create a FeatureLayer with the array of graphics
    function createLayer(graphics) {

        var httpMembersLayer = new FeatureLayer({
            source: graphics,
            fields: httpMembersFields,
            objectIdField: 'ObjectID',
            renderer: httpMembersRenderer,
            spatialReference: {
                wkid: 4326
            },
            geometryType: 'point',
            popupTemplate: {
                title: "{user}",
                content: "More information will be here soon."
            }
        });

        theMap.add(httpMembersLayer);

    }

});