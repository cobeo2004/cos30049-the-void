import React from "react";

/**
 * The hook to set the document title
 * @param {string | null} title The title of the document
 */
export function useDocumentTitle(title) {
  React.useEffect(() => {
    document.title = title ?? "Untitled";
  }, [title]);
}
