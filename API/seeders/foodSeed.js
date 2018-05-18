var mongoose  = require("mongoose"),
    Food      = require("../models/food");

    var foodData = [
      {
        category: "lácteo",
        name: "Leche materna",
        texture: "líquido",
        image: "https://images.pexels.com/photos/374756/pexels-photo-374756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 0,
        calories: 70,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "cereal",
        name: "Arroz",
        texture: "suave",
        image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        month: 6,
        calories: 129,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "cereal",
        name: "Maíz",
        texture: "suave",
        image: "https://images.pexels.com/photos/209389/pexels-photo-209389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 159,
        servingSize: 54,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "fruta",
        name: "Manzana",
        texture: "suave",
        image: "https://images.pexels.com/photos/588587/pexels-photo-588587.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 52,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "fruta",
        name: "Plátano",
        texture: "suave",
        image: "https://images.pexels.com/photos/39566/banana-tropical-fruit-yellow-healthy-39566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 89,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "fruta",
        name: "Naranja (dulce)",
        texture: "suave",
        image: "https://images.pexels.com/photos/52533/orange-fruit-vitamins-healthy-eating-52533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 47,
        servingSize: 100,
        servingMeasure: "g",
        allergy: true
      },
      {
        category: "fruta",
        name: "Pera",
        texture: "suave",
        image: "https://images.pexels.com/photos/74051/night-74051.jpeg?cs=srgb&dl=food-fruit-pear-74051.jpg&fm=jpg",
        month: 6,
        calories: 57,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "cereal",
        name: "Avena",
        texture: "suave",
        image: "https://images.pexels.com/photos/1080105/pexels-photo-1080105.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 8,
        calories: 97,
        servingSize: 25,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "cereal",
        name: "Pan",
        texture: "normal",
        image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 10,
        calories: 265,
        servingSize: 100,
        servingMeasure: "g",
        allergy: true
      },
      {
        category: "leguminosas",
        name: "Frijol",
        texture: "normal",
        image: "http://cdn2.cocinadelirante.com/sites/default/files/images/2017/07/frijolesenpeligro.jpg",
        month: 8,
        calories: 382,
        servingSize: 1,
        servingMeasure: "taza",
        allergy: false
      },
      {
        category: "verdura",
        name: "Papa",
        texture: "suave",
        image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 77,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "verdura",
        name: "Zanahoria",
        texture: "suave",
        image: "https://images.pexels.com/photos/37641/carrots-basket-vegetables-market-37641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 41,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "verdura",
        name: "Calabaza",
        texture: "suave",
        image: "https://images.pexels.com/photos/265258/pexels-photo-265258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 6,
        calories: 50,
        servingSize: 120,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "carne",
        name: "Carne de res",
        texture: "majado",
        image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 9,
        calories: 143,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "carne",
        name: "Pollo",
        texture: "majado",
        image: "https://images.pexels.com/photos/8758/food-dinner-lemon-rice.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 9,
        calories: 239,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "carne",
        name: "Cordero",
        texture: "majado",
        image: "https://biotrendies.com/wp-content/uploads/2016/09/carne-cordero.jpg",
        month: 12,
        calories: 239,
        servingSize: 100,
        servingMeasure: "g",
        allergy: true
      },
      {
        category: "carne",
        name: "Carne de ternera",
        texture: "majado",
        image: "https://dastatu.es/blog/wp-content/uploads/2016/06/carne-de-res.jpg",
        month: 9,
        calories: 172,
        servingSize: 100,
        servingMeasure: "g",
        allergy: false
      },
      {
        category: "carne",
        name: "Pescado blanco",
        texture: "normal",
        image: "https://www.buenasalud.net/wp-content/uploads/imagenes/PESCADOBLANCOALAMENTA400x300.jpg",
        month: 12,
        calories: 206,
        servingSize: 100,
        servingMeasure: "g",
        allergy: true
      },
      {
        category: "proteína",
        name: "Huevo",
        texture: "normal",
        image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 12,
        calories: 88,
        servingSize: 1,
        servingMeasure: "unidad",
        allergy: true
      },
      {
        category: "lácteo",
        name: "Leche vaca",
        texture: "líquido",
        image: "https://images.pexels.com/photos/533307/pexels-photo-533307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 12,
        calories: 88,
        servingSize: 1,
        servingMeasure: "vaso",
        allergy: true
      },
      {
        category: "lácteo",
        name: "Yogurt",
        texture: "líquido",
        image: "https://images.pexels.com/photos/40725/muesli-breakfast-food-cornflakes-40725.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        month: 12,
        calories: 59,
        servingSize: 100,
        servingMeasure: "g",
        allergy: true
      }
    ]

function seedDB () {
  Food.remove({})
    .then(() => {
      for (const food of foodData) {
        Food.create(food)
      }
      return
    })
    .then(() => {
      console.log("DB seeded")
    })
    .catch(err => {
      throw err
    })
}

module.exports = seedDB
