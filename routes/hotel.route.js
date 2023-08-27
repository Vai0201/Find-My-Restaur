const hotelController = require('../controllers/hotel.controller');

module.exports = function (app){
    app.post('/api/restaurant/add', hotelController.addHotel);
    app.get('/api/restaurant/', hotelController.allHotels);
    app.get('/api/restaurant/categories', hotelController.getAllCategories);
    app.get('/api/restaurant/categories/:categoryName', hotelController.getHotelsByCategory);
    app.get('/api/restaurant/:id', hotelController.getHotelsById);
    app.get('/api/restaurant/rating/:ratingValue', hotelController.getHotelsByRating);
    app.put('/api/restaurant/:id', hotelController.updateHotel);
    app.delete('/api/restaurant/:id', hotelController.deleteHotel);
    app.delete('/api/restaurant/', hotelController.deleteAllHotel);

}