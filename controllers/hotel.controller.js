const Hotel = require('../models/hotel.model');

/* add hotels api starts here */

exports.addHotel = async (req,res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Content cannot be empty' });
      }

    const hotelObj = {
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        imageURL : req.body.imageURL,
        location : req.body.location,
        phone : req.body.phone,
        rating : req.body.rating
    };    
    try {
        const hotel = await Hotel.create(hotelObj);
        res.status(200).send(hotel);
    } catch(err) {
        console.error(' Error creating hotel', err.message);
        res.status(500).send({
            message : "Some error occurred while creating the Restaurant."
        })
       
    }
};

/* add hotels api ends here */

/* Fetch all data from database code starts here */

exports.allHotels = async (req, res) => {
    try {
        let hotelQuery = {}
        const hotels = await Hotel.find(hotelQuery);
        if (hotels.length === 0) {
            res.status(200).send({
                restaurants: [],
                message: "Restaurants Fetched Successfully."
            });
        } else {
            res.status(200).send({
                restaurants : hotels,
                message: "Restaurants fetched successfully."
            });
        }
    } catch(err) {
        console.log(`error fetching all hotels ${err}`);
        res.status(500).send({
            message : "Some error occured while fetching the Restaurants."
        })
    }
};

/** Fetch all data from database code end here */

/* Fetch data by category code starts here */

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Hotel.distinct('category');
        res.status(200).send(categories);
    } catch (err) {
        console.log(`Error fetching categories: ${err}`);
        res.status(500).send({
            message: 'Some error occurred while fetching the categories.',
        });
    }
};
/* Fetch data by category code ends here */


/* fetch data by query param category/takeout code start here */

exports.getHotelsByCategory = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const hotels = await Hotel.find({category : categoryName});
        if (hotels.length === 0) {
           return res.status(200).send(`hotel with categoryName ${category} is not found`);
        } else {
            res.status(200).send(
                hotels,
                //message: "Restaurants fetched successfully."
        );
        }
    } catch (err) {
        console.log(`error fetching all hotels ${err}`);
        res.status(500).send({
            message: "Some error occured while fetching the Restaurants."
        })
    }
};

/* fetch data by query param category/takeout code ends here */


/* fetch hotels by ID code starts here */
exports.getHotelsById = async (req, res) => {
    const { id } = req.params;

    try {
        const hotels = await Hotel.find({_id : id});
        if (hotels.length === 0) {
           return res.status(404).send({message : `No Restaurants found with the give ID`});
        } else {
            res.status(200).send(
                hotels,
                //message: "Restaurants fetched successfully."
        );
        }
    } catch (err) {
        console.log(`error fetching all hotels ${err}`);
        res.status(500).send({
            message: "Some error occured while fetching the Restaurants."
        })
    }
};
/* fetch hotels by ID code ends here */



/* fetch hotels by Rating Value code starts here */
exports.getHotelsByRating = async (req, res) => {
    const { ratingValue } = req.params;

    try {
        const hotels = await Hotel.find({rating : ratingValue});
        if (hotels.length === 0) {
           return res.status(200).send();
        } else {
            res.status(200).send(
                hotels,
                //message: "Restaurants fetched successfully."
        );
        }
    } catch (err) {
        console.log(`error fetching all hotels ${err}`);
        res.status(500).send({
            message: "Some error occured while fetching the Restaurants."
        })
    }
};

/* fetch hotels by Rating Value code ends here */

/* update by ID code starts here */
exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, description, location, category, imageURL, phone, rating } = req.body;

    if (!name || !description || !location || !category || !imageURL || !phone || !rating) {
        return res.status(400).send({ message: "Restaurant Data is Required." });
    }
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updateHotel) {
            return res.status(404).send({ message: "No Restaurant found for given ID." });
        }
        res.status(200).send({
            //updateHotel,
            message: "Restaurant updated successfully",
        });
    } catch (err) {
        console.log(`error updating Hotel ${err}`);
        res.status(500).send({ message: "Some error occured while updating the Restaurant." });
    }
};

/** update by ID code ends here */

/* Delete Hotel By ID Code Starts Here */

exports.deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            
            return res.status(200).send({ 
                restaurant: deletedHotel, 
                message: "Restaurant Deleted Successfully." });
        }
        res.status(200).send({
            restaurant: deletedHotel,
            message: "Restaurant deleted successfully",
        });
    } catch (err) {
        console.log(`error deleting Hotel ${err}`);
        res.status(500).send({ message: "Some error occurred while deleting the Restaurant." });
    }
};
/* Delete Hotel By ID Code Ends Here */


/* Delete All Hotels Code Starts Here */

exports.deleteAllHotel = async (req, res) => {
    try {
      const deleteResult = await Hotel.deleteMany();
      const { deletedCount } = deleteResult;
  
      res.status(200).json({
        restaurants: { acknowledged: true, deletedCount },
        message: "Restaurants deleted successfully.",
      });
    } catch (error) {
      console.log(`Error deleting restaurants: ${error}`);
      res.status(500).json({
        message: "Some error occurred while deleting the Restaurant.",
      });
    }
  };