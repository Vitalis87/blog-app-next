import Iframe from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === "post") {
    
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          // Required: Accepts an async function
          // OR a string
          url: `${process.env.NEXT_PUBLICK_VERCEL_URL || "http://localhost:3000"}/api/preview`,
          // Optional: Set the default size
          defaultSize: `desktop`, // default `desktop`
          // Optional: Add a reload button, or reload on new document revisions
          reload: {
            button: true, // default `undefined`
          },
          // Optional: Pass attributes to the underlying `iframe` element:
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
          attributes: {
            // allow: "fullscreen", // string, optional
            // referrerPolicy: "strict-origin-when-cross-origin", // string, optional
            // sandbox: "allow-same-origin", // string, optional
          },
        })
        .title("Preview"),
    ]);
  }
};
