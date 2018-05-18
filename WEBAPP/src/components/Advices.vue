<template>
        <div class="columns">
          <div class="column">
              <div class="box">
                <h1 class="title">Consejos</h1>

                <div class="box slider">
                  <progress class="progress is-primary" v-bind:value="((sliderCounter + 1) / sliderText.length) * 100" max="100">0%</progress>
                  <div>
                    <div class="text">
                      <strong style="font-size: 1.3em">{{ sliderText[sliderCounter].title }}</strong>
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
              </div>
              <div class="box">
                <h1 class="title">Mitos y realidades</h1>
                <div class="box slider">
                  <progress class="progress is-primary" v-bind:value="((sliderCounter + 1) / sliderText.length) * 100" max="100">0%</progress>
                  <div>
                    <div class="text">
                      <strong style="font-size: 1.3em">{{ sliderText[sliderCounter].title }}</strong>
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
              </div>
          </div>
      </div>

</template>

<script>
 export default {
   name: 'Advices',
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
.slider {
  z-index: 1;
  position: relative;
  margin-top: 3%;
  background-color: rgba(240,240,240,0.2);
}
/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: gray;
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
  background-color: rgba(24,24,24,0.2);
}

/* Caption text */
.text {
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
</style>
