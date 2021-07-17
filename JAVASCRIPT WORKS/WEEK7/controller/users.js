const express = require("express")

const Users = require("../model/user")
const Router = express.Router()

// A function to generate users Ids
function generateID() {
    let count = 0
    return () => {
        count++
        return count
    }
    
}
const getID = generateID()

// Getting users

Router.get('/', (req,res)=>{
    res.json(Users)

})

// SIGN UP Router
Router.post('/signup', (req,res)=>{
    const body = req.body
    const fullName = body.fullName
    const password = body.password
    const confirmPassword = body.confirmPassword
    const email = body.email
    const findUser = Users.find((user)=>{
        return user.email=== email
    })
        if(findUser){
            res.status(404).send("Email already exist")

        } 
    else {
        if(password===confirmPassword){
            
            const user = {
                id:getID(),
                fullName: fullName,
                email: email,
                password:password
            }
            Users.push(user)
            res.json(user)
        }
        else{
        res.status(200).send("Password and confirm are different")
        }
    }
}) 

// SignIN Router

Router.post('/signin',(req,res)=>{
    const body = req.body
    const email = body.email
    const password = body.password
  const signUser = Users.find((user)=>{
      return (user.email===email)&& (user.password===password)
  })
  if(signUser){
      res.json(signUser)
  }
  else{
      res.send('Oops!! Invalid Credentails')
  }
})
        
    module.exports = Router


    