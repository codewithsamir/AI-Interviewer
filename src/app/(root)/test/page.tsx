"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ToggleButton() {
  const [active, setActive] = useState(false);

  

  return (
    // <button
    //   onClick={() => setActive(!active)}
    //   className={`px-4 py-2 text-white rounded ${
    //     active ? "bg-green-600" : "bg-red-600"
    //   }`}
    // >
    <button
      onClick={() => setActive(!active)}
      className={cn("px-4 py-2 text-white rounded bg-red-600",
        active && "bg-green-600" )}
    >
      {active ? "Active" : "Inactive"}
    </button>
  );
}
