const cache = {}

export default async function prefetch(uri) {
  if (!cache[uri]) {
    cache[uri] = new Promise(async (resolve, reject) => {
      const result = await fetch(uri)
      if (result.ok) {
        const data = await result.json()
        resolve(data)
        cache[uri] = data
      } else {
        reject(result)
      }
    })
  }
  if (cache[uri] instanceof Promise) {
    return await cache[uri]
  }
  return cache[uri]
}
