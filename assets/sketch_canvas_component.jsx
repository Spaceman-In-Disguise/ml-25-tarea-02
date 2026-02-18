import React, { useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const SketchCanvasWrapper = ({
  canvasId,
  width,
  height,
  strokeWidth,
  strokeColor,
  canvasColor,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Register global export function for this canvas
    window[`exportCanvas_${canvasId}`] = async () => {
      if (canvasRef.current) {
        try {
          const dataUrl = await canvasRef.current.exportImage("png");
          return dataUrl;
        } catch (e) {
          console.error("Export failed:", e);
          return "";
        }
      }
      return "";
    };

    // Register global clear function for this canvas
    window[`clearCanvas_${canvasId}`] = () => {
      if (canvasRef.current) {
        canvasRef.current.clearCanvas();
      }
    };

    // Register global undo function for this canvas
    window[`undoCanvas_${canvasId}`] = () => {
      if (canvasRef.current) {
        canvasRef.current.undo();
      }
    };

    // Register global redo function for this canvas
    window[`redoCanvas_${canvasId}`] = () => {
      if (canvasRef.current) {
        canvasRef.current.redo();
      }
    };

    return () => {
      delete window[`exportCanvas_${canvasId}`];
      delete window[`clearCanvas_${canvasId}`];
      delete window[`undoCanvas_${canvasId}`];
      delete window[`redoCanvas_${canvasId}`];
    };
  }, [canvasId]);

  return (
    <ReactSketchCanvas
      ref={canvasRef}
      width={width || "150px"}
      height={height || "150px"}
      strokeWidth={strokeWidth || 3}
      strokeColor={strokeColor || "#ffffff"}
      canvasColor={canvasColor || "#333333"}
      style={{
        border: "none",
        borderRadius: "0",
        display: "block",
        padding: "0",
        margin: "0",
      }}
      svgStyle={{
        display: "block",
      }}
    />
  );
};

export default SketchCanvasWrapper;
