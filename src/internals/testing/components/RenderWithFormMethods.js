import React from "react";
import { useForm } from "react-hook-form";

export default function RenderWithFormMethods({ children }) {
  const methods = useForm({
    mode: "onChange",
  });
  return React.cloneElement(children, { ...methods });
}
