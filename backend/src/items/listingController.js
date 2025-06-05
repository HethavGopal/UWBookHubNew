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
    });

    await newListing.save();
    res.status(201).send({message: 'Listing created successfully', listing: newListing});

  } catch (error) {
    console.log('Error in creating listing', error);
    res.status(500).send({message: 'Internal server error'});
  }
};

const getAllListings = async (req, res) => {

  try {
    const listings = await Listing.find().sort({createdAt: -1});
    res.status(200).send({listings});
  } catch (error) {
    console.log('Error in fetching listings', error);
    res.status(500).send({message: 'Internal server error'});
  }

};


const getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.status(200).send({listing});
  } catch (error) {
    console.log('Error in fetching listing', error);
    res.status(500).send({message: 'Internal server error'});
  }
};


const getUserListings = async (req, res) => {
  try {
    const ownerUID = req.user.uid;
    const listings = await Listing.find({ownerUID});
    res.status(200).send({listings});
  } catch (error) {
    console.log('Error in fetching user listings', error);
    res.status(500).send({message: 'Internal server error'});
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerUID = req.user.uid;
        
    // Find the listing and check if the user owns it
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send({message: 'Listing not found'});
    }
        
    if (listing.ownerUID !== ownerUID) {
      return res.status(403).send({message: 'Not authorized to delete this listing'});
    }
        
    await Listing.findByIdAndDelete(id);
    res.status(200).send({message: 'Listing deleted successfully'});
  } catch (error) {
    console.log('Error in deleting listing', error);
    res.status(500).send({message: 'Internal server error'});
  }
};

const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerUID = req.user.uid;
    const updateData = req.body;
        
    // Find the listing and check if the user owns it
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send({message: 'Listing not found'});
    }
        
    if (listing.ownerUID !== ownerUID) {
      return res.status(403).send({message: 'Not authorized to update this listing'});
    }
        
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send({message: 'Listing updated successfully', listing: updatedListing});
  } catch (error) {
    console.log('Error in updating listing', error);
    res.status(500).send({message: 'Internal server error'});
  }
};

module.exports = {
  createListing,
  getAllListings,
  getSingleListing,
  getUserListings,
  deleteListing,
  updateListing
};


