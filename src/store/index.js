import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        keywords:"",
        singleTotal:0,
        singerTotal:0,
        searchAlbumTotal:0,
        searchVideoTotal:0,
        searchLyricTotal:0,
        searchLivingTotal:0,
        searchUserTotal:0,
        searchMusicListTotal:0,
        singleSongs:[],
        singleSongsOffset:0,
        searchSingers:[],
        searchSingerOffset:0,
        musicUrl:"",
        mvUrl:"",
        showLogin:false,

    },
    mutations:{},
    actions:{},
    getters:{},
    modules:{}
})
export default store
