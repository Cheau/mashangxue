import Module from './Module'

export default class Converter extends Module {

  constructor() {
    super(...arguments)
  }

  toCompact(doc) {
    const {
      description, frontMatter, id, title,
    } = doc
    return {
      ...frontMatter,
      description,
      id: /(?<=\/)\d+$/.exec(id)[0],
      title,
    }
  }

  toComplete(doc) {
    const { processor } = super.modules
    const { permalink } = doc
    processor.postprocess(doc)
    const { id, ...rest } = this.toCompact(doc)
    return {
      ...rest,
      permalink,
    }
  }
}
