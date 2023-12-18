import fs from 'fs-extra'
import path from 'path'
import logger from '@docusaurus/logger'

export default class Module {
  #context
  #options
  #modules

  static isCourse(doc) {
    return /\/\d+$/.test(doc.id)
  }

  static isDraft(doc) {
    return doc.frontMatter.draft
  }

  constructor(context, options, modules) {
    this.#context = context
    this.#options = options
    this.#modules = modules
  }

  get context() {
    return this.#context
  }

  get options() {
    return this.#options
  }

  get modules() {
    return this.#modules
  }

  loadFile = async (relativePath, encoding = 'utf-8') => {
    try {
      const filePath = path.join(this.#context.siteDir, relativePath.replace('@site', ''))
      return await fs.readFile(filePath, encoding)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}
