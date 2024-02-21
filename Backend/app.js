const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
MONGODB_URL="mongodb+srv://ruturajd9696:ruturajd9696@mern-estate.muwdbox.mongodb.net/mern-estate?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URL)

.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to my Express server with mongodb and cors !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", UserSchema);



const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



app.get('/allusers', getAllUsers);


const postOneUser = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;
    const user = new User({ username, email, password, avatar });
    const newUser = await user.save();
    res.status(201).json({ message: 'New user created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.post('/postoneuser', postOneUser);



const deleteOneUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.delete('/deleteoneuser/:id', deleteOneUser);

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email, password, avatar } = req.body;
    
    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Update user fields
    existingUser.username = username;
    existingUser.email = email;
    existingUser.password = password;
    existingUser.avatar = avatar;

    // Save updated user
    const updatedUser = await existingUser.save();
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.put('/updateuser/:id', updateUser);
