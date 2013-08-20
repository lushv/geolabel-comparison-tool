var lon = 40;
var lat = -20;
var zoom = 2;
var map, layer;

$(document).ready(function(){
	map = new OpenLayers.Map('map');
	layer = new OpenLayers.Layer.WMS( "OpenLayers WMS",
			"http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );

	var control = new OpenLayers.Control();
	OpenLayers.Util.extend(control, {
		draw: function () {
			// this Handler.Box will intercept the shift-mousedown
			// before Control.MouseDefault gets to see it
			this.box = new OpenLayers.Handler.Box( control,
				{"done": this.notice},
				{keyMask: OpenLayers.Handler.MOD_SHIFT});
			this.box.activate();
		},

		notice: function (bounds) {
			var ll = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom));
			var ur = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
			
			$('#location-radio').prop('checked', false);
			$('#location-name-select').prop('disabled', true);
			
			$('#area-selection-radio').prop('checked', true);
			$('#clear-select-area-input').prop('disabled', false);
			
			$('#select-area-south').prop('disabled', false);
			$('#select-area-west').prop('disabled', false);
			$('#select-area-east').prop('disabled', false);
			$('#select-area-north').prop('disabled', false);

			$('#select-area-south').prop('value', ll.lat.toFixed(4));
			$('#select-area-west').prop('value', ll.lon.toFixed(4));
			$('#select-area-east').prop('value', ur.lon.toFixed(4));
			$('#select-area-north').prop('value', ur.lat.toFixed(4));
		}
	});

	map.addLayer(layer);
	map.addControl(control);
	map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
})