import express  from "express";
import path from 'path';

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

import commentRoutes from "./routes/comment.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { db } from "./connect.js";

//const express = require('express')
//const path = require('path')
const app = express()


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
})
);
app.get("/", (req, res) => {
    res.json("hello this is backend")
  })

app.get("/new_table", (req,res) => {
    const q = "SELECT * FROM new_table"
    db.query(q,(err,data) => {
      if(err) return res.json(err)
      return res.send(data)
    })
  })

  app.post("/new_table", (req, res) => {
    const q = "INSERT INTO new_table (  `title`,`desc`, `cover`) VALUES (?)"
    const values = [
      
  
        req.body.title,
        req.body.desc,
        req.body.cover
    
    ]
   
     db.query(q,[values], (err, data) => {
      if(err) return res.json(err)
      return res.json("Book has been created!")
     })
  
  })
  
  app.delete("/new_table/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM new_table WHERE id =?"
  
    db.query(q,[bookId], (err, data) => {
      if(err) return res.json(err)
      return res.json("Book has been deleted!")
     })
  
  })
  
  app.put("/new_table/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "UPDATE new_table SET `title` = ?, `desc` = ?, `cover` = ? WHERE id =?"
  
    const values = [
      
  
      req.body.title,
      req.body.desc,
      req.body.cover
  
  ]
  
    db.query(q,[...values, bookId], (err, data) => {
      if(err) return res.json(err)
      return res.json("Book has been updated!")
     })
  
  })



app.use(cookieParser())

app.use("/api/auth" , authRoutes)
app.use("/api/users" ,userRoutes)

app.use("/api/comment" ,commentRoutes)
app.use("/api/likes" ,likeRoutes)

app.get


app.listen(8800, () => {
    console.log("API working!")
});
