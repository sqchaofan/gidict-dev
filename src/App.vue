<script>
import CharaList from './components/CharaList.vue'
import ChangeLog from './components/ChangeLog.vue'
import ToolPage from './components/ToolPage.vue'
import Todo from './components/Todo.vue'
import Config from './components/Config.vue'

export default{
  components:{
    CharaList,
    ChangeLog,
    Config,
    ToolPage,
    Todo
  },
  data(){
    return{
      windowWidth: 0,
      page: "main",
      pageall:[
        {
          "name": "main",
          "disp": "図鑑"
        },
        {
          "name": "changelog",
          "disp": "更新履歴"
        },{
          "name": "config",
          "disp": "設定"
        }
      ],
      pageall_dev:[
        {
          "name": "tool",
          "disp": "[dev]開発用ツール"
        },
        {
          "name": "todo",
          "disp": "[dev]Todo"
        }
      ],
      cfg:{
        devMode: false,
        showWday: true,
      }
    }
  },
  methods:{
    resizeWindow () {
      this.windowWidth = window.innerWidth;
    },
    copy:(val)=>{
      return Object.assign({}, val);
    },
    resCfg(newVal){
      Object.keys(newVal).forEach(k=>this.cfg[k] = newVal[k]);
    }
  },
  mounted(){
    this.resizeWindow();
    window.addEventListener('resize', this.resizeWindow);
  },
  computed:{
    pageMenuAll(){
        let pagelist=Object.assign([],this.pageall);
        if(this.cfg.devMode)this.pageall_dev.forEach(page=>pagelist.push(page));
        return pagelist;
      }
  }
}
</script>

<template>
  <div class="header">
    <div class="container-fluid">
      <div class="row row-cols-auto align-items-center">
        <div class="col-auto me-auto">
          <h1 style="font-weight: bold;">原神キャラ図鑑</h1>
        </div>
        <div v-if="this.windowWidth>768" v-for="pg in pageMenuAll" :key="pg.name" class="col p-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus-vertical" width="2" height="24" viewBox="0 0 2 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 0v24"></path>
          </svg>
          <button @click="page = pg.name" class="btn btnx-tab">{{pg.disp}}</button>
        </div>
        <div v-else class="dropdown col">
          <button class="btn btnx-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenuBtn">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 16 512 512" style="width: 24px; height: 24px; opacity: 1;" xml:space="preserve">
              <g>
                <circle class="st0" cx="48" cy="64" r="48" style="fill: rgb(236, 228, 217);"></circle>
                <rect x="160" y="16" class="st0" width="352" height="96" style="fill: rgb(236, 228, 217);"></rect>
                <circle class="st0" cx="48" cy="256" r="48" style="fill: rgb(236, 228, 217);"></circle>
                <rect x="160" y="208" class="st0" width="352" height="96" style="fill: rgb(236, 228, 217);"></rect>
                <circle class="st0" cx="48" cy="448" r="48" style="fill: rgb(236, 228, 217);"></circle>
                <rect x="160" y="400" class="st0" width="352" height="96" style="fill: rgb(236, 228, 217);"></rect>
              </g>
              </svg><span style="font-size:9px;padding:0px 0px 0px 6px;">▼</span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuBtn">
            <li v-for="pg in pageall"><div class="dropdown-item" @click="page=pg.name">{{pg.disp}}</div></li>
            <li v-if="this.cfg.devMode" v-for="pg in pageall_dev"><div class="dropdown-item" @click="page=pg.name">{{pg.disp}}</div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  <div class="mainpage">
    <CharaList v-if="page==='main'" :showWday="cfg.showWday" />
    <ChangeLog v-if="page==='changelog'" />
    <Config v-if="page==='config'" :devMode="cfg.devMode" :showWday="cfg.showWday" @resCfg="resCfg" />
    <ToolPage v-if="page==='tool'" />
    <Todo v-if="page==='todo'" />
  </div>
</template>

<style lang="scss">
.header{
  padding: 6px 6px 6px;
  background-color: $bg-strong-color;
  color:$text-color;
  box-shadow: inset 0px -6px $bg-light-color;
}

.mainpage{
  padding: 6px 0px;
  background-color: $bg-color;
  color: $text-color;
}

</style>


