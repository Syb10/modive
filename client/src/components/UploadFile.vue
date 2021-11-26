<template>
<!--
   UploadFile wird an allen Stellen im Formular eingefuegt, wenn Dateien hochgeladen, geloescht 
   und angezeigen werden sollen.
 -->
  <div class="mb-4">
    <input
      multiple
      style="display:none"
      type="file"
      ref="files"
      @change.prevent="selectFile"
    />
    <button class="btn mb-2" :class="color" @click.prevent="$refs.files.click()">
      <i class="fa fa-upload"></i>  Dokumente hochladen
    </button>
    
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
        <span v-if="uploading" class="progress">
          <progress class="progress-bar progress-bar-striped" :value="progress" max="100" style="width:100%">
           {{progress}}%
          </progress>  
        </span>
        <!--Bilder-->
        <span v-if="!uploading" @click.prevent="showImg(index)"><img v-if="file.type == 'image/png' || file.type == 'image/jpg'" class="uploadimg" :src="`http://localhost:9000/uploads/${file.filename}`" alt="bild"/></span>
        <!--PDF-->
        <span v-if="!uploading" @click.prevent="showPDF(index)">
          <img v-if="file.type == 'application/pdf'" class="uploadFile" :src="'http://localhost:9000/uploads/pdf.png'" alt="bildPDF"/>
        </span>
        <!--Word-->
        <span v-if="!uploading" @click.prevent="`http://localhost:9000/uploads/${file.filename}`">
          <img v-if="file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" class="uploadFile" :src="'http://localhost:9000/uploads/word.png'" alt="bildWord"/>
        </span>
        <!--Excel-->
        <span v-if="!uploading">
          <a :href="`http://localhost:9000/uploads/${file.filename}`">
            <img v-if="file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class="uploadFile" :src="'http://localhost:9000/uploads/excel.png'" alt="bildExcel"/>
          </a>
        </span>
         
        <span v-if="!uploading">
          {{file.name}}
          <span v-if="file.invalidMessage">&nbsp; <i class="fa fa-exclamation-circle"></i> {{file.invalidMessage}}</span>
        </span>
        <span v-if="!uploading" class="float-right" @click.prevent="deleteFile(index, file.filename)">
          <i class="fa fa-trash"></i>
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
import axios from "axios";
import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    name: "UploadFile",
    data() {
      return {
        files:[],
        uploadFiles:[],
        fileName:[],
        fileCounter:0,
        uploading:false,
        progress:0,
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
    emits: ["update:modelValue"],
    computed: {
      vuexFiles() {
        return this.modelValue
      },
      klientName(){
        return this.$store.state.nachname+'_'+this.$store.state.vorname
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
      setFileName(index, name){
        this.fileName[index] = this.klientName+'_'+Date.now()+'_'+name
      },
      async selectFile() {
        const myfiles = this.$refs.files.files;
        this.uploadFiles = [...this.uploadFiles, ...myfiles]

        /*
         * da kein formData in vuex gespeichert werden kann, werden die Dateien in dem 
         * Array vuexFiles gespeichert. Filename ist die ID
         */
        for(var i=this.fileCounter; i<this.uploadFiles.length; i++){
          this.setFileName(i, this.uploadFiles[i].name)
          this.vuexFiles.push({
            name: this.uploadFiles[i].name, 
            filename: this.fileName[i], 
            type: this.uploadFiles[i].type,
            invalidMessage: this.validate(this.uploadFiles[i]),
          })
          this.fileCounter++;
        }
        this.$emit("update:modelValue", this.vuexFiles)

        //save File
        const formData = new FormData();
        for(var j=0; j < this.uploadFiles.length; j++) {
          if(this.validate(this.uploadFiles[j]) === "") {
            formData.append("files", this.uploadFiles[j], this.fileName[j]);
          }
        }
        
        try{
          this.uploading= true;
          const res = await axios.post('http://localhost:9000/api/upload', formData, {
            onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
          });
          this.uploading = false;
          console.log(res);
        }catch(error){
          this.uploading = false;
        }
      },
      deleteFile(index, id) {
        this.vuexFiles.splice(index, 1)
        this.uploadFiles.splice(index, 1)
        this.fileCounter = this.uploadFiles.length
        
        axios.delete(`http://localhost:9000/api/upload/${id}`)
        .then((response) => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
        
      },
      validate(file){
        const allowedTypes = [
          "image/png", 
          "image/jpg",
          "application/pdf",
          "application/msword", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];

          if(!allowedTypes.includes(file.type)){
          return "erlaubte Dateien: png, jpg, pdf, docx, xlsx"; 
        }
        return ""
      },
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