/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
// gatsby-browser.js

export const onInitialClientRender = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const targetDomain = "mayankd.me";
      const sourceDomain = "mayankd409.github.io";
  
      if (hostname === sourceDomain) {
        const newUrl = `https://${targetDomain}${window.location.pathname}${window.location.search}`;
        window.location.replace(newUrl);
      }
    }
  };
  