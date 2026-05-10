import React from "react";
import styles from "./index.module.less";
import type { IBaseProps } from "@/utils";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export interface IMapProps extends IBaseProps {}

export default React.memo(() => {
  const mapWrapperRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!mapWrapperRef.current) return;
    const map: L.Map = L.map(mapWrapperRef.current).setView([30.5, 114.3], 6);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",

    ).addTo(map);
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapWrapperRef} className={styles.wrapper}></div>;
});
