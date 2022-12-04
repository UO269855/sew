"use strict";
class Geolocation {
  constructor() {
    navigator.geolocation.getCurrentPosition(
      this.getPosicion.bind(this),
      this.getErrors.bind(this)
    );
  }
  getErrors(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.mensaje = "El usuario no permite acceso a su ubicación";
        break;
      case error.POSITION_UNAVAILABLE:
        this.mensaje = "La posición del usuario no está disponible";
        break;
      case error.TIMEOUT:
        this.mensaje = "Ha caducado la petición de geolocalización";
        break;
      case error.UNKNOWN_ERROR:
        this.mensaje = "Se ha producido un error desconocido";
        break;
    }
  }
  getPosicion(posicion) {
    this.mensaje = "Se ha realizado correctamente la petición";
    this.longitud = posicion.coords.longitude;
    this.latitud = posicion.coords.latitude;
    this.altitud = posicion.coords.altitude;
    this.speed = posicion.coords.speed;
    this.heading = posicion.coords.heading;
  }
  mostrarDatos() {
    var datos = "";
    datos += "<p>" + this.mensaje + "</p>";
    datos += "<ul><li>Longitud: " + this.longitud + " grados</li>";
    datos += "<li>Latitud: " + this.latitud + " grados</li>";
    datos += "<li>Altitud: " + this.altitude + " metros</li>";
    datos += "<li>Velocidad: " + this.speed + " grados</li>";
    datos += "<li>Dirección: " + this.heading + " metros</li></ul>";
    var url =
      "https://maps.googleapis.com/maps/api/staticmap?" +
      "center=" +
      this.latitud +
      "," +
      this.longitud +
      "&zoom=15&size=800x600&markers=color:red%7Clabel:S%7C" +
      this.latitud +
      "," +
      this.longitud +
      "&sensor=false&key=AIzaSyDJldNJqaYu8tF4W0mKpUyO5Pjvg1U8rJA";
    datos += "<img src='" + url + "' alt='Mapa estático de google' />";
    $("p").html(datos);
  }
}
var geo = new Geolocation();