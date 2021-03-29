<template>
    <div>
        Geschätzte Bilanzierung nach Lebensmittelgruppen, Energie, Makro- und Mikronährstoffen
        <table class="table">
            <thead>
                <th>Lebensmittel</th>
                <th>zu wenig</th>
                <th>entprechend der Ernährungsempfehlung<input class="form-control"/></th>
                <th>zu viel</th>
                <th>Notizen</th>
            </thead>
            <tbody class=".table-striped">
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{item.Lebensmittel}}</td>
                    <td v-html="item.zu_wenig"></td>
                    <td v-html="item.empfehlung"></td>
                    <td v-html="item.zu_viel"></td>
                    <td v-html="item.notizen"></td>
                </tr>    
            </tbody>
        </table>
        <div>Getränke:{{getraenke}}</div>
        <!--<input type="range" class="custom-range" min="0" max="2">-->
    </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";

export default {
    name: "assessment2",
    data() {
      return{
        items:[
          {
            Lebensmittel:"Getränke", 
            zu_wenig:"<input type='radio' name='getraenke' value='zuwenig' v-model='getraenke' @input='$emit('update:getraenke', $event.target.value)'/>",
            empfehlung:"<input type='radio' name='getraenke' value='entsprechend' v-model='getraenke'/>",
            zu_viel:"<input type='radio' name='getraenke' value='zuviel' v-model='getraenke'/>",
            notizen:"<input type='text' class='form-control'/>",
            model:"getraenke"
          },
          {
            Lebensmittel:"Getränke", 
            zu_wenig:'Welcome to <br/> Arrow GTP',
            empfehlung:'Welcome to <input type="radio" name="getraenke" value="entsprechend"/> Arrow GTP',
            zu_viel:"<input type='radio' name='getraenke' value='zuviel' />",
            notizen:"<input type='text' class='form-control'/>"
          }
        ]
      }
    },
    computed: {
        ...mapFields([
            "getraenke"
        ])
    }
};
</script>