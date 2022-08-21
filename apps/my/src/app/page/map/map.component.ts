import {Component, OnInit} from '@angular/core';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import {Geometry, Point} from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'my-location-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map?: Map;
  vectorSource: VectorSource;
  vectorLayer: VectorLayer<VectorSource<Geometry>>;
  osm = new TileLayer({source: new OSM()});

  constructor(private toastr: ToastrService) {
    const myLocation = new Feature({
      geometry: new Point(fromLonLat([80.697917, 7.877083])),// Center of Sri lanka as initial position
    });
    myLocation.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 15,
          fill: new Fill({
            color: 'rgba(231, 76, 60, 0.2)',
          }),
          stroke: new Stroke({
            width: 2,
            color: 'rgb(255, 0, 0)',
          }),
        }),
      })
    );

    this.vectorSource = new VectorSource({
      features: [myLocation],
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
  }

  getPosition() {
    navigator.geolocation.watchPosition(
      (position) => {
        const myLocation = new Feature({
          geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])),
        });
        myLocation.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 15,
              fill: new Fill({
                color: 'rgba(231, 76, 60, 0.2)',
              }),
              stroke: new Stroke({
                width: 2,
                color: 'rgb(255, 0, 0)',
              }),
            }),
          })
        );

        this.vectorSource = new VectorSource({
          features: [myLocation],
        });

        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
        });

        if (this.map) {
          this.map.setView(new View({
            center: fromLonLat([position.coords.longitude, position.coords.latitude]),
            zoom: 12,
            smoothExtentConstraint: true,
            smoothResolutionConstraint: true
          }));
          this.map.setLayers([this.osm, this.vectorLayer]);
        }
      },
      (err) => {
        this.toastr.error(err?.message, 'Error', {
          timeOut: 3000,
          easing: 'ease-in'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  ngOnInit(): void {
    this.map = new Map({
      layers: [this.osm],
      target: 'map',
      view: new View({
        center: fromLonLat([80.697917, 7.877083]),// Center of Sri lanka as initial position
        zoom: 9,
      }),
    })
    this.getPosition();
  }
}




