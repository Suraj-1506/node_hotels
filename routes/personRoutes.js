const express = require("express");
const router = express.Router();
const Person = require('./../models/person')
router.post('/', async (req, res) => {
    try {
      const newPersonData = req.body;
      const newPerson = new Person(newPersonData);
  
      // Save the new person to the database using await
      const savedPerson = await newPerson.save();
      console.log('Saved person to database');
      res.status(201).json(savedPerson);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      // Use the Mongoose model to fetch all persons from the database
      const persons = await Person.find();
  
      // Send the list of persons as a JSON response
      res.json(persons);
    } catch (error) {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/:workType", async (req,res)=>{
    try{
      const workType=req.params.workType;
      if(workType==='manager'|| workType==='chef'|| workType==='waiter'){
        const response=await Person.find({work:workType});
        console.log('Response Fetched');
        res.status(200).json(response)
      }else{
        res.status(400).json({error:"Invalid work type"})
      }
    }catch{
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
      const updatedPersonData = req.body; // Updated data for the person
  
      // Assuming you have a Person model
      const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      });
  
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send the updated person data as a JSON response
      res.json(updatedPerson);
    } catch (error) {
      console.error('Error updating person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
  
      // Assuming you have a Person model
      const deletedPerson = await Person.findByIdAndDelete(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send a success message as a JSON response
      res.json({ message: 'Person deleted successfully' });
    } catch (error) {
      console.error('Error deleting person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;