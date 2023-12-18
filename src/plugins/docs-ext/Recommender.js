import Module from './Module'

export default class Recommender extends Module {

  constructor() {
    super(...arguments)
  }

  #isRecommendable(doc) {
    return Module.isCourse(doc) && !(Module.isDraft(doc) && process.env.NODE_ENV === 'production')
  }

  #buildLatest(docs, options) {
    const { converter } = super.modules
    const { filters = [], perSize = 41 } = options
    const latest = filters.reduce((json, filter) => {
      json[filter] = []
      return json
    }, {})
    for (let i = docs.length - 1; i >= 0; i--) {
      const doc = docs[i]
      if (!this.#isRecommendable(doc)) continue
      const group = latest[doc.sourceDirName]
      if (!group || group.length === perSize) continue
      group.push(converter.toCompact(doc))
      if (group.length === perSize) {
        if (filters.length === 1) break
        filters.splice(0, 1)
      }
    }
    return latest
  }

  #buildRandom(docs, options = {}) {
    const { converter } = super.modules
    const { size = 8 } = options
    const random = {}
    while (Object.keys(random).length < size) {
      const pos = Math.floor(Math.random() * docs.length)
      const doc = docs[pos]
      if (this.#isRecommendable(doc)) random[pos] = converter.toComplete(doc)
    }
    return Object.values(random)
  }

  #build(docs) {
    const { latest, random } = super.options
    return {
      latest: this.#buildLatest(docs, latest),
      random: this.#buildRandom(docs, random),
    }
  }

  async recommend({ actions: { createData, addRoute }, allContent }) {
    const { docs } = allContent['docusaurus-plugin-content-docs']['default']['loadedVersions'][0]
    const data = this.#build(docs)
    const filePath = await createData('recommend.json', JSON.stringify(data))
    addRoute({
      path: '/',
      component: '@site/src/components/Home/index.js',
      modules: {
        recommend: filePath,
      },
      exact: true,
    })
  }
}
