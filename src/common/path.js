const pathRegex = /(?<dir>.*\/)?(?<name>[^/.]+)(\.(?<ext>[^.]+$))?/

export const destruct = (path) => {
  const { groups } = pathRegex.exec(path)
  return groups
}

export const directory = (path) => {
  const { dir } = destruct(path)
  return dir
}

export const filename = (path) => {
  const { name } = destruct(path)
  return name
}

export const extension = (path) => {
  const { ext } = destruct(path)
  return ext
}
