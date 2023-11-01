export function filter(fn, arr) {
    const f = []
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            f.push(arr[i])
        }
    }
    return f
}
