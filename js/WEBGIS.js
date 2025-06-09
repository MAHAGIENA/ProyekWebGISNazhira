function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// ============================
// INISIALISASI PETA
// ============================
const map = L.map('map').setView([-6.903, 107.6510], 12);

// Basemap
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

basemapOSM.addTo(map);

// ============================
// KONTROL LAYER
// ============================
const baseMaps = {
  "OpenStreetMap": basemapOSM,
  "OSM HOT": osmHOT,
  "Google Maps": baseMapGoogle
};

const overlayMaps = {};

// ============================
// FULLSCREEN & BUTTONS
// ============================
map.addControl(new L.Control.Fullscreen({ position: 'topleft' }));

const home = { lat: -6.903, lng: 107.6510, zoom: 12 };
L.easyButton('fa-home', (btn, map) => {
  map.setView([home.lat, home.lng], home.zoom);
}, 'Kembali ke Home').addTo(map);

L.control.locate({
  position: 'topleft',
  setView: 'once',
  flyTo: true,
  keepCurrentZoomLevel: false,
  showPopup: false,
  locateOptions: { enableHighAccuracy: true }
}).addTo(map);

// ============================
// PANE
// ============================
map.createPane('KeterjangkauanPane').style.zIndex = 400;
map.createPane('adminPane').style.zIndex = 600;
map.createPane('FasilitasORPane').style.zIndex = 5000;

// ============================
// LAYER: Keterjangkauan
// ============================
const Keterjangkauan = new L.LayerGroup();
$.getJSON("./Asset/Spasial/intercest_Bandung.geojson")
  .done(function (data) {
    L.geoJson(data, {
      pane: 'KeterjangkauanPane',
      style: function (feature) {
        const warna = {
          'Dekat': "rgb(157, 242, 151)",
          'Jauh': "rgb(220, 127, 127)",
          'Sangat Dekat': "rgb(49, 128, 10)",
          'Sangat Jauh': "rgb(214, 0, 0)",
          'Sedang': "rgb(246, 178, 83)",
        };
        return {
          fillColor: warna[feature.properties.Kelas] || "#FFFFFF",
          fillOpacity: 0.6,
          weight: 1.5,
          color: "#000000",
          opacity: 1
        };
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<b>Status Keterjangkauan:</b> ' + feature.properties.Kelas);
      }
    }).addTo(Keterjangkauan);
  })
  .fail(() => console.error("Gagal memuat GeoJSON: intercest_Bandung.geojson"));

Keterjangkauan.addTo(map);
overlayMaps["Status Keterjangkauan"] = Keterjangkauan;

// ============================
// LAYER: BATAS ADMINISTRASI
// ============================
const Batas_Admin = new L.LayerGroup();
$.getJSON("./Asset/Spasial/Batas_Admin.geojson")
  .done(function (data) {
    L.geoJson(data, {
      pane: 'adminPane',
      style: {
        color: "red",
        weight: 2,
        opacity: 1,
        dashArray: "10 1 1 1 1 1 1 1 1 1",
        lineJoin: 'round'
      }
    }).addTo(Batas_Admin);
  })
  .fail(() => console.error("Gagal memuat GeoJSON: Batas_Admin.geojson"));

Batas_Admin.addTo(map);
overlayMaps["Batas Administrasi"] = Batas_Admin;

// ============================
// LAYER: Fasilitas OR
// ============================
const olahragaIcon = L.icon({
  iconUrl: './Asset/icon4.png',
  iconSize: [20, 20],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const FasilitasOR = new L.LayerGroup();
$.getJSON("./Asset/Spasial/Fasilitas_OR.geojson")
  .done(function (data) {
    L.geoJson(data, {
      pane: 'FasilitasORPane',
      pointToLayer: (feature, latlng) => L.marker(latlng, { icon: olahragaIcon })
    }).addTo(FasilitasOR);
  })
  .fail(() => console.error("Gagal memuat GeoJSON: Fasilitas_OR.geojson"));

FasilitasOR.addTo(map);
overlayMaps["Fasilitas Olahraga"] = FasilitasOR;

// ============================
// KONTROL LAYER
// ============================
L.control.layers(baseMaps, overlayMaps).addTo(map);

// ============================
// LEGENDA
// ============================
let legend = L.control({ position: "topright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML =
    '<p style="font-size: 18px; font-weight: bold; margin: 10px 0 5px;">Legenda</p>' +

    '<p style="font-size: 12px; font-weight: bold; margin: 10px 0 5px;">Fasilitas Olahraga</p>' +
    '<img src="./Asset/icon4.png" width="24" height="24" style="display:inline-block; margin-right:6px;"> Fasilitas Olahraga<br>' +

    '<p style="font-size: 12px; font-weight: bold; margin: 10px 0 5px;">Batas Administrasi</p>' +
    '<div><svg width="24" height="12"><line x1="0" y1="6" x2="24" y2="6" style="stroke:red;stroke-width:2;stroke-dasharray:10 1 1 1 1 1 1 1 1 1" /></svg> Batas Administrasi</div><br>' +

    '<p style="font-size: 12px; font-weight: bold; margin: 10px 0 5px;">Status Keterjangkauan</p>' +
    '<div style="background-color:rgb(157, 242, 151); width:20px; height:10px; display:inline-block;"></div> Dekat <br>' +
    '<div style="background-color:rgb(220, 127, 127); width:20px; height:10px; display:inline-block;"></div> Jauh <br>' +
    '<div style="background-color:rgb(49, 128, 10); width:20px; height:10px; display:inline-block;"></div> Sangat Dekat <br>' +
    '<div style="background-color:rgb(214, 0, 0); width:20px; height:10px; display:inline-block;"></div> Sangat Jauh <br>' +
    '<div style="background-color:rgb(246, 178, 83); width:20px; height:10px; display:inline-block;"></div> Sedang <br>';
  return div;
};
legend.addTo(map);
