// Import dependencies
import L from 'leaflet';

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