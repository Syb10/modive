<template>
  <div class="form-group">
    <label>
      {{title}}
      <div v-if="isTipp" class="tipp ml-3"> <i class="fa fa-info-circle"></i>
        <span class="tipptext">{{myTipp}}</span>
      </div>
    </label>
    <div class="input-group mb-4">
      <div class="input-group-prepend mr-5 mb-3" v-for="(item, index) in items" :key="index">
        <label class="input-group-text inputForm normal-white-space" :class="color" :for="item.id">
          <div v-if="!item.titlekurz">{{item.title}}</div>
          <div v-if="item.titlekurz">{{item.titlekurz}}</div>
          <div v-if="isInnerTipp" class="tipp ml-3"> <i class="fa fa-info-circle"></i>
            <span class="tipptext">{{item.myInnerTipp}}</span>
          </div>
        </label>
        <div class="input-group-text checkbox" :class="color">
          <input
            type="radio"
            :id="item.id"
            :name="item.name"           
            :value="item.title"
            v-model="value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioForm",
  props: {
    items: [],
    title:String,
    isTipp: Boolean,
    isInnerTipp: Boolean,
    myTipp: String,
    color: String,
    modelValue: []
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    }
  }
};
</script>
