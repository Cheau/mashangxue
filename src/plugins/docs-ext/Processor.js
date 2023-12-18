import Module from './Module'

export default class Processor extends Module {

  constructor() {
    super(...arguments)
  }

  #withHints(frontMatter, content) {
    const lines = content
      .trimStart()
      // Remove Markdown alternate title
      .replace(/^[^\r\n]*\r?\n[=]+/g, '')
      // Remove front matter
      .replace(/^(\r?\n)*---\r?\n.*\r?\n---\r?\n/, '')
      .split(/\r?\n/)
    frontMatter.hints = []
    for (const line of lines) {
      if (!line) continue
      if (/^# .*/.test(line)) continue
      if (/> .+/.test(line)) {
        let start = -1
        for (let i = 0; i < line.length; i++) {
          if (line.charAt(i) !== '`') continue
          if (start < 0)  {
            start = i + 1
            continue
          }
          frontMatter.hints.push(line.substring(start, i))
          start = -1
        }
      }
      break
    }
  }

  #withImage(frontMatter, id) {
    if (frontMatter.image) return
    frontMatter.image = `/img/${id}.svg`
  }

  #withKeywords(frontMatter, content) {
    if (frontMatter.keywords) return
    const lookups = content.match(/(?<=\[)[a-zA-Z-'() :]+\/([a-z]+\.|:[^\]]+)(\/\d+)?(?=])/g)
    if (!lookups) return
    frontMatter.keywords = lookups.map((lookup) => {
      const word = lookup.split('/')[0]
      const [variant, original] = word.split(':')
      return original ?? variant
    })
  }

  #toPoint = [0.5, 1, 1.7, 2.5]
  #withRate(frontMatter) {
    const { keywords, rate } = frontMatter
    if (rate || !keywords) return
    const points = keywords
      .map((s) => s.split(/ +/))
      .flat()
      .map((word) => this.#toPoint[Math.min(Math.floor(word.length / 4), 3)])
      .reduce((sum, num) => (sum + num), 0)
    frontMatter.rate = points < 7 ? 1 : (points < 10 ? 2 : 3)
  }

  #dir
  #date
  #process = async (doc) => {
    if (!Module.isCourse(doc)) return
    const { frontMatter, id, sourceDirName } = doc
    if (sourceDirName !== this.#dir) {
      this.#dir = sourceDirName
      this.#date = new Date(frontMatter.date) ?? new Date()
    } else if (frontMatter.date) {
      this.#date = new Date(frontMatter.date)
    }
    frontMatter.date = this.#date.toLocaleDateString('zh-CN')
    this.#date.setDate(this.#date.getDate() + 1)
    const content = await this.loadFile(doc.source)
    this.#withHints(frontMatter, content)
    this.#withImage(frontMatter, id)
    this.#withKeywords(frontMatter, content)
    this.#withRate(frontMatter)
  }

  process = async (content) => {
    const { docs } = content['loadedVersions'][0]
    await Promise.all(docs.map(this.#process))
  }
}
