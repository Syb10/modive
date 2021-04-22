<template>
    <div>
        <p class="mb-4">{{title}}</p>
        <div class="mt-2 mb-4 range">
            <div class="mySliderValue">
            <span :style="{ left:0+'%' }">{{ label1 }}</span>
            <span :style="{ left:31+'%' }">{{ label2 }}</span>
            <span :style="{ left:64+'%' }">{{ label3 }}</span>
            <span :style="{ left:89+'%' }">{{ label4 }}</span>
            </div>  
            <input type="range" class="custom-range" min="1" max="4" step="1" v-model="value">
        </div>
        <div>Value: {{value}}</div>
    </div>    
</template>

<script>
export default {
    name: "Slider",
    props: {
        label1: String,
        label2: String,
        label3: String,
        label4: String,
        title: String,
        modelValue: []
    },
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                var newValue = "";
                if(value == 1){
                    newValue = this.label1;
                }
                if(value == 2) {
                    newValue = this.label2;
                }
                if(value == 3) {
                    newValue = this.label3;
                }
                if(value == 4){
                    newValue = this.label4;
                }
                this.$emit("update:modelValue", newValue)
            }
        },
    },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mySliderValue{
  position: relative;
  width: 100%;
}
.mySliderValue span{
  position: absolute;
  top: -20px;
}
.range input::-webkit-slider-thumb{
  -webkit-appearance: none;
  background: #9a884f;
  border: 1px solid #9a884f;
}
.range input::-moz-range-thumb{
  -webkit-appearance: none;
  background: #9a884f;
  border: 1px solid #9a884f;
}</style>