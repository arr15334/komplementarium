<template lang="html">
  <div class="container">
    <div id="landing-header">
 		<h1>Komplementarium</h1>
      <router-link class="button is-primary is-medium"
                         :to="{name: 'Signin'}">
              <span>Empezar</span>
      </router-link>
    </div>
    <div class="box slider">
      <div class="show-container">
        <div class="text">
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
          title: 'Prevenir alergias',
          content: 'They say everything looks better with odd numbers of things. But sometimes I put even numbers—just to upset the critics. ' +
                    'Only think about one thing at a time. Don\'t get greedy. Remember how free clouds are. They just lay around in the sky all day long. ' +
                    'All you have to do is let your imagination go wild. And just raise cain. ' +
                    'These little son of a guns hide in your brush and you just have to push them out.'
        },
        {
          title: 'Buenos hábitos alimenticios',
          content: 'It\'s hard to see things when you\'re too close. Take a step back and look. ' +
          'This is an example of what you can do with just a few things, a little imagination and a happy dream in your heart. ' +
          'We\'ll throw some old gray clouds in here just sneaking around and having fun.' +
          'Follow the lay of the land. It\'s most important. These trees are so much fun. I get started on them and I have a hard time stopping. Tree trunks grow however makes them happy.'
        },
        {
          title: 'Crecer saludable',
          content: 'Just think about these things in your mind and drop em\' on canvas. Look around, look at what we have.' +
          'Beauty is everywhere, you only have to look to see it. La- da- da- da- dah. Just be happy.' +
          'There\'s not a thing in the world wrong with washing your brush. Everyone is going to see things differently - ' +
          'and that\'s the way it should be. Working it up and down, back and forth.'
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
.slider {
  z-index: 1;
  position: relative;
  margin-top: 3%;
  background-color: rgba(50,0,20,0.4);
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
.text {
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
  animation: imageAnimation 50s linear infinite;
}
.slideshow li:nth-child(1) {
  background-image: url("../assets/kazuend-127416-unsplash.jpg");
}
.slideshow li:nth-child(2) {
  background-image: url("../assets/anton-darius-thesollers-295119-unsplash.jpg");
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
  background-image: url("../assets/valeria-zoncoll-145929-unsplash.jpg");
  animation-delay: 40s;
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
