import crypto from 'crypto'
import fs from 'fs-extra'
import path from 'path'

export default function eTcmPlugin(context, options) {
  const { siteDir } = context
  const {
    algorithm = 'md5', digest = 'hex', dir, length = 7,
  } = options
  return {
    name: 'ETcm-plugin',
    async contentLoaded({ actions }) {
      const { setGlobalData } = actions
      const files = await fs.readdir(path.join(siteDir, dir))
      const identified = files.reduce((accumulator, file) => {
        accumulator[file] = crypto.createHash(algorithm).update(file).digest(digest).substring(0, length)
        return accumulator
      }, {})
      setGlobalData(identified)
    }
  }
}
