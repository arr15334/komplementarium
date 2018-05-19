import moment from 'moment'

export default class BabyMeasurement {
  constructor () {
    this.id = ''
    this.name = ''
    this.bornDate = ''
    this.gender = false
    this.heightMeasurements = []
    this.weightMeasurements = []

    this.updated = null
    this.created = null
  }

  initWithData (data = {}) {
    this.id = data._id || ''
    this.name = data.name || ''
    this.bornDate = data.bornDate || null
    this.gender = data.gender || false
    this.heightMeasurements = data.heightMeasurements || []
    this.weightMeasurements = data.weightMeasurements || []

    this.updated = data.updatedAt ? moment(data.updatedAt) : null
    this.created = data.createdAt ? moment(data.createdAt) : null
  }

  getAge () {
    return Math.round(-moment(this.bornDate).diff(moment(), 'months', true))
  }

  getCalories (age) {
    if (age < 6) {
      return 0
    } else if (age <= 8) {
      return 200
    } else if (age <= 11) {
      return 300
    } else if (age <= 23) {
      return 550
    } else {
      return 1000
    }
  }

  getGender () {
    if (this.gender) {
      return 'Masculino'
    } else {
      return 'Femenino'
    }
  }

  getBirthdate () {
    console.log(this.bornDate)
    moment.locale('es')
    return moment(this.bornDate).format('DD [de] MMMM')
  }
}
