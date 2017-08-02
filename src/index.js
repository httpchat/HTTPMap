// Set up Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Import other dependencies
import axios from 'axios';

// Import CSS
import 'leaflet/dist/leaflet.css';
import './css/normalize.css';
import './css/style.css';

const httpMap = L.map('httpmap')
  .setView([35, 0], 3);

const basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
basemap.addTo(httpMap);


axios.get('https://raw.githubusercontent.com/httpchat/HTTPMap/master/httpchat-members.json')
  .then(res => {
    res.data.map(member => {
      L.circleMarker([member.latitude, member.longitude]).bindPopup(member.user).addTo(httpMap);
    })
  });