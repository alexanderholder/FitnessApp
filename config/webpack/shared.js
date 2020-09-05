import { join } from "path" // eslint-disable-line import/no-extraneous-dependencies
import webpack from "webpack"

import { paths } from "./settings"
import babelLoader from "./loaders/babel"
import erbLoader from "./loaders/erb"
import sassLoader from "./loaders/sass"

const loaders = [
  erbLoader,
  babelLoader,
  sassLoader,
]

const entry = {
  workouts_calendar: join(paths.sourcePath, "workouts"),
}

const config = {
  entry,
  output: {
    publicPath: paths.publicPath,
    path: paths.outputPath,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js.erb", ".mjs", ".js", ".jsx", ".json"], // as long as we use the routes gem, we need to keep
    modules: [                                               // erb.js as first to resolve, as part of a workaround
      paths.sourcePath,                                      // to build the routes file for jest
      "node_modules",
    ],
  },
  module: { rules: loaders },
  optimization: {
    runtimeChunk: { name: "manifest" },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
        shared: {
          name: "shared",
          minChunks: 2,
          // Make sure nothing from enzyme_for_test goes into shared, as enzyme_for_test is loaded before shared in qunit and teaspoon
          chunks: chunk => chunk.name !== "enzyme_for_test",
        },
      },
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.TARGET_RAILS_ENV": JSON.stringify(process.env.TARGET_RAILS_ENV || process.env.NODE_ENV),
    }),
  ],
}

export default config
