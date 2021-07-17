const express = require("express");
const Products = require('../model/Products')

const Router = express.Router()

Router.get('/',(req,res)=>{
    res.json(Products)
})
    // get products/id
Router.get('/:id', (req,res)=>{
    const {id} = req.params;
    const getID = Products.find((eachID)=> eachID.id === Number(id))

    
    if(!getID){
        res.status(404).send("can not get your id")
    }
    return res.json(getID)
   
})

    //post

    Router.post('/',(req,res)=>{
        let incomingProducts = req.body
        let Newproduct = {
            id:Products.length + 1,
            name: incomingProducts.name,
            description: incomingProducts.description,
            image: incomingProducts.image,
            price: incomingProducts.price
        }
        Products.push(Newproduct);
        res.json(Products);

    })


// Put(Updating the file)
    Router.put('/:id', (req,res)=>{

        const { id } = req.params
        const body = req.body

        const updateproducts = Products.find((seth)=>seth.id === Number(id))
        const index = Products.indexOf(updateproducts)
        
        if(!updateproducts){
            res.status(404).send('cannot get products')
        }
         const recentproducts = {...updateproducts, ...body}
             
         Products[index] = recentproducts
         res.status(200).send(recentproducts)
    })
    //Deleting a product
    Router.delete('/:id',(req,res)=>{
        const {id} = req.params
        
        const Delproduct = Products.filter((prod)=> prod.id != Number(id))

        if(!newproduct){
            res.status(404).send("product not found")
        }
        Products = Delproduct
        res.send(Products)
    })
module.exports = Router