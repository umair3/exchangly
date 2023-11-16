// console.log(123)
// Find two numbers whose sum is 10
// let values=[3,5,-4,8,11,1,-1,6];
// const target=10;
// function findTargetSum(vals) {

// }

// findTargetSum(values)

let values=[3,5,-4,8,11,1,-1,6];
const target=10;

function findTargetSum(vals) {
    let dict = {}
    for(let i=0; i<vals.length; i++) {
        // console.log(vals[i])
        if(vals[i] in dict){
            // do nothing
        }else{
            dict[vals[i]]=vals[i]
        }
    }
    let a=0,b=0
    for(let i=0; i<vals.length; i++) {
        if(target-vals[i] in dict){
            console.log(`${target} ${vals[i]}`)
            a = vals[i]
            b = dict[target-vals[i]]
            break
        }
    }
    // console.log(dict)
    console.log(`answer is ${a}+${b}=${target}`)
}

findTargetSum(values)