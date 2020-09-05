import { readFileSync } from "fs"

const babelConfig = JSON.parse(readFileSync(".babelrc"))

// disable module transpilation - webpack2 handles this natively
babelConfig.presets[0][1].modules = false

if (process.env.NODE_ENV === "development") {
  babelConfig.cacheDirectory = true
}

export default {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: "babel-loader",
    options: babelConfig,
  }],
}
