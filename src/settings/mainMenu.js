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
      }
    ]
  }
]

export default mainMenu
