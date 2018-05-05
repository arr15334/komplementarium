const MedicinesMixin = {
  methods: {
    hasMedicineOther: function (medicines = null) {
      if (medicines !== null && medicines.length > 0) {
        for (let i = 0; i < medicines.length; i++) {
          const medicine = medicines[i]
          const id = parseInt(medicine.id)

          if (id === 0) {
            return true
          }
        }
      }

      return false
    },

    getMedicinesData: function (medicines = null) {
      const data = {
        medicines: [],
        others: ''
      }

      if (medicines !== null && medicines.length > 0) {
        for (let i = 0; i < medicines.length; i++) {
          const medicine = medicines[i]

          if (medicine.medicineOther.length > 0) {
            if (data.others.length > 0) {
              data.others += ', '
            }
            data.others += medicine.medicineOther
          } else {
            if (medicine.medicine) {
              data.medicines.push(
                {
                  id: medicine.medicine.id,
                  label: medicine.medicine.name
                }
              )
            }
          }
        }
      }

      if (data.others.length > 0) {
        data.medicines.push(
          {
            id: 0,
            label: '- Otra -'
          }
        )
      }

      return data
    },

    setMedicinesData: function (medicines = null, others = '') {
      const data = []

      if (medicines !== null && medicines.length > 0) {
        for (let i = 0; i < medicines.length; i++) {
          const medicine = medicines[i]
          const id = parseInt(medicine.id)

          if (!isNaN(id) && id !== 0) {
            data.push(
              {
                'medicine_id': id,
                'medicine_other': ''
              }
            )
          }
        }
      }

      const hasOther = this.hasMedicineOther(medicines)
      if (hasOther && others.length > 0) {
        const list = others.split(',')
        for (let i = 0; i < list.length; i++) {
          const item = list[i].trim()
          if (item.length > 0) {
            data.push(
              {
                'medicine_id': '',
                'medicine_other': item
              }
            )
          }
        }
      }

      return data
    }
  }
}

export default MedicinesMixin
