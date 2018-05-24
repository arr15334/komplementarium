<template lang="html">
  <div class="container">
    <div id="landing-header">
 		<h1>Komplementarium</h1>
      <router-link class="button is-primary is-medium"
                         :to="{name: 'Signin'}">
              <span>Empezar</span>
      </router-link>
    </div>
    <div class="box slider-landing">
      <div class="show-container">
        <div class="text-landing">
          <strong style="color: white; font-size: 1.3em">{{ sliderText[sliderCounter].title }}</strong>
          <br>
          {{ sliderText[sliderCounter].content }}
        </div>
        <a class="prev" v-on:click="previousSlide">&#10094;</a>
        <a class="next" v-on:click="nextSlide">&#10095;</a>
      </div>
      <br>
      <div class="dots">
        <span :class="{dot: true, active: sliderCounter == 0}" v-on:click="selectSlide(0)"></span>
        <span :class="{dot: true, active: sliderCounter == 1}" v-on:click="selectSlide(1)"></span>
        <span :class="{dot: true, active: sliderCounter == 2}" v-on:click="selectSlide(2)"></span>
      </div>

    </div>

    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
export default {
  name: 'LandingPage',
  data () {
    return {
      sliderText: [
        {
          title: 'Crecer saludable',
          content: 'El primer año de vida es de gran importancia para los bebés, ya que en este crecen y se desarrollan física y socialmente.' +
          'Estos cambios suelen afectar su alimentación y su nutrición.' +
          'Por lo que se hace necesario asegurarle una alimentación suficiente y adecuada, con el objetivo de satisfacer sus necesidades  ' +
          ', para  prevenir deficiencias nutricionales que afecten su crecimiento y desarrollo,  así como crear hábitos alimentarios saludables.'
        },
        {
          title: 'Alimentación complementaria',
          content: 'Consiste en dar al lactante a partir de los 6 meses de edad otros alimentos y líquidos diferentes a la leche materna, pero complementarios a ésta. ' +
          'Se mantiene la lactancia materna pero se inicia la introducción de otros alimentos y líquidos. Estos por sí mismos no constituyen una dieta completa, pero ' +
          'deben ser nutritivos y deben ser administrados en cantidades adecuadas para que el niño continúe su crecimiento. Este proceso dura hasta los 2 años de edad'
        },
        {
          title: 'Prevenir alergias e intolerancias',
          content: 'Durante esta etapa puede haber desconocimiento por parte de los encargados del cuidado del bebé de cómo debe ser la forma correcta ' +
          'de la introducción de alimentos y se cometen errores que pueden causar alergias, intolerancias, enfermedades y deficiencias nutricionales. ' +
          'Komplementarium le permitirá identificar los conceptos básicos que se deben tener en cuenta durante el inicio de la alimentación complementaria.    '
        }
      ],
      sliderCounter: 0
    }
  },
  components: {
    Navbar
  },
  methods: {
    nextSlide: function () {
      if (this.sliderCounter > 1) {
        return
      }
      this.sliderCounter++
    },
    previousSlide: function () {
      if (this.sliderCounter < 1) {
        return
      }
      this.sliderCounter--
    },
    selectSlide: function (s) {
      this.sliderCounter = s
    }
  }
}
</script>

<style lang="css">
#cont {
	text-align: center;
	padding-top: 25%;
	text-shadow: 	0px 4px 3px rgba(0,0,0,0.4),
					0px 8px 13px rgba(0,0,0,0.1),
					0px 18px 23px rgba(0,0,0,0.1);
}
body {
	background-size: cover;
	background-position: center;
	font-family: 'Lato', sans-serif;
	color: black;
  height: 100%;
}
h1 {
	font-weight: 700;
	font-size: 5em;
}
html{
	height: 100%;
}
hr{
	width: 400px;
	border-top: 1px solid #f8f8f8;
	border-bottom: rgba(0,0,0,0.2);
}
#landing-header {
  z-index: 1;
  position: relative;
  text-align: center;
  padding-top: 40vh;
  text-align: center;
	padding-top: 20%;
	text-shadow: 	0px 4px 3px rgba(0,0,0,0.4),
					0px 8px 13px rgba(0,0,0,0.1),
					0px 18px 23px rgba(0,0,0,0.1);
}
#landing-header h1 {
  color: #fff;
}
.slider-landing {
  z-index: 1;
  position: relative;
  margin-top: 3%;
  background-color: rgba(50,50,50,0.5);
}
/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}
/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.2);
}

/* Caption text */
.text-landing {
  color: white;
  padding: 8px 12px;
  text-align: center;
  margin-left: 3%;
  margin-right: 3%;
}
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dots {
  text-align: center;
}

.active, .dot:hover {
  background-color: #717171;
}
.slideshow {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}
.slideshow li {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  opacity: 0;
  z-index: 0;
  animation: imageAnimation 70s linear infinite;
}
.slideshow li:nth-child(1) {
  background-image: url("../assets/kazuend-127416-unsplash.jpg");
}
.slideshow li:nth-child(2) {
  background-image: url("../assets/arturo-rivera-537264-unsplash.jpg");
  animation-delay: 10s;
}
.slideshow li:nth-child(3) {
  background-image: url("../assets/hal-gatewood-569092-unsplash.jpg");
  animation-delay: 20s;
}
.slideshow li:nth-child(4) {
  background-image: url("../assets/tanaphong-toochinda-267381-unsplash.jpg");
  animation-delay: 30s;
}
.slideshow li:nth-child(5) {
  background-image: url("../assets/roderico-y-diaz-123969-unsplash.jpg");
  animation-delay: 40s;
}
.slideshow li:nth-child(6) {
  background-image: url("../assets/anton-darius-thesollers-295119-unsplash.jpg");
  animation-delay: 50s;
}
.slideshow li:nth-child(7) {
  background-image: url("../assets/valeria-zoncoll-145929-unsplash.jpg");
  animation-delay: 60s;
}
@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  10% {
    opacity: 1;
    animation-timing-function: ease-out;
  }
  20% {
    opacity: 1
  }
  30% {
    opacity: 0
  }
}

/* Older browser support - .no-cssanimations class added by modernizr */
.no-cssanimations .slideshow li {
	opacity: 1;
}
</style>
