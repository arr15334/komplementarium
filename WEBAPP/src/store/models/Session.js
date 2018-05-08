export default class Session {
  constructor () {
    this.userId = ''
    this.userName = ''
    this.roles = []
  }

  initWithData (data = {}) {
    this.userId = data.id || ''

    const attributes = data.attributes || {}
    const firstName = attributes['first_name'] || ''
    const lastName = attributes['last_name'] || ''
    this.userName = (firstName + ' ' + lastName).trim()

    const relationships = data.relationships || {}

    const roles = relationships.roles || {}
    const rolesData = roles.data || []
    for (const rol of rolesData) {
      const rolAttributes = rol.attributes || {}
      const machineName = rolAttributes['machine_name'] || ''

      if (machineName.length > 0) {
        this.roles.push(machineName)
      }
    }
  }

  getMaxRol () {
    let maxRol = ''

    for (const rol of this.roles) {
      if (maxRol.length <= 0) {
        maxRol = rol
        continue
      }

      if (rol === 'admin') return rol

      if (rol === 'doctor') maxRol = rol

      if (rol === 'assistant' && maxRol !== 'doctor') maxRol = rol
    }

    return maxRol
  }
}
