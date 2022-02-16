import * as React from "react";
import "leaflet/dist/leaflet.css";
import "./Home.scss";
import MapView from "../MapView/MapView";

export default function Home() {
  return (
    <div className="background">
      <MapView />
    </div>
  );
}
