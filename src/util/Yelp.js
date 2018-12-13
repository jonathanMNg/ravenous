
const apiKey = 'FYj6gnxsGrv5cs0F-IsU_gE1x_aROAu91t-j5tCn8bgju6Spg1OqaLdhWa2jBtbr0kKdfbV-9TbQaKH4OyVGXShyquda9zdQoY3X-qxgw4vDrC0fa2nwTZea59cSXHYx';

const Yelp = {
  something() {

  },
  search(term, location, sortBy) {
    console.log(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`);
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
        .then( response => {
          const responseCopy = response.clone();
          return responseCopy.json();
        }).then( jsonResponse => {
          if(jsonResponse.businesses) {
            return jsonResponse.businesses.map( business => {
              return {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories.title,
                rating: business.rating,
                reviewCount: business.review_count

              }
            });
          }
          else {
            return {message: "Error, no results are found"};
          }
        });
  }
}

export default Yelp;