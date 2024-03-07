"use strict";
const user = {
    firstName: 'Jane',
    age: 20,
    email: 'jane@doe.com',
    orders: [{ productId: '1', price: 200 }],
    register() {
        return 'a';
    },
};
const printLog = (message) => { };
printLog(user.password);
const author = {
    age: 2,
    books: ['1'],
    email: 'author@gmail.com',
    firstName: 'Felipe',
    orders: [],
    register() {
        return 'a';
    },
};
const emailUser = {
    email: 'felipe@gmail.com',
    firstName: 'Felipe',
    login() {
        return 'a';
    },
};
const newAuthor = {
    email: 'author@gmail.com',
    firstName: 'Felipe',
    books: [],
    login() {
        return 'a';
    },
};
const grade = 1;
