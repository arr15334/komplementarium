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
        component: 'BabyNew',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Mediciones',
        component: 'AdminMeasurements',
        introJs: 'Mide tus evaluaciones médicas.',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Menú de hoy',
        component: 'AdminMeasurements',
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
        component: 'BabyNew',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Alergias',
        component: 'BabyNew',
        url: '',
        places: ['left']
      },
      {
        type: 'item',
        name: 'Mitos y realidades',
        component: 'BabyNew',
        url: '',
        places: ['left']
      }
    ]
  }
]

export default mainMenu
