<template lang="pug">
  div
    select(v-model="vehicleCatSelected")
      option(
        value="null"
      ) Выбрать категорию
      option(
        v-for="category in vehicleCats"
        :value="category.id"
      ) {{ category.name }}
    select(
      v-if="filteredVehicleBrands && filteredVehicleBrands.length"
      v-model="vehicleBrandSelected"
    )
      option(
        value="null"
      ) Выбрать брэнд
      option(
        v-for="brand in filteredVehicleBrands"
        :value="brand.id"
      ) {{ brand.name }}
    select(
      v-if="filteredVehicleModels && filteredVehicleModels.length && vehicleBrandSelected && vehicleCatSelected"
      v-model="vehicleModelSelected"
    )
      option(
        value="null"
      ) Выбрать модель
      option(
        v-for="model in filteredVehicleModels"
        :value="model"
      ) {{ model.name }}
    label(v-if="vehicleModelSelected") Пробег (тыс. км.):
      input(placeholder="Пробег" v-model="mileage")
    button(
      @click="getExpressEstimate"
      :disabled="!mileage"
    ) Рассчитать
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: { Logo },
  data() {
    return {
      vehicleCats: [],
      vehicleBrands: [],
      vehicleModels: [],
      vehicleCatSelected: null,
      vehicleBrandSelected: null,
      vehicleModelSelected: null,
      mileage: 0
    }
  },
  computed: {
    filteredVehicleModels() {
      return this.vehicleModels.filter((model) => {
        return (
          model.brandId === this.vehicleBrandSelected &&
          model.categoryId === this.vehicleCatSelected
        )
      })
    },
    brandsIdList() {
      return this.vehicleModels
        .filter((model) => model.categoryId === this.vehicleCatSelected)
        .map((model) => model.brandId)
    },
    filteredVehicleBrands() {
      return this.vehicleBrands.filter((brand) =>
        this.brandsIdList.includes(brand.id)
      )
    }
  },
  watch: {
    vehicleCatSelected() {
      this.vehicleBrandSelected = null
      this.vehicleModelSelected = null
    },
    vehicleBrandSelected() {
      this.vehicleModelSelected = null
    }
  },
  async created() {
    if (process.client) {
      await this.getVehCats()
      await this.getVehBrands()
      await this.getVehModels()
    }
  },
  methods: {
    // api
    async getVehCats() {
      try {
        const resp = await this.$maxPosterAPIVehicle.getVehicleCategories()
        this.vehicleCats = resp.data.data.vehicleCategories
      } catch (e) {
        console.log(e)
      }
    },
    async getVehBrands() {
      try {
        const resp = await this.$maxPosterAPIVehicle.getVehicleBrands()
        this.vehicleBrands = resp.data.data.vehicleBrands
      } catch (e) {
        console.log(e)
      }
    },
    async getVehModels() {
      try {
        const resp = await this.$maxPosterAPIVehicle.getVehicleModels()
        this.vehicleModels = resp.data.data.vehicleModels
      } catch (e) {
        console.log(e)
      }
    },
    async getExpressEstimate() {
      try {
        await this.$maxPosterAPIEstimate.getEstimateExpress({
          vehicle: {
            year: 1890,
            rubPrice: 0,
            ptsType: 'original',
            ownerCount: 0,
            isOfficial: false,
            isOfficialByBrand: false,
            equipment: 0,
            mileage: this.mileage
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
select,
input {
  margin: 1rem;
}
</style>
