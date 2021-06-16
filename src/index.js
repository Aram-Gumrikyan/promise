// let config = {
//     type: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     data: {
//         completed: false,
//         id: 12312312,
//         title: "delectus aut autem",
//         userId: 234234234234,
//     },
// };
// let config = {
//     type: "PATCH",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     data: {
//         title: "foo",
//     },
// };
// let config = {
//     type: "DELETE",
// };
//
//
//
//
let config = {};
let obj = ajax("https://jsonplaceholder.typicode.com/todos/1", config);
obj.then(
    (res) => {
        obj = new MyPromise(function () {
            setTimeout(() => {
                this.resolve("Hello");
            }, 1000);
        });
        return obj;
    },
    (e) => {
        console.log(e);
    }
)
    .then((res) => {
        res.then((res) => {
            console.log(res);
        });
        let obj = new MyPromise(function () {
            setTimeout(() => {
                this.resolve("Hello2");
            }, 3000);
        });
        return obj;
    })
    .then((res) => {
        res.then((res) => {
            console.log(res);
        });
    });
//
//
//
//
// let obj = ajax("https://jsonplaceholder.typicode.com/todos/1");
// obj.then(
//     (res) => {
//         console.log(res);
//     },
//     (e) => {
//         console.log(e);
//     }
// );
// let obj2 = ajax("https://jsonplaceholder.typicode.com/todos/1");
// obj.then(
//     (res) => {
//         console.log(res);
//     },
//     (e) => {
//         console.log(e);
//     }
// );
// MyPromise.all([obj, obj2]).then((res) => {
//     console.log(res);
// });
