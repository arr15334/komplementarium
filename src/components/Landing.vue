<template lang="html">
  <div class="container">
    <div id="landing-header">
 		<h1>Komplementarium</h1>
      <router-link class="button is-primary"
                         :to="{name: 'Signin'}">
              <span>Empezar</span>
      </router-link>
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
  components: {
    Navbar
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
	padding-top: 25%;
	text-shadow: 	0px 4px 3px rgba(0,0,0,0.4),
					0px 8px 13px rgba(0,0,0,0.1),
					0px 18px 23px rgba(0,0,0,0.1);
}
#landing-header h1 {
  color: #fff;
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
