export function first(array, n = 1) {
    if (n === 1) return array[0]
    return array.filter((_, index) => index < n)
  }
  
export function last(array, n = 1) {
    if (n === 1) return array[array.length - 1]
    return array.filter((_, index) => array.length - index <= n)
}

export function pluck(array, key) {
    return array.map(element => element[key])
}

export function groupBy(array, key) {
    return array.reduce((group, element) => {
        const keyValue = element[key]
        return { ...group, [keyValue]: [...(group[keyValue] ?? []), element] }
    }, {})
}

export function unique(array) {
    return [...new Set(array)];
}