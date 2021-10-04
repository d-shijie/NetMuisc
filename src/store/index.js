import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        keywords: "",
        singleTotal: 0,
        singerTotal: 0,
        searchAlbumTotal: 0,
        searchVideoTotal: 0,
        searchLyricTotal: 0,
        searchLivingTotal: 0,
        searchUserTotal: 0,
        searchMusicListTotal: 0,
        singleSongs: [],
        singleSongsOffset: 0,
        searchSingers: [],
        searchSingerOffset: 0,
        musicUrl: "",
        mvUrl: "",
        showLogin: false,
        showLogout: false,
        dailyRecommend: [],
        userInfo: {},
        showFriend: false,
        showMessage: false,
        sendUserId: 0,// 私信的用户id
        sendUserName: '',// 私信的用户名,
        showNotice: false,
        qrurl: '',//二维码
        showAlert: false,//是否显示鼠标右键弹出框,
        userCreatedPlayList: [],//用户创建的歌单
        userSublistPlaylist: [],//用户收藏的歌单
    },
    mutations: {
        setMusicUrl(state, url) {
            state.musicUrl = url
        },
        setShowLogin(state, bool) {
            state.showLogin = bool
        },
        showLogout(state, bool) {
            state.showLogout = bool
        },
        setUserInfo(state, profile) {
            state.userInfo = profile
        },
        setDailyRecommend(state, profile) {
            state.dailyRecommend = profile
        },
        setShowFriend(state, bool) {
            state.showFriend = bool
        },
        setShowMessage(state, bool) {
            state.showMessage = bool
        },
        setSendUserId(state, id) {
            state.sendUserId = id
        },
        setSendUsername(state, name) {
            state.sendUserName = name
        },
        setShowNotice(state, bool) {
            state.showNotice = bool
        },
        setQrUrl(state, url) {
            state.qrurl = url
        },
        setShowAlert(state, bool) {
            state.showAlert = bool
        },
        setCreatedPlayList(state, playlist) {
            state.userCreatedPlayList = playlist
        },
        setSublistPlayList(state, playlist) {
            state.userSublistPlaylist = playlist
        }
    },
    actions: {},
    getters: {
        userInfo(state) {
            return state.userInfo.profile
        }
    },
    modules: {}
})
export default store
