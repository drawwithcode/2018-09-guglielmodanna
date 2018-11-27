var myMap;
var canvas;
var mappa = new Mappa('MapboxGL', 'pk.eyJ1IjoiZ3VnbGllbG1vZGFubmEiLCJhIjoiY2pwMDE3NmNnMnpzdzNxbmhsejFqYzAzNSJ9.3gEY-vPDgb6TaaQ1TOj1Iw');

var dialog;

window.onload = function(){
  dialog = document.getElementById("dialog");
}

var duomoLat = 45.4640976;
var duomoLong = 9.1897378;
var myLoc;

var fireBallRadius = 0.180;
var fireBallFence;
var fireBallx1;
var fireBallx2;
var fireBally1;
var fireBally2;

var airBlastRadius = 0.340;
var airBlastFence;
var airBlastx1;
var airBlastx2;
var airBlasty1;
var airBlasty2;

var radiationRadius = 1.2;
var radiationFence;
var radiationx1;
var radiationx2;
var radiationy1;
var radiationy2;

var options = {
  lat: duomoLat,
  lng: duomoLong,
  zoom: 12,
  style: 'mapbox://styles/guglielmodanna/cjp03mrgaat3g2so70hllh7pr'
}

function preload() {
  myLoc = getCurrentPosition();
}

function getLatitude(km) {
  return km / 110.754;
}

function getLongitude(km, latitude) {
  return km / (111.320 * cos(latitude / 110.754));
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Fireball
  fireBallFence = new geoFenceCircle(duomoLat, duomoLong, fireBallRadius, insideFireBall, 'km');
  fireBallx1 = duomoLat - getLatitude(fireBallRadius);
  fireBally1 = duomoLong - getLongitude(fireBallRadius, fireBallx1);
  fireBallx2 = duomoLat + getLatitude(fireBallRadius);
  fireBally2 = duomoLong + getLongitude(fireBallRadius, fireBallx1);

  // Airblast
  airBlastFence = new geoFenceCircle(duomoLat, duomoLong, airBlastRadius, insideairBlast, 'km');
  airBlastx1 = duomoLat - getLatitude(airBlastRadius);
  airBlasty1 = duomoLong - getLongitude(airBlastRadius, airBlastx1);
  airBlastx2 = duomoLat + getLatitude(airBlastRadius);
  airBlasty2 = duomoLong + getLongitude(airBlastRadius, airBlastx1);

  // radiation
  radiationFence = new geoFenceCircle(duomoLat, duomoLong, radiationRadius, insideradiation, 'km');
  radiationx1 = duomoLat - getLatitude(radiationRadius);
  radiationy1 = duomoLong - getLongitude(radiationRadius, radiationx1);
  radiationx2 = duomoLat + getLatitude(radiationRadius);
  radiationy2 = duomoLong + getLongitude(radiationRadius, radiationx1);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function insideFireBall(myLoc) {
  dialog.textContent = "If the Hiroshima bomb were dropped on Milan, you would die from the fireball.";
}

function insideairBlast(myLoc) {
  dialog.textContent = "If the Hiroshima bomb were dropped on Milan, you have a 99% chance to die from the airblast";
}

function insideradiation(myLoc) {
  dialog.textContent = "If the Hiroshima bomb were dropped on Milan, you have a 50% to 90% chance to die from radiation";
}

function draw() {
  clear();
  var me = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  var zoom = myMap.zoom();
  ellipseMode(RADIUS);
  strokeWeight(2);
  fill(255);
  stroke(0);
  textAlign(CENTER);
  textSize(zoom * 2);
  text("YOU", me.x, me.y);


  ellipseMode(CORNERS);

  // Airblast
  fill(255, 221, 0, 100);
  stroke(255, 221, 0, 200);
  var airBlastCorner1 = myMap.latLngToPixel(airBlastx1, airBlasty1);
  var airBlastCorner2 = myMap.latLngToPixel(airBlastx2, airBlasty2);
  ellipse(airBlastCorner1.x, airBlastCorner1.y, airBlastCorner2.x, airBlastCorner2.y);

  // Radiation radius
  fill(59, 255, 0, 100);
  stroke(59, 255, 0, 200);
  var radiationCorner1 = myMap.latLngToPixel(radiationx1, radiationy1);
  var radiationCorner2 = myMap.latLngToPixel(radiationx2, radiationy2);
  ellipse(radiationCorner1.x, radiationCorner1.y, radiationCorner2.x, radiationCorner2.y);

  // Fireball
  fill(255, 46, 0, 100);
  stroke(255, 46, 0, 200);
  var fireBallCorner1 = myMap.latLngToPixel(fireBallx1, fireBally1);
  var fireBallCorner2 = myMap.latLngToPixel(fireBallx2, fireBally2);
  ellipse(fireBallCorner1.x, fireBallCorner1.y, fireBallCorner2.x, fireBallCorner2.y);
}
