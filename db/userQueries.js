const { User } = require("./index.js");
const { iptv } = require("../config.js");
const axios = require("axios");

const getCoordinates = ({ street_address, city, state, zip }) => {
  let latitudeStr = "";
  let longitudeStr = "";
  const pieces = street_address.split(" ");
  const specialJoin = pieces.join("%");
  return axios
    .get(
      `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${specialJoin}%${city}%${state}%${zip}&apiKey=${iptv}`
    )
    .then(({ data }) => {
      const latitudeInt = data.locations[0].referencePosition.latitude;
      latitudeStr = latitudeInt.toString();
      const longitudeInt = data.locations[0].referencePosition.longitude;
      longitudeStr = longitudeInt.toString();

      return { latitudeStr, longitudeStr };
    })
    .catch((err) => console.error("There was an error updating the user."));
};

const addUser = ({
  name,
  street_address,
  city,
  state,
  zip,
  email,
  password,
}) => {
  return getCoordinates({ street_address, city, state, zip })
    .then(({ latitudeStr, longitudeStr }) => {
      return User.create({
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        lat: latitudeStr,
        lng: longitudeStr,
        email: email,
        password: password,
        savedDogs: [],
        savedBreeds: []
      });
    })
    .catch((err) => {
      console.info("There was an error adding a user.");
    });
};

const getUser = (email) => {
  return User.findOne({ email })
    .then((user) => {
      if (user === null) {
        throw new Error('No user found with this email');
      } else {
        return user;
      }
    })
    .catch((err) => {
      console.log("Couldn't find user", err);
      return err;
    });
};

const updateUser = (
  email,
  { name, street_address, city, state, zip, password }) => {
  return getCoordinates({ street_address, city, state, zip })
    .then(({ latitudeStr, longitudeStr }) => {
      let update = {
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        lat: latitudeStr,
        lng: longitudeStr,
        password: password,
      };
      return User.findOneAndUpdate({ email: email }, update)
        .then((user) => {
          if (user === null) {
            throw new Error('No user found with this email');
          } else {
            return user;
          }
        })
        .catch((err) => {
          console.error("Error updating user", err);
          return err;
    })
    .catch((err) => {
      console.info("There was an error adding a user.");
    });
  });
};

const addSavedDog = (email, dogObj) => {
  return User.updateOne({ email: email }, {$push: {savedDogs: { $each: [dogObj], $position: 0}}})
    .then(user => {
      console.info('Dog saved');
    })
    .catch(err => {
      console.info('There was an error adding the dog.');
    })
}

const deleteSavedDog = (email, dogId) => {
  return User.updateOne({ email: email }, {'$pull': { savedDogs: { id: dogId}}})
  .then(user => {
    console.info('Dog removed');
  })
  .catch(err => {
    console.info('There was an error removing the dog.')
  })
}

const addDogBreed = (email, breedObj) => {
  return User.updateOne({ email: email },
    {$push: {savedBreeds: { $each: [breedObj], $position: 0}}})
      .then(user => {
        console.info('Breed saved');
      })
      .catch(err => {
        console.info('There was an error adding the breed.');
      })
}

const deleteDogBreed = (email, breedId) => {
  return User.updateOne({ email: email }, {'$pull': { savedBreeds: { id: breedId}}})
  .then(user => {
    console.info('Breed removed');
  })
  .catch(err => {
    console.info('There was an error removing the breed.')
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  addSavedDog,
  deleteSavedDog,
  addDogBreed,
  deleteDogBreed
}
