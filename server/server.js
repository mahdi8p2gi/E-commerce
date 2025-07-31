
const express = require("express")
const bodyParser = require('body-parser');
const app = express()
const port = 5000



app.get('/' , (req, res)=> {
  res.send("hello")

})

app.get('/about-us', (req , res)=> {
  res.send("This is about us pages")
})


app.get('/contact-us', (req , res)=> {
  res.send("This is contact us pages")
})


app.use(bodyParser.urlencoded({ extended: true }));

// فرم ثبت‌نام
app.get('/register', (req, res) => {
  res.send(`
    <form action="/register" method="POST">
      <input name="userName" placeholder="Username" required />
      <input name="passWord" placeholder="Password" type="password" required />
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register' , (req , res)=> {

  const {userName , passWord} = req.body

  if(!userName || !passWord){
    return res.send("لطفا همه فیلد هارو پر کنید")
  }

  
  if (passWord.length < 6) {
    return res.send('پسورد باید حداقل ۶ کاراکتر باشد');
  }

  console.log(req.body)
  res.send(`ثبت‌نام شد! کاربر: ${userName}`);
})


app.post('/login' , (req , res)=> {
  const {userName , passWord} = req.body
  
})












app.listen(port , ()=> {
    console.log(`سرور روی http://localhost:${port} اجرا شد`);
})