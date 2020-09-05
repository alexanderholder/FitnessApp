import Extractor from "mini-css-extract-plugin"
import autoprefixer from "autoprefixer"

import { paths } from "../settings"

const commonLoaders = [
  {
    loader: "postcss-loader",
    options: {
      plugins: () => [
        autoprefixer,
      ],
    },
  }, {
    loader: "sass-loader",
    options: { includePaths: [paths.railsStylesPath] },
  },
]

const styleLoader = {
  loader: "style-loader",
  options: { attrs: { nonce: "devOnly" } },
}

const cssModulesFlowTypesLoader = {
  loader: "css-modules-flow-types-loader",
  options: { attrs: { nonce: "devOnly" } },
}

const cssDevLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    localIdentName: "[local]--[hash:base64:8]",
  },
}

const cssProdLoader = {
  loader: "css-loader",
  options: {
    ...cssDevLoader.options,
    minimize: true,
    localIdentName: "[hash:base64:12]",
  },
}

export const developmentSassLoader = {
  test: /\.s?css$/,
  use: [
    styleLoader,
    cssModulesFlowTypesLoader,
    cssDevLoader,
    ...commonLoaders,
  ],
}

export const productionSassLoader = {
  test: /\.s?css$/,
  use: [
    Extractor.loader,
    cssProdLoader,
    ...commonLoaders,
  ],
}

export default process.env.NODE_ENV === "development"
  ? developmentSassLoader
  : productionSassLoader
