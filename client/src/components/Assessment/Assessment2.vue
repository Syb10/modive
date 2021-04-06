<template>
    <div>
        Geschätzte Bilanzierung nach Lebensmittelgruppen, Energie, Makro- und Mikronährstoffen
        <table class="table">
            <thead>
                <th>Lebensmittel</th>
                <th>zu wenig</th>
                <th>entprechend der Ernährungsempfehlung<input class="form-control"/></th>
                <th>zu viel</th>
            </thead>
            <tbody class=".table-striped">
                <tr>
                    <td>Lebensmittel</td>
                    <td>
                      <TableForm
                      :items="[{value:'zuwenig', id:'zuwenig', name:'getraenke'}]"
                      v-model="getraenke"
                      />
                    </td>
                    <td>
                      <TableForm
                      :items="[{value:'entsprechend', id:'entsprechend', name:'getraenke'}]"
                      v-model="getraenke"
                      />
                    </td>
                    <td>
                      <TableForm
                      :items="[{value:'zuviel', id:'zuviel', name:'getraenke'}]"
                      v-model="getraenke"
                      />
                    </td>
                </tr>
                <tr>
                    <td>Gemüse</td>
                    <td>
                      <TableForm
                      :items="[{value:'zuwenig', id:'zuwenig', name:'gemuese'}]"
                      v-model="gemuese"
                      />
                    </td>
                    <td>
                      <TableForm
                      :items="[{value:'entsprechend', id:'entsprechend', name:'gemuese'}]"
                      v-model="gemuese"
                      />
                    </td>
                    <td>
                      <TableForm
                      :items="[{value:'zuviel', id:'zuviel', name:'gemuese'}]"
                      v-model="gemuese"
                      />
                    </td>
                </tr>       
            </tbody>
        </table>
        <!--<input type="range" class="custom-range" min="0" max="2">-->
    </div>
</template>

<script>
import {mapFields} from "vuex-map-fields";
import TableForm from "../TableForm.vue";

export default {
    name: "assessment2",
    components: {
      TableForm
    },  
    computed: {
        ...mapFields([
            "getraenke",
            "gemuese"
        ])
    }
};
</script>