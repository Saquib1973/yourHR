import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

export default function PdfViewer({ pdfFile }: { pdfFile: string }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-[70vh]">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
