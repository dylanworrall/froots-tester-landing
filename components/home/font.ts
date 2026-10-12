import { Inter } from "next/font/google";

/** The app's body face (index.css sets Inter on <body>), for the product widgets only. Not
 *  preloaded: the widgets sit below the fold, so they never compete with the hero for LCP. */
export const appFont = Inter({ subsets: ["latin"], display: "swap", preload: false });
