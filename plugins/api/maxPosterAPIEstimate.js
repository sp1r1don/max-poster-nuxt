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

  function getEstimateExpress(data) {
    return maxPosterInst({
      method: 'post',
      url: '/maxposter/express',
      data
    })
  }

  const maxPosterAPIEstimate = {
    getEstimateExpress
  }

  inject('maxPosterAPIEstimate', maxPosterAPIEstimate)
}
