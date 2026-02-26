import { redirect } from "next/navigation";
import { swaggerSpec } from "../../lib/swagger";
import SwaggerPage from "./SwaggerPage";

export default function Page() {
  if (process.env.NODE_ENV !== "development") {
    redirect("/");
  }

 return (
    <>
      <style>{`
        .fixed.top-0.w-full.z-50 { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      <SwaggerPage spec={swaggerSpec} />
    </>
  );
}