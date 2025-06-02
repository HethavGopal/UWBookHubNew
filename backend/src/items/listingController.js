const Listing = require('./listing.model');


const createListing = async (req, res) => {
    try {
        const { title, description, images, category, price, email, phone, location, status, meetingPoint, condition } = req.body;
        const ownerUID = req.user.uid; // Get from authenticated user
        
        const newListing = new Listing({
            title,
            description,
            images, // array of image's URL
            category,
            price,
            email,
            phone,
            location,
            status,
            meetingPoint,
            ownerUID,
            condition
        })

        await newListing.save();
        res.status(201).send({message: "Listing created successfully", listing: newListing});

    } catch (error) {
        console.log("Error in creating listing", error);
        res.status(500).send({message: "Internal server error"});
    }
}

const getAllListings = async (req, res) => {

    try {
        const listings = await Listing.find().sort({createdAt: -1})
        res.status(200).send({listings})
    } catch (error) {
        console.log("Error in fetching listings", error);
        res.status(500).send({message: "Internal server error"});
    }

}


module.exports = {
    createListing,
    getAllListings
}


