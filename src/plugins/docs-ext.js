import fs from 'fs-extra'
import path from 'path'
import logger from '@docusaurus/logger'

const isCourse = (doc) => /\/\d+$/.test(doc.id)

function withHints(frontMatter, content) {
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

function withKeywords(frontMatter, content) {
  if (frontMatter.keywords) return
  const lookups = content.match(/(?<=\[)[a-zA-Z- :]+\/[a-z]+\.(\/\d+)?(?=])/g)
  frontMatter.keywords = lookups.map((lookup) => {
    const word = lookup.split('/')[0]
    const [variant, original] = word.split(':')
    return original ?? variant
  })
}

function withRate(frontMatter) {
  const { keywords, rate } = frontMatter
  if (rate) return
  let count = 0
  let complexity = 0
  keywords.map((s) => s.split(/ +/)).forEach((group) => {
    count += group.length
    const { length } = group.filter((word) => word.length > 8)
    complexity += length > 0 ? length : (group.join('').length > 8 ? 1 : 0)
  })
  frontMatter.rate = 1
  if (count > 5) frontMatter.rate++
  if (complexity > 2) frontMatter.rate++
}

function postprocess(doc) {
  if (!isCourse(doc)) return
  const { frontMatter, id } = doc
  if (!frontMatter.image) frontMatter.image = `/img/${id}.svg`
}

function toCompact(doc) {
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

function toComplete(doc) {
  const { permalink } = doc
  postprocess(doc)
  const { id, ...rest } = toCompact(doc)
  return {
    ...rest,
    permalink,
  }
}

function buildLatest(docs, options) {
  const { filters = [], perSize = 21 } = options
  const latest = filters.reduce((json, filter) => {
    json[filter] = []
    return json
  }, {})
  for (let i = docs.length - 1; i >= 0; i--) {
    const doc = docs[i]
    const group = latest[doc.sourceDirName]
    if (!group || group.length === perSize) continue
    group.push(toCompact(doc))
    if (group.length === perSize) {
      if (filters.length === 1) break
      filters.splice(0, 1)
    }
  }
  return latest
}

function buildRandom(docs, options = {}) {
  const { size = 8 } = options
  const random = {}
  while (Object.keys(random).length < size) {
    const pos = Math.floor(Math.random() * docs.length)
    if (isCourse(docs[pos])) random[pos] = toComplete(docs[pos])
  }
  return Object.values(random)
}

function build(docs, options = {}) {
  const { latest, random } = options
  return {
    latest: buildLatest(docs, latest),
    random: buildRandom(docs, random),
  }
}

export default async function docsExt(context, options) {
  return {
    name: 'custom-plugin-docs-ext',
    async contentLoaded({ actions: { createData, addRoute }, allContent }) {
      let dir
      let date
      async function loadFile(doc) {
        try {
          const filePath = path.join(context.siteDir, doc.source.replace('@site', ''))
          return await fs.readFile(filePath, 'utf-8')
        } catch (err) {
          logger.error(err)
          throw err
        }
      }
      async function preprocess(doc) {
        if (!isCourse(doc)) return
        const { frontMatter, sourceDirName } = doc
        if (sourceDirName !== dir) {
          dir = sourceDirName
          date = new Date(frontMatter.date) ?? new Date()
        } else if (frontMatter.date) {
          date = new Date(frontMatter.date)
        }
        frontMatter.date = date.toLocaleDateString('zh-CN')
        date.setDate(date.getDate() + 1)
        const content = await loadFile(doc)
        withHints(frontMatter, content)
        withKeywords(frontMatter, content)
        withRate(frontMatter)
      }
      async function recommend(docs) {
        const data = build(docs, options)
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
      const { docs } = allContent['docusaurus-plugin-content-docs']['default']['loadedVersions'][0]
      await Promise.all(docs.map(preprocess))
      await recommend(docs)
      docs.forEach(postprocess)
    },
  }
}
