import * as React from "react";
import "leaflet/dist/leaflet.css";
import "./Home.scss";
import MapView from "../MapView/MapView";
import SelectTextField from "../SelectTextField";

export default function Home() {
  return (
    <div className="background">
      <SelectTextField />
      <MapView />
    </div>
  );
}
