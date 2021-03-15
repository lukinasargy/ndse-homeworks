`npm i` чтобы установить проект <br/>
`npm start` чтобы запустить проект <br/>
`npm run dev` чтобы запустить проект с nodemon <br/>

<a href="https://lukinasargy-ejs.herokuapp.com/"><b>heroku app</b></a>

<h3>Задание 2</h3>

<h4>Задание 2.1</h4>

```db.books.insertMany(
   {
    title: "Book 1",
    description: "Description 1",
    authors: "Authors 1"
    },
    {
    title: "Book 2",
    description: "Description 2",
    authors: "Authors 2"
    },
    {
    title: "Book 3",
    description: "Description 3",
    authors: "Authors 3"
    },
)```

<h4>Задание 2.2</h4>

`db.books.find({ title: "Book 1"}).limit(1)`

<h4>Задание 2.3</h4>

```db.books.updateOne(
    {_id: "123456"},
    {
        $set: { description:"Description updated", authors:"Authors updated"}
    }
)```
