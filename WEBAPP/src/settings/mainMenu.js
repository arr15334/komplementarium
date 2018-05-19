const mainMenu = [
  {
    type: 'group',
    name: 'General',
    places: ['left'],
    perms: ['*'],
    children: [
      {
        type: 'item',
        name: 'Dashboard',
        component: 'Dashboard',
        introJs: 'Página principal, donde puedes ver el menú del día',
        url: '',
        places: ['left']
      }
    ]
  },
  {
    type: 'group',
    name: 'Administración',
    places: ['left'],
    perms: ['*'],
    children: [
      {
        type: 'item',
        name: 'Calendario',
        component: 'Calendar',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Ajustes',
        introJs: 'Guarda y edita los datos de tus hijos/as',
        component: 'Babys',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Mediciones',
        component: 'AdminMeasurements',
        introJs: 'Lleva las mediciones de tus hijos/as',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Menú de hoy',
        introJs: 'Decide qué alimentos darles, según el mes de edad',
        component: 'Menu',
        places: ['left']
      }
    ]
  },
  {
    type: 'group',
    name: 'Información extra',
    places: ['left'],
    perms: ['*'],
    children: [
      {
        type: 'item',
        name: 'Consejos',
        introJs: 'Conoce más sobre cómo puedes alimentarlos mejor',
        component: 'Advices',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Alergias',
        introJs: 'Lee información importante para prevenir alergias',
        component: 'BabyNew',
        url: '',
        places: ['left']
      }
    ]
  }
]

export default mainMenu
