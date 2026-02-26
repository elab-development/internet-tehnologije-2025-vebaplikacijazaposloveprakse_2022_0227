"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { 
  ssr: false,
  loading: () => (
    <div className="p-10 text-center">
      <p className="text-lg animate-pulse">Ucitavanje dokumentacije...</p>
    </div>
  )
});

export default function SwaggerPage({ spec }: { spec: object }) {
  if (!spec) {
    return <div className="p-10 text-red-500">Greska: Specifikacija nije pronadjena.</div>;
  }
  return (
    <div className="swagger-wrapper">
      <SwaggerUI spec={spec} />
    </div>
  );
}