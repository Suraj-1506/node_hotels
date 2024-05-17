const express = require("express");
const router = express.Router();
const Menu = require("./../models/Menu")

router.post('/', async (req, res) => {
    try {
      const newMenuData = req.body;
      const newMenu = new Menu(newMenuData);
  
      // Save the new person to the database using await
      const savedMenu = await newMenu.save();
      console.log('Saved Menu to database');
      res.status(201).json(savedMenu);
    } catch (error) {
      console.error('Error saving Menu:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      // Use the Mongoose model to fetch all Menu from the database
      const menues = await Menu.find();
  
      // Send the list of menues as a JSON response
      res.json(menues);
    } catch (error) {
      console.error('Error fetching menues:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  router.get("/:tasteType", async (req,res)=>{
    try{
      const tasteType=req.params.tasteType;
      if(tasteType==='sweet'|| tasteType==='sour'|| tasteType==='spicy'){
        const response=await Menu.find({taste:tasteType});
        console.log('Response Fetched');
        res.status(200).json(response)
      }else{
        res.status(400).json({error:"Invalid taste type"})
      }
    }catch{
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  module.exports = router;