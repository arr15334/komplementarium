var mongoose  = require("mongoose"),
    Food      = require("../models/food");

var foodData = [
  {
    category: "lácteo",
    name: "Leche materna",
    texture: "líquido",
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
