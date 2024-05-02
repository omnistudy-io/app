export default function equal(a: object, b: object) {
    if(a == undefined || b == undefined)
        return a == b;

    let equal = true;
    Object.entries(a).forEach(([k, v]) => {
        // console.log(`Entry in a: [${k}, ${v}]`);
        const bContainsKey = Object.keys(b).includes(k);
        // console.log(`b contains key '${k}': ${bContainsKey}`);
        const bEntry = Object.entries(b).filter(([bk, bv]) => k == bk)[0];
        // console.log(bEntry);
        // console.log(`Corresponding entry in b: [${b[0]}, ${b[1]}]`);
        const bv = bEntry[1];
        if(!bContainsKey || v !== bv)
            equal = false;
    });
    return equal;
}

// const a = {
//     id: 1,
//     city: "Minneapolis",
//     state: "",
//     active: false
// }
// const b = {
//     id: 1,
//     city: "Minneapolis",
//     state: "",
//     active: false
// }
// console.log(equal(a, b));