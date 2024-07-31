import React from "react";

/**
 * The hook to set the document title
 * @param {string | null} title The title of the document
 */
export function useDocumentTitle(title) {
  if (typeof title !== "string") throw new Error("Title must be a string");
  React.useEffect(() => {
    document.title = title ?? "Untitled";
  }, [title]);
}
