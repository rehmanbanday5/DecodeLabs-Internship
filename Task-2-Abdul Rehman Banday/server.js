const express = require("express");
const app = express();

app.use(express.json());


let users = [];


app.get("/users", (req, res) => {
  res.status(200).json({
    totalUsers: users.length,
    users: users,
  });
});


app.post("/users", (req, res) => {
  const { name, email } = req.body;

  
  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email Is Required",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User Has Been Created",
    user: newUser,
  });
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const userExists = users.find((u) => u.id === id);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users = users.filter((u) => u.id !== id);

  res.status(200).json({
    message: "User Has Been Deleted",
    users,
  });
});


app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email Is Required",
    });
  }

  user.name = name;
  user.email = email;

  res.status(200).json({
    message: "User Has Been Updated",
    user,
  });
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
