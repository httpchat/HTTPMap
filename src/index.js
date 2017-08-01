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

const myBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
myBasemap.addTo(httpMap);


axios.get('./httpchat-members.json')
  .then(res => {
    res.data.map(member => {
      L.marker([member.latitude, member.longitude]).bindPopup(member.user).addTo(httpMap);
    })
  });