const mongoose = require('mongoose');
const cities = require('country-state-city').City.getCitiesOfCountry("IN");
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "yelp",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
      const randomInt = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64a5843a07af8684f5bf971f',
            location: `${cities[randomInt].name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[randomInt].longitude,
                  cities[randomInt].latitude,
              ]
            },
            images:[
              {
                url: 'https://res.cloudinary.com/dvf0aeakr/image/upload/v1688567756/YELPCAMP/xqqxntf3npdrs7cy5tcx.jpg',
                filename: 'YELPCAMP/xqqxntf3npdrs7cy5tcx',
                
              },
              {
                url: 'https://res.cloudinary.com/dvf0aeakr/image/upload/v1688567762/YELPCAMP/k4wwlqsylmog1zsyigam.jpg',
                filename: 'YELPCAMP/k4wwlqsylmog1zsyigam',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})