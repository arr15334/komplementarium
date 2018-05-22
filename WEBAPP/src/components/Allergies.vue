<template>
  <div class="columns">
    <div class="column">
        <div class="box">
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-8">
              <div class="tile">
                <div class="tile is-parent is-vertical">
                  <article class="tile is-child notification is-primary">
                    <p class="title">Vertical...</p>
                    <p class="subtitle">Top tile</p>
                  </article>
                  <article class="tile is-child notification is-warning">
                    <p class="title">...tiles</p>
                    <p class="subtitle">Bottom tile</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child notification is-info">
                    <p class="title">Middle tile</p>
                    <p class="subtitle">With an image</p>
                    <figure class="image is-4by3">
                      <img src="../assets/groceries.png">
                    </figure>
                  </article>
                </div>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child notification is-danger">
                  <p class="title">Wide tile</p>
                  <p class="subtitle">Aligned with the right tile</p>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <div class="content">
                  <p class="title">Tall tile</p>
                  <p class="subtitle">With even more content</p>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
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
           title: 'Prevenir enfermedades',
           content: 'Preferir el uso de tazas o beberitos para dar los líquidos'
         },
         {
           title: 'Prevenir enfermedades',
           content: 'Que los utensilios como vasos, cucharas y platos sean de uso exclusivo del lactante'
         },
         {
           title: 'Prevenir enfermedades',
           content: 'Lavar exhaustivamente los utensilios de alimentación del lactante'
         },
         {
           title: 'Prevenir enfermedades',
           content: 'Lavar las manos del lactante antes de ofrecerle los alimentos'
         },
         {
           title: 'Prevenir enfermedades',
           content: 'Almacenar los alimentos del lactante en refrigeración. Si no se pueden refrigerar deben ser consumidos ' +
           'en menos de 2 horas después de su preparación para evitar el crecimiento bacteriano.'
         },
         {
           title: 'Prevenir enfermedades',
           content: 'Mantener limpia el área de preparación de los alimentos del lactante; y separar los alimentos cocidos de los crudos.'
         },
         {
           title: '¡Mi bebé está enfermo!',
           content: 'Durante la enfermendad se debe aumentar la ingesta de los líquidos incluyendo leche materna, y luego aumentar el consumo de alimentos. Es normal ' +
           'que el apetito disminuya, pero esto aumenta la importancia del consumo de leche materna.'
         }
       ],
       sliderCounter: 0,
       mythsText: [
         {
           myth: '"El caldo o sopa alimenta más"',
           reality: 'El valor nutricional de los caldos y sopas es muy pobre, por lo que no se deben dar a los niños y niñas. En vez de esto ' +
           'es mejor dar las verduras y carnes.'
         },
         {
           myth: '"Se deben licuar las papillas, ya que el bebé se puede ahogar"',
           reality: 'Esto no es cierto. La comida del bebé nunca debe ser licuada sino triturada con un tenedor. Es importante que la comida ' +
           'no tenga la textura de un licuado, pues esto provocaría que el lactante se acostumbre y sea más difícil luego recibir alimentos sólidos.'
         },
         {
           myth: '"Se puede agregar sal, azúcar o miel para que tenga sabor"',
           reality: 'Esto es un error muy frecuente. Ninguno de estos ingredientes es saludable para el bebé. El azúcar sólo intesificará ' +
           'en el niño la preferencia por lo dulce. La miel de abeja puede estar contaminada con una bacteria que provoca una enfermedad llamada botulismo. ' +
           'Y la sal tampoco es recomendada, ya que puede afectar el sistema cardio vascular del lactante.'
         },
         {
           myth: '"A partir de los 6 meses la leche materna ya no es necesaria"',
           reality: 'A partir de los 6 meses inicia la alimentación complementaria, es decir un complemento de la leche materna, por lo que esta ' +
           'no se debe suspender. Sus nutrientes a esa edad son fundamentales para el desarrollo y crecimiento del lactante.'
         }
       ],
       mythsSliderCounter: 0
     }
   },
   methods: {
     nextSlide: function () {
       if (this.sliderCounter > this.sliderText.length - 1) {
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
     },
     nextMyth: function () {
       if (this.mythsSliderCounter > this.mythsText.length - 1) {
         return
       }
       this.mythsSliderCounter++
     },
     previousMyth: function () {
       if (this.mythsSliderCounter < 1) {
         return
       }
       this.mythsSliderCounter--
     },
     selectMyth: function (s) {
       this.mythsSliderCounter = s
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
  color: black;
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
