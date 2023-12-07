const lowerFirst = (s) => `${s[0].toLowerCase()}${s.slice(1)}`

export default async function docsExt(context, options) {
  const modules = {}
  const Classnames = ['Converter', 'Processor', 'Recommender']
  Classnames.forEach((classname) => {
    const Class = require(`./${classname}`)
    modules[lowerFirst(classname)] = new Class(context, options, modules)
  })
  return {
    name: 'custom-plugin-docs-ext',
    async contentLoaded(args) {
      const { processor, recommender } = modules
      await processor.preprocess(args)
      await recommender.recommend(args)
      processor.postprocess(args)
    },
  }
}
