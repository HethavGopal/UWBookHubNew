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
    // Get query parameters with defaults
    const { 
      page = 1, 
      limit = 50, 
      sort = 'newest',
      category = 'all',
      condition = 'all',
      status = 'active'
    } = req.query;

    // Build filter object
    const filter = {};
    
    // Only show active listings by default
    if (status !== 'all') {
      filter.status = status;
    }
    
    // Filter by category if specified
    if (category !== 'all') {
      filter.category = new RegExp(category, 'i'); // Case insensitive
    }
    
    // Filter by condition if specified
    if (condition !== 'all') {
      filter.condition = condition;
    }

    // Calculate pagination variables early (needed for both random and regular sorting)
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Handle random sorting differently using MongoDB aggregation
    if (sort === 'random') {
      // Use aggregation pipeline for random sampling
      const pipeline = [
        { $match: filter },
        { $sample: { size: limitNum } }
      ];
      
      const listings = await Listing.aggregate(pipeline);
      const total = await Listing.countDocuments(filter);
      
      return res.status(200).send({
        listings,
        pagination: {
          page: 1, // Random doesn't support pagination
          limit: limitNum,
          total,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        },
        filters: {
          sort,
          category,
          condition,
          status
        }
      });
    }

    // Build sort object for non-random sorting
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'price-low':
        sortObj = { price: 1 };
        break;
      case 'price-high':
        sortObj = { price: -1 };
        break;
      case 'title':
        sortObj = { title: 1 };
        break;
      default:
        sortObj = { createdAt: -1 }; // Default to newest first
    }

    // Execute query with filters, sorting, and pagination
    const listings = await Listing.find(filter)
      .sort(sortObj)
      .limit(limitNum)
      .skip(skip)
      .lean(); // Use lean() for better performance

    // Get total count for pagination info
    const total = await Listing.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).send({
      listings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      },
      filters: {
        sort,
        category,
        condition,
        status
      }
    });
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
    const { sort = 'newest', limit = 50 } = req.query;
    
    // Handle random sorting for user listings
    if (sort === 'random') {
      const pipeline = [
        { $match: { ownerUID } },
        { $sample: { size: parseInt(limit) } }
      ];
      
      const listings = await Listing.aggregate(pipeline);
      return res.status(200).send({listings});
    }
    
    // Build sort object for non-random sorting
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'price-low':
        sortObj = { price: 1 };
        break;
      case 'price-high':
        sortObj = { price: -1 };
        break;
      case 'title':
        sortObj = { title: 1 };
        break;
      default:
        sortObj = { createdAt: -1 }; // Default to newest first
    }
    
    const listings = await Listing.find({ownerUID}).sort(sortObj);
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


