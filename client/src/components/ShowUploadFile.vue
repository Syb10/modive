<template>
 <!--
   ShowUploadFile ist fuer show.vue, um in der Klient*innnen-Ansicht die Dateien,
   ohne Progressbar und Deletebutton anzuzeigen.
   Hier koennen keine Dateien hochgeladen werden.  
 -->
  <div class="mb-4">
    <div v-if="isPDFshow" class="uploadpdf">
      <span class="btn__close" @click.prevent="isPDFshow=false">
        <!--kopiert von VueEasyLightbox-->
        <svg class="vel-icon icon" aria-hidden="true">
          <use xlink:href="#icon-close">
            <symbol id="icon-close" viewBox="0 0 1024 1024">
              <path d="M570.24 512l259.2 259.2-58.88 58.24L512 570.24l-261.12 261.12-58.24-58.24L453.76 512 194.56 252.8l58.24-58.24L512 453.76l261.12-261.12 58.24 58.24z"></path>
            </symbol>
          </use>
        </svg>
      </span>
      <br>
      <embed v-if="isPDFshow" :src="`http://localhost:9000/uploads/${vuexFiles[indexPDF].filename}`" width="100%" height="800rem"/>
    </div> 
    
    <ul class="list-group mb-1" v-for="(file, index) in vuexFiles" :key="index">
      <li class="list-group-item" :class="[file.invalidMessage != '' ? 'list-group-item-danger' : '']"> 
        <!--Bilder-->
        <span @click.prevent="showImg(index)"><img v-if="file.type == 'image/png' || file.type == 'image/jpg'" class="uploadimg" :src="`http://localhost:9000/uploads/${file.filename}`" alt="bild"/></span>
        <!--PDF-->
        <span @click.prevent="showPDF(index)">
          <img v-if="file.type == 'application/pdf'" class="uploadFile" :src="'http://localhost:9000/uploads/pdf.png'" alt="bildPDF"/>
        </span>
        <!--Word-->
        <span @click.prevent="`http://localhost:9000/uploads/${file.filename}`">
          <img v-if="file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" class="uploadFile" :src="'http://localhost:9000/uploads/word.png'" alt="bildWord"/>
        </span>
        <!--Excel-->
        <span>
          <a :href="`http://localhost:9000/uploads/${file.filename}`">
            <img v-if="file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class="uploadFile" :src="'http://localhost:9000/uploads/excel.png'" alt="bildExcel"/>
          </a>
        </span>
         
        <span>
          {{file.name}}
          <span v-if="file.invalidMessage">&nbsp; <i class="fa fa-exclamation-circle"></i> {{file.invalidMessage}}</span>
        </span>
      </li> 
    </ul>
    <vue-easy-lightbox
      scrollDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="indexImg"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    name: "ShowUploadFile",
    data() {
      return {
        visible: false,
        indexImg: 0,
        isPDFshow:false,
        indexPDF:0
      }
    },
    props:{
      modelValue: Object,
      color: String
    },
    components:{
      VueEasyLightbox,
    },
    computed: {
      vuexFiles() {
        return this.modelValue
      },
      imgs() {
        var arr=[]
        var counter=0
        for(var i=0; i<this.vuexFiles.length; i++) {
          if(this.vuexFiles[i].type == "image/png" || this.vuexFiles[i].type == "image/jpg"){
             arr[counter] = "http://localhost:9000/uploads/"+this.vuexFiles[i].filename
             counter++
          }
        }
        return arr
      },
    },
    methods: {
      handleHide() {
        this.visible = false
      },
      showImg(index) {
        this.indexImg = index
        this.visible = true
      },
      showPDF(index){
        this.isPDFshow = true
        this.indexPDF = index
      },
    }
 }
</script>

<style>
  .uploadimg{
    width: 5rem;
    padding-right:0.5rem;
    cursor: pointer;
  }
  .uploadFile{
    width: 3rem;
    padding-right:0.5rem;
    cursor: pointer;
  }
  .uploadpdf{
    position: fixed;
    top:0;
    right:0;
    background-color:rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
  }
  .uploadpdf span {
    color: #cccccc;
    font-size: 2rem;
    cursor: pointer;
    float:right;
    padding-right: 1rem;
  }
  .uploadpdf span:hover{
    color:#fff;
  }
  .uploadpdf embed{
    z-index:30;
    padding: 1rem 0 3rem 0;
  }
  .list-group-item{
    position: inherit !important;
  }
</style>