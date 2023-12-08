import Module from './Module'

export default class Converter extends Module {

  constructor() {
    super(...arguments)
  }

  toCompact(doc) {
    const {
      description, frontMatter: { image, ...frontMatter }, id, title,
    } = doc
    return {
      ...frontMatter,
      description,
      id: /(?<=\/)\d+$/.exec(id)[0],
      title,
    }
  }

  toComplete(doc) {
    const {
      description, frontMatter, permalink: link, title,
    } = doc
    return {
      ...frontMatter,
      description,
      link,
      title,
    }
  }
}
