"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map,
  NavigationControl,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

const INDIA_CENTER: [number, number] = [78.9629, 20.5937];

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Creating map...");

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const map = new Map({
      container: containerRef.current,

      // Completely local style.
      // No external sources or network requests.
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "#20252b",
            },
          },
        ],
      },

      center: INDIA_CENTER,
      zoom: 4.25,
      minZoom: 3,
      maxZoom: 18,

      // Explicitly use a minimal WebGL2 context.
      canvasContextAttributes: {
        contextType: "webgl2",
        antialias: false,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
      },

      attributionControl: false,
    });

    const handleLoad = () => {
      console.log("[TrainTracker] Map loaded");
      setStatus("Map loaded");
    };

    const handleStyleLoad = () => {
      console.log("[TrainTracker] Style loaded");
      setStatus("Style loaded");
    };

    const handleError = (event: unknown) => {
      console.error("[TrainTracker] MapLibre error:", event);
      setStatus("MapLibre error — check console");
    };

    const handleContextLost = () => {
      console.error("[TrainTracker] WebGL context lost");
      setStatus("WebGL context lost");
    };

    const handleContextRestored = () => {
      console.log("[TrainTracker] WebGL context restored");
      setStatus("WebGL context restored");
    };

    map.on("load", handleLoad);
    map.on("style.load", handleStyleLoad);
    map.on("error", handleError);
    map.on("webglcontextlost", handleContextLost);
    map.on("webglcontextrestored", handleContextRestored);

    map.addControl(
      new NavigationControl({
        showCompass: false,
      }),
      "bottom-right",
    );

    return () => {
      map.off("load", handleLoad);
      map.off("style.load", handleStyleLoad);
      map.off("error", handleError);
      map.off("webglcontextlost", handleContextLost);
      map.off("webglcontextrestored", handleContextRestored);

      map.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="map-view">
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 10,
          padding: "6px 10px",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 6,
          background: "rgba(10,10,11,0.9)",
          color: "#aaa",
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        {status}
      </div>
    </div>
  );
}