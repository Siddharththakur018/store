const User = require('../model/authModel')

//Profile of buyer
const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")

        if(!user){
            res.status(404).json({ message: "User not found" })
        }

        if(user.role !== "buyer"){
            res.status(403).json({ message: "Not a buyer!" })
        }

        res.status(200).json({successs: true, profile: user})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const updateProfile = async(req,res) => {
    try {
        const {name, email} = req.body

        const user = req.user.id

        const updateUser = await User.findByIdAndUpdate(
            user,
            {name, email},
            { new: true, runValidators: true } 
        )

        if(!updateUser) {
            res.status(403).json({message: "User not found"})
        }

        res.status(201).json({successs: true, updateUser: updateUser})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

//Products

const getAllProducts = async(req, res) => {
    
}

module.exports = { getProfile , updateProfile }
