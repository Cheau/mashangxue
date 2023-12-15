import pluginContentDocs, { validateOptions as validate } from '@docusaurus/plugin-content-docs'

const lowerFirst = (s) => `${s[0].toLowerCase()}${s.slice(1)}`

let extOptions

export default async function pluginContentDocsExt(context, options) {
  const modules = {}
  const Classnames = ['Converter', 'Processor', 'Recommender']
  Classnames.forEach((classname) => {
    const Class = require(`./${classname}`)
    modules[lowerFirst(classname)] = new Class(context, extOptions, modules)
  })
  const pluginInstance = await pluginContentDocs(context, options)
  const { loadContent, contentLoaded, configureWebpack } = pluginInstance
  return {
    ...pluginInstance,
    async loadContent() {
      const { processor } = modules
      const content = await loadContent()
      await processor.process(content)
      return content
    },
    async contentLoaded(args) {
      const { recommender } = modules
      await recommender.recommend(args)
      await contentLoaded(args)
    },
    configureWebpack() {
      const config = configureWebpack(...arguments)
      const mdxRule = config.module.rules.find((rule) => rule.test.toString() === '/\\.mdx?$/i')
      const mdxLoader = mdxRule.use.find(({ loader }) => /mdx-loader/.test(loader))
      const { createAssets } = mdxLoader.options
      mdxLoader.options.createAssets = (arg) => {
        const { frontMatter, metadata } = arg
        Object.entries(metadata.frontMatter).forEach(([key, value]) => frontMatter[key] = value)
        return createAssets(arg)
      }
      return config
    }
  }
}

export function validateOptions(rawOptions) {
  const { options: { ext, ...options } } = rawOptions
  extOptions = ext
  return validate({ ...rawOptions, options })
}
