const db  = require("../connect");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  const secretKey = "secretkey"


module.exports.register = (req,res) =>{

    const { username, password,name } = req.body;
 
    const selectQuery = 'SELECT * FROM auth WHERE username = ?';

    db.query(selectQuery, [username], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (rows.length > 0) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        const insertQuery =
          'INSERT INTO auth (username, password, name) VALUES (?, ?, ?)';

        db.query(
          insertQuery,
          [username, hashedPassword, name],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'User created successfully' });
          }
        );
      });
    });
}

module.exports.login = (req,res,next) =>{

    const { username, password } = req.body;
  let user1;

  const selectQuery = 'SELECT * FROM auth WHERE username = ?';

  db.query(selectQuery, [username], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    user1 = user;

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { userId: user1.id, username: user1.username },
        secretKey, // Replace with your own secret key
        { expiresIn: '1h' }
      );

      localStorage.setItem('token', token);


      next();

    });
  });



}

module.exports.checkAuth = (req,res,next) =>{

    const token = localStorage.getItem('token');

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    req.userData = { userId: decodedToken.userId, username: decodedToken.username };

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

module.exports.display_contacts = (req,res) =>{
    const selectQuery = 'SELECT * FROM contacts WHERE contact_of = ?';

    db.query(selectQuery, [req.params.id], (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }
    
        if (rows.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const user = rows[0];
        user1 = user;
    
        res.status(200).json({message:rows})
    
      });


}

module.exports.addContact = (req,res) =>{
   
    const { contact_id,contact_name,contact_of,phone ,email } = req.body;

    const insertQuery =
    'INSERT INTO contacts (contact_id,contact_name,contact_of,phone,email) VALUES (?, ?,?,?,?)';

    db.query(
      insertQuery,
      [contact_id,contact_name,contact_of,phone,email],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(201).json({ message: 'Contact added successfully' });
      }
    );}

module.exports.deleteContact = (req,res) =>{
    const { contact_id } = req.body;

    const deleteQuery = 'DELETE FROM contacts WHERE contact_id = ?';

    db.query(deleteQuery, [contact_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({ message: 'Contact deleted successfully' });
    });
} 

module.exports.updateContact = (req,res) =>{
    const { contact_id,contact_name,contact_of,phone ,email } = req.body;

    const updateQuery =
    'UPDATE contacts SET contact_name = ?,contact_of = ?,phone = ?,email = ? WHERE contact_id = ?';

    db.query(
      updateQuery,
      [contact_name,contact_of,phone,email,contact_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(201).json({ message: 'Contact updated successfully' });
      }
    );
}



module.exports.logout = (req,res) =>{


    localStorage.removeItem('token');

    console.log("logged out")

    res.redirect(200,'/auth/login')

}



