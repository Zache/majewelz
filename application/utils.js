export function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function distinct(arr, selector) {
    const dict = arr.map(item => ({ key: selector(item), item }))
    .reduce((agg, next) => {
        agg[next.key] = next.item;
        return agg;
    }, {});

    return Object.keys(dict).map(key => dict[key]);
}