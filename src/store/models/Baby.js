import moment from 'moment'

export default class BabyMeasurement {
  constructor () {
    this.id = ''
    this.name = ''
    this.bornDate = ''
    this.gender = ''
    this.heightMeasurements = []
    this.weightMeasurements = []

    this.updated = null
    this.created = null
  }

  initWithData (data = {}) {
    this.id = data._id || ''
    this.name = data.name || ''
    this.bornDate = data.bornDate || null
    this.gender = data.gender || ''
    this.heightMeasurements = data.heightMeasurements || []
    this.weightMeasurements = data.weightMeasurements || []

    this.updated = data.updatedAt ? moment(data.updatedAt) : null
    this.created = data.createdAt ? moment(data.createdAt) : null
  }
}
