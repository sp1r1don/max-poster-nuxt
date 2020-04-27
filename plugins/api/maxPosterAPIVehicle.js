export default function({ $axios }, inject) {
  const apiUrl = '/'
  const apiToken = 'dGVzdHRlc3RAbWF4cG9zdGVyLnJ1OlF3ZXJ0eTQzMjE'

  const maxPosterInst = $axios.create({
    baseUrl: apiUrl,
    headers: {
      common: {
        Authorization: `Basic ${apiToken}`
      }
    }
  })

  function getVehicleCategories() {
    return maxPosterInst({
      method: 'get',
      url: '/maxposter/directories/vehicle-categories'
    })
  }

  function getVehicleBrands() {
    return maxPosterInst({
      method: 'get',
      url: '/maxposter/directories/vehicle-brands'
    })
  }

  function getVehicleModels() {
    return maxPosterInst({
      method: 'get',
      url: '/maxposter/directories/vehicle-models'
    })
  }

  const maxPosterAPIVehicle = {
    getVehicleCategories,
    getVehicleBrands,
    getVehicleModels
  }

  inject('maxPosterAPIVehicle', maxPosterAPIVehicle)
}
