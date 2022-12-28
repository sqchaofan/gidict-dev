<script>
import chrData from '@/assets/chara.json'
import materialData from '@/assets/materialdict.json'

export default{
    data(){
        return{
            res_text:'',
            in_text:'',
            materialDict: null,
            chrDict: null,
            weapons: ["片手剣","両手剣","弓","長柄武器","法器"],
            elementals: [
                {"name":"風", "value":"anemo"},
                {"name":"氷", "value":"cryo"},
                {"name":"草", "value":"dendro"},
                {"name":"雷", "value":"electro"},
                {"name":"岩", "value":"geo"},
                {"name":"水", "value":"hydro"},
                {"name":"炎", "value":"pyro"},
            ],
            countries: ["モンド","璃月","稲妻","スメール","フォンテーヌ","ナタ","スネージナヤ","カーンルイア","その他"],
            selected:{
                id: "",
                name:"",
                name_en: "",
                name_img: "",
                weapon: "片手剣",
                element_en: "anemo",
                country: "モンド",
                birthday: ""
            },
            doAddComma: true
        }
    },
    methods:{
        async fetchAll() {
            this.materialDict = materialData;
            this.chrDict = chrData;
            let previd = parseInt(this.chrDict[this.chrDict.length-1].id);
            this.selected.id=String(previd+1).padStart(4,'0');
        },
        convert(){
            if(this.selected.name_img===""){
                this.selected.name_img=this.selected.name_en;
            }
            if(this.selected.id===""){
                this.selected.id=String(this.chrDict.length).padStart(4,'0');
            }

            this.res_text=this.doAddComma?",{\n":"{\n";
            Object.keys(this.selected).forEach(el=>{
                this.res_text+=`\t"${el}": "${this.selected[el]}",\n`;
            });

            this.res_text+=`\t"materials":[\n`;
            let q_array = [];
            if(this.in_text.includes('\t')){
                q_array = this.in_text.split('\t');
            }else{
                q_array = this.in_text.split(' ');
            }
            
            if(this.in_text){
                q_array.forEach((element,idx) => {
                    const materialid=
                        this.materialDict.hasOwnProperty(element)?this.materialDict[element]:"None";
                    if(idx === q_array.length -1){
                        this.res_text += `\t\t"${materialid}"\n`;
                    }else{
                        this.res_text += `\t\t"${materialid}",\n`;
                    }
                });
            }
            this.res_text += "\t]\n}";

            const id_temp = parseInt(this.selected.id,10);
            this.selected.id=String(id_temp+1).padStart(4,'0');
            this.selected.name_img="";
        }
    },
    mounted(){
        this.fetchAll();
    }
}

</script>

<template>
    <div class="container-xl">
      <h3>キャラクターのJSON情報を作成</h3>
      <p>
        <div class="form-v-group-sm">
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-12 col-sm-3 col-lg-2"> id<span class="aster">*</span> :</div>
                <div class="col-12 col-sm-9 col-lg-8"><input v-model="selected.id" class="form-control" placeholder="0000"></div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-12 col-sm-3 col-lg-2"> キャラ名(JP)<span class="aster">*</span> :</div>
                <div class="col-12 col-sm-9 col-lg-8"><input v-model="selected.name" class="form-control" placeholder="蛍"></div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-12 col-sm-3 col-lg-2"> キャラ名(EN)<span class="aster">*</span> :</div>
                <div class="col-12 col-sm-9 col-lg-8"><input v-model="selected.name_en" class="form-control" placeholder="Lumine"></div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-12 col-sm-3 col-lg-2"> 画像名 :</div>
                <div class="col-12 col-sm-9 col-lg-8"><input v-model="selected.name_img" class="form-control" placeholder="PlayerGirl"></div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-12 col-sm-3 col-lg-2"> 誕生日 :</div>
                <div class="col-12 col-sm-9 col-lg-8"><input v-model="selected.birthday" class="form-control" placeholder="1月1日"></div>
            </div>
        </div>
        注：<span class="aster">*</span>は必須
      </p>
      <p>
        <div class="form-v-group">
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-2 col-sm-3 col-lg-2">元素：</div>
                <div class="col-6 col-sm-3 col-lg-2">
                    <select v-model="selected.element_en" class="form-select form-select-sm">
                        <option v-for="elem in elementals" :value="elem.value">
                            {{ elem.name }} {{ elem.value }}
                        </option>
                    </select>
                </div>
                <div class="col">
                    <img v-if="selected.element_en" :src="`/assets/imgs/other/${selected.element_en}.png`" height="31">
                </div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-2 col-sm-3 col-lg-2">武器：</div>
                <div class="col-6 col-sm-3 col-lg-2">
                <select v-model="selected.weapon" class="form-select form-select-sm">
                    <option v-for="weapon in weapons" :value="weapon">
                        {{ weapon }}
                    </option>
                </select>
                </div>
            </div>
            <div class="row row-cols-auto align-items-center gx-0">
                <div class="col-2 col-sm-3 col-lg-2">国：</div>
                <div class="col-6 col-sm-3 col-lg-2">
                    <select v-model="selected.country" class="form-select form-select-sm last-child">
                        <option v-for="(country, idx) in countries" :value="country">
                            {{ idx }}:{{ country }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        素材名(スペースまたはタブ区切り, スプレッドシートからコピー可)
        <input v-model="in_text" class="form-control">
      </p>
      <p>
        <div class="row row-cols-auto align-items-center">
            <div class="col">
            <button @click="convert" class="btn btnx-gv-blue">変換</button>
            </div>
            <div class="form-check col">
                <input v-model="doAddComma" class="form-check-input" type="checkbox" value="" id="flexCheckDefault" :checked="doAddComma">
                <label class="form-check-label" for="flexCheckDefault">
                    先頭にカンマ(,)を付ける
                </label>
            </div>
        </div>
    </p><p>
        <textarea class="form-control" rows="17" readonly>{{res_text}}</textarea>
      </p>
    </div> 
</template>

<style>
.aster{
    color: red;
}
</style>