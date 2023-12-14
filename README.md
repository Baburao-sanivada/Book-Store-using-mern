# Book-Store-using-mern

Building a basic Book Store Application using Mern Stack

#install cors library and use any method of allowing cors from the two available options

steps :
1.create backend and frontend
2.Install mongoose and express libraries and nodemon for auto refresing
3.listen to port -> const app = express and app.listen()
4.Establish connection to database -> mongoose.connect(URL) -> async method
5.handle routes for different events like add books,update,delete books
6.create seperate router for handling requests related to books model in seperate file
7.from main file(index.js) app.use('/books',router) -> handling all book routes as middleware
8.Add cors library and use any method of allowing cors from the two available options
method 1 : app.use(cors()) -> allowing all domains
method 2 : app.use(cors({origin:"",methods:[],allowheaders:""}))

9.getting started with frontend - "npm create vite@latest" => better than create react app -> select react,js
