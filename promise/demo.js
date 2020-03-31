/*var p = new Promise((r,j) => {
    j(1)
});

p.then(r=>r).then(r=>r, j=> {
 console.log(j, 2222);
 return j;
}).catch(e=>console.log(e, 111))
*/

/*

var p3 = Promise.resolve(100)

async function fn1() {
    var ret = await p3;
    console.log(1111)
}

fn1();
*/

/*
Promise.all([
    Promise.resolve(1), 
    Promise.resolve(2), 
    Promise.reject(3666), 
])
.then(r => console.log(r,3333))
*/

/**
Promise.race([
    Promise.resolve(1), 
    Promise.resolve(2), 
    Promise.reject(3666), 
])
.then(r => console.log(r,3333))

*/

/*
Promise.all([
    Promise.resolve(1), 
    Promise.resolve(2), 
    Promise.reject(3666), 
])
.then(r => console.log(r,3333))
.catch(r => console.log(r,5555))
.finally(r => console.log(r,44444))
*/


function red() { console.log('red')}
function green() { console.log('green')}
function yellow() { console.log('yellow')}

var task = (timer, light) => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (light === 'red') {
                red();
            }
            if (light === 'green') {
                green();
            }
            if (light === 'yellow') {
                yellow();
            }
            resolve()
        }, timer)
    })
}

// promise 
var step = () => {
    task(3000, 'red')
        .then(() => task(1000, 'green'))
        .then(() => task(2000, 'yellow'))
        .then(step)
}
step();

// async/await
var step = async() => {
    await task(3000, 'red')
    await task(1000, 'green')
    await task(2000, 'yellow')
    step();
}

step();