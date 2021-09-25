const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();

//register view engines
app.set('view engine','ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// connect to mongodb
const dbURI = 'mongodb+srv://user:eren1907@cluster0.uyher.mongodb.net/db1?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path', req.path);
    console.log('method',req.method);
    next();
});

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'details about new blog2',
        body: 'bdy of my new blog, content content2'
    });
    blog.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
});

app.use('/blogs',blogRoutes);

app.get('/all-blogs',(req,res)=>{
    Blog.find().then(result=>res.send(result)).catch(err=>console.log(err));
});
//Blog.findById ile idYe göre bir blog döner

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    //res.send('<p>Home Page</p>') // automatically sets the content header, status code
    // res.sendFile('/views/about.html', { root:__dirname});
    res.render('about',{title: 'About'})
   });

//404 page  // en sonda oldupu için çalışıyor. Hiçbir eşleşme olmazsa buna gelir
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404',{title: '404'});
});