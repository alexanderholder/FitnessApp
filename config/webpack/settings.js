import { join } from "path" // eslint-disable-line import/no-extraneous-dependencies

const rootPath = process.cwd()

export const getProdPublicPath = () => {
  const assetHost = process.env.AWS_ASSETS_CDN_HOST

  if (!assetHost) {
    throw new Error("You must set AWS_ASSETS_CDN_HOST")
  }

  return `https://${assetHost}/assets/webpack/`
}

export const paths = {
  railsStylesPath: join(rootPath, "app", "assets", "stylesheets"),
  sourcePath: join(rootPath, "app", "assets", "webpack"),
  outputPath: join(rootPath, "public", "assets", "webpack"),
  fallbackPath: join(rootPath, "public", "javascripts"),
  publicPath: "/assets/webpack/",
}

export default { paths }
