const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const moment=require('moment')

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"recipe_dbms"
})


app.post('/SignUp',(req,res)=>{
    const sql = "INSERT INTO User (`UserName`,`PhoneNo`,`Email`,`Password`,`FullName`) value (?)";
    const values = [
        req.body.UserName,
        req.body.PhoneNo,
        req.body.Email,
        req.body.Password,
        req.body.FullName
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/',(req,res)=>{
    const sql = "select * from user where `UserName` =? and `Password` = ?";
    db.query(sql,[req.body.UserName,req.body.Password],(err,data)=>{
        if(err){
            console.log(err);
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }
        else{
            return res.json("Failure");
        }
    })
})

app.post("/recipes", (req, res) => {
    if (req.body) {
      // Handle recipe creation logic
      const currentDate = moment().format('YYYY-MM-DD');
      const sqlRecipe = "INSERT INTO recipe (Title,Instructions, Time,Modification_Date, Image, category) VALUES (?)";
      const valuesRecipe = [
        req.body.title,
        req.body.instructions,
        req.body.time,
        currentDate, // You might want to use a library like 'moment' for a formatted date
        // req.body.userID,
        // req.body.category
        req.body.image,
        req.body.category
      ];
  
      db.query(sqlRecipe, [valuesRecipe], (err, recipeData) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        }
  
        // Handle ingredients insertion logic
        const recipeID = recipeData.insertId;
        const ingredients = req.body.ingredients;

        const sqlIngredients = "INSERT INTO ingredient (Ing_name, Recipe_ID) VALUES (?)";
        //const valuesIngredients = ingredients.map((ingredient) => [ingredient, recipeID]);
        const valuesIngredients = [ingredients, recipeID];
  
        db.query(sqlIngredients, [valuesIngredients], (err, ingredientsData) => {
          if (err) {
            console.log(err);
            return res.json("Error");
          }
  
          return res.json({ recipeID, ingredientsData });
        });
      });
    } else {
      // Handle recipe fetching logic
      const sql = "SELECT * FROM recipe WHERE Category = ?";
      db.query(sql, [req.body.category], (err, data) => {
        if (err) {
          console.log(err);
          return res.json("Error");
        }
        return res.json(data);
      });
    }
  });

  
  
  // NESTED & AGGREGATE RECIPE QUERY 
  app.get("/recipes", (req, res) => {
    const nestedSql = `
      SELECT 
        r.Recipe_ID, r.Title, r.Instructions, r.Time, r.Modification_Date, r.Image, r.category,
        (SELECT GROUP_CONCAT(i.Ing_name) FROM ingredient AS i WHERE i.Recipe_ID = r.Recipe_ID) AS Ingredient
      FROM recipe AS r
      WHERE r.category = ?
    `;
  
    db.query(nestedSql, [req.query.category], (err, data) => {
      if (err) {
        console.log(err);
        return res.json("Error");
      }
      return res.json(data);
    });
  });

// STORED PROCEDURE -------------------------------------------------------------------------
// show create procedure UpdateRecipe;

// DELIMITER //

// CREATE PROCEDURE UpdateIngredients(
//     IN p_id INT,
//     IN p_ingredients TEXT
// )
// BEGIN
//     UPDATE ingredient
//     SET Ing_name = p_ingredients
//     WHERE Recipe_ID = p_id;
// END //

// DELIMITER ;


  // DELIMITER //

  // CREATE PROCEDURE UpdateRecipe(
  //     IN p_id INT,
  //     IN p_title VARCHAR(255),
  //     IN p_instructions TEXT,
  //     IN p_time INT,
  //     IN p_image VARCHAR(255),
  //     IN p_category VARCHAR(255)
  // )
  // BEGIN
  //     UPDATE recipe
  //     SET
  //         Title = p_title,
  //         Instructions = p_instructions,
  //         Time = p_time,
  //         Modification_Date = CURRENT_DATE(),
  //         Image = p_image,
  //         category = p_category
  //     WHERE Recipe_ID = p_id;
  // END //
  
  // DELIMITER ;

//TRIGGER-------------------------------------------------------------------------------
//   -- Create a trigger to auto-generate Modification_Date on UPDATE
// DELIMITER //

// CREATE TRIGGER before_recipe_update
// BEFORE UPDATE ON recipe
// FOR EACH ROW
// BEGIN
//   -- Set the Modification_Date to the current timestamp
//   SET NEW.Modification_Date = CURRENT_TIMESTAMP();
// END;
//
//DELIMITER ;


// // // MAIN ONE
  app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const {
      title,
      instructions,
      time,
      image,
      category,
      ingredients,
    } = req.body;
    const currentDate = moment().format('YYYY-MM-DD');
  
    // Construct the SQL query for updating recipe
    const updateRecipeSql = `
      UPDATE recipe
      SET
        Title = ?,
        Instructions = ?,
        Time = ?,
        Modification_Date = ?,
        Image = ?,
        category = ?
      WHERE
        Recipe_ID = ?
    `;
  
    // Execute the query to update recipe
    db.query(
      updateRecipeSql,
      [title, instructions, time, currentDate, image, category, id],
      (err, result) => {
        if (err) {
          console.error('Error updating recipe:', err);
          return res.json({ success: false, error: 'Error updating recipe' });
        }
  
        // Check if any rows were affected
        if (result.affectedRows === 0) {
          return res.json({ success: false, error: 'Recipe not found' });
        }
  
        // Recipe updated successfully, now update ingredients
        const updateIngredientSql = `
          UPDATE ingredient
          SET Ing_name = ?
          WHERE Recipe_ID = ?
        `;
  
        // Execute the query to update ingredients
        db.query(updateIngredientSql, [ingredients, id], (err, ingredientResult) => {
          if (err) {
            console.error('Error updating ingredient:', err);
            return res.json({ success: false, error: 'Error updating ingredient' });
          }
  
          // Ingredients updated successfully
          return res.json({ success: true, message: 'Recipe and ingredients updated successfully' });
        });
      }
    );
  });


  
  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
  
    // Construct the SQL query
    const sql = 'DELETE FROM recipe WHERE Recipe_ID = ?';
  
    // Execute the query
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting recipe:', err);
        return res.json({ success: false, error: 'Error deleting recipe' });
      }
  
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res.json({ success: false, error: 'Recipe not found' });
      }
  
      // Recipe deleted successfully
      return res.json({ success: true, message: 'Recipe deleted successfully' });
    });
  });

// Backend (Corrected route and table names)
app.post('/reviews/:id', (req, res) => {
  const { rating, comments } = req.body;
  const recipeId = req.params.id;

  // Using parameterized queries to prevent SQL injection
  const sql = 'INSERT INTO review (Rating, Comment, Recipe_ID) VALUES (?, ?, ?)';
  db.query(sql, [rating, comments, recipeId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
  });
});


// CORRELATED QUERY
app.get('/reviews/:recipeId', (req, res) => {
  const { recipeId } = req.params;

  // Use a correlated subquery to fetch reviews along with the corresponding recipe details
  const correlatedSql = `
    SELECT 
      rv.ReviewID, rv.Rating, rv.Comment, rv.Recipe_ID,
      r.Title AS RecipeTitle, r.Instructions AS RecipeInstructions, r.Time AS RecipeTime, r.Modification_Date AS RecipeModificationDate, r.Image AS RecipeImage, r.category AS RecipeCategory
    FROM review AS rv
    INNER JOIN recipe AS r ON rv.Recipe_ID = r.Recipe_ID
    WHERE rv.Recipe_ID = ?
  `;

  db.query(correlatedSql, [recipeId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(results);
  });
});


// Add a delete review endpoint
app.delete('/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  const sql = 'DELETE FROM review WHERE ReviewID = ?';
  db.query(sql, [reviewId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json({ message: 'Review deleted successfully' });
  });
});


app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.listen(8800,()=>{
    console.log("listening");
})

