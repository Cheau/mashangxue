export const halt = (func = () => {}) => (e) => {
    e.stopPropagation()
    func(e)
}
