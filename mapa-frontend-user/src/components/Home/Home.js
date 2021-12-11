import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import "./Home.scss";
import MapView from "../MapView/MapView";
import petitions from "../Petitions";

export default function Home() {
  return (
    <div>
      <div>
        <MapView />
      </div>
    </div>
  );
}
