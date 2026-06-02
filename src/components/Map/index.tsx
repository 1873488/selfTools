import React from "react";
import styles from "./index.module.less";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Feature, Geometry } from "geojson";
import subRegion from "@/assets/subRegion.json";
import { featureCollection } from "@turf/turf";
export default React.memo(function Map({
    selectedRegionChange,
  }: {
    selectedRegionChange: (regionName: string) => void;
  }) {
    const mapWrapperRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      // 禁用右键菜单
      const originContextMenu = window.document.oncontextmenu;
      window.document.oncontextmenu = () => false;
      let lastHoveFeature: string = null!;
      let selectedRegion: string = null!;
      const regionLayer: L.GeoJSON = L.geoJSON(null, {
        style: {
          color: "#915",
          weight: 1,
          fillColor: "#fff",
        },
        filter: (feature) => {
          if (!selectedRegion) {
            return true;
          }
          const targetGb = selectedRegion.replace(/0+$/g, "");
          return feature.properties.gb.startsWith(targetGb);
        },
      });
      const subRegionLayer: L.GeoJSON = L.geoJSON(null, {
        style: {
          color: "#985",
          weight: 1,
          fillColor: "#fff",
        },
      });
      if (!mapWrapperRef.current) return;
      const map: L.Map = L.map(mapWrapperRef.current).setView([30.5, 114.3], 6);
      L.tileLayer(
        "http://t{s}.tianditu.gov.cn/img_w/wmts?tk=e7ea5b9eef8209c40015fe59f34197b9&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
        { subdomains: ["1", "2", "3", "4", "5", "6", "7", "0"], id: "img" },
      ).addTo(map);
      // 影像注记
      L.tileLayer(
        "http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=e7ea5b9eef8209c40015fe59f34197b9&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
        { subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"], id: "cia" },
      ).addTo(map);
      map.addLayer(regionLayer);
      map.addLayer(subRegionLayer);
      fetch("/china.geojson")
        .then((response) => response.json())
        .then((china) => {
          regionLayer.addData(china);
        });

      regionLayer.on("mouseover", (e) => {
        if (lastHoveFeature === e.sourceTarget.feature.properties.gb) return;
        lastHoveFeature = e.sourceTarget.feature.properties.gb;
        e.target.resetStyle();
        e.sourceTarget.setStyle({
          weight: 2,
          fillColor: "rgba(255, 255, 0, 0.58)",
          zIndex: 999,
        });
      });
      regionLayer.on("mouseout", (e) => {
        lastHoveFeature = null!;
        e.target.resetStyle();
      });
      regionLayer.on("click", (e) => {
        selectedRegion = String(e.sourceTarget.feature.properties.gb);
        selectedRegionChange(e.sourceTarget.feature.properties.name);
        const targetGb = selectedRegion.replace(/0+$/g, "");
        const filteredFeatures = (subRegion!.features ?? []).filter(
          (r) =>
            typeof r.properties?.gb === "string" &&
            r.properties.gb.startsWith(targetGb),
        ) as Feature<Geometry, { name: string; gb: string }>[];
        subRegionLayer.clearLayers();
        subRegionLayer.addData(featureCollection(filteredFeatures));
      });
      map.on("contextmenu", () => {
        selectedRegionChange("");
        selectedRegion = null!;
        subRegionLayer.clearLayers();
      });
      return () => {
        window.document.oncontextmenu = originContextMenu;
        regionLayer?.off("mouseover");
        regionLayer?.off("mouseout");
        regionLayer?.off("click");
        map?.off("contextmenu");
        regionLayer?.remove();
        subRegionLayer?.remove();
        map.remove();
      };
    }, [selectedRegionChange]);

    return <div ref={mapWrapperRef} className={styles.wrapper}></div>;
  },
);
