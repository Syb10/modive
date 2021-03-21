<template>
  <div class="form-group">
    <label>Geschlecht</label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3">
        <label class="input-group-text" for="weiblich">weiblich</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            id="weiblich"
            value="weiblich"
            v-model="geschlecht"
          />
        </div>
      </div>
      <div class="input-group-prepend mr-5 mb-3">
        <label class="input-group-text" for="meannlich">männlich</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            id="meannlich"             
            value="männlich"
            v-model="geschlecht"
          />
        </div>
      </div>
      <div class="input-group-prepend mr-5 mb-3">
        <label class="input-group-text" for="divers">divers</label>
        <div class="input-group-text checkbox">
          <input
            type="checkbox"
            id="divers"           
            value="divers"
            v-model="geschlecht"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"Checkboxgeschlecht",
    computed: {
      geschlecht: {
        get() {
          return this.$store.state.form.geschlecht
        },
        set(val) {
          this.$store.state.form.geschlecht = val
        }
      },
    }
}
</script>