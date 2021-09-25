import Vue from "vue";
import VueRouter from "vue-router";
import SearchSingers from "../views/search/SearchSingers";
import Singer from "../components/singer/Singer";
import Album from "../components/album/Album";
import { Main } from "element-ui";
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const FindMusic = () => import("../views/findMusic/FindMusic")
const FindMusicPersonalize = () => import("../views/findMusic/FindMusicPersonalize")
const FindMusicMusicList = () => import("../views/findMusic/FindMusicMusicList")
const FindMusicDj = () => import("../views/findMusic/FindMusicDj")
const FindMusicRank = () => import("../views/findMusic/FindMusicRank")
const FindMusicSinger = () => import("../views/findMusic/FindMusicSinger")
const FindMusicNewMusic = () => import("../views/findMusic/FindMusicNewMusic")
const Video = () => import("../views/video/Video")
const Videos = () => import("../views/video/Videos")
const MVs = () => import("../views/video/MVs")
const Friend = () => import("../views/friend/Friend")
const Living = () => import("../views/living/Living")
const PersonalFM = () => import("../views/personalFM/PersonalFM")
const Search = () => import("../views/search/Search")
const SingleSongs = () => import("../views/search/SingleSongs")
const Singers = () => import("../views/search/SearchSingers")
const SearchAlbum = () => import("../views/search/SearchAlbum")
const SearchVideo = () => import("../views/search/SearchVideo")
const SearchMusicList = () => import("../views/search/SearchMusicList")
const SearchLyric = () => import("../views/search/SearchLyric")
const SearchLiving = () => import("../views/search/SearchLiving")
const SearchUser = () => import("../views/search/SearchUser")
const MainSinger = () => import("../components/singer/Singer")
const TopFifty = () => import("../components/singer/TopFifty")
const SingerMV = () => import("../components/singer/SingerMV")
const SingerDetail = () => import("../components/singer/SingerDetail")
const SimilarSinger = () => import("../components/singer/SimilarSingers")
const MainAlbum = () => import("../components/album/Album")
const AlbumMusicList = () => import("../components/album/AlbumMusicList")
const AlbumComments = () => import("../components/album/AlbumComments")
const AlbumDetail = () => import("../components/album/AlbumDetail")
const MV = () => import("../components/mv/MV")
const MusicList = () => import("../components/musicList/MusicList")
const PlayList = () => import("../components/musicList/PlayList")
const MusicListComment = () => import("../components/musicList/MusicListComment")
const MusicListSub = () => import("../components/musicList/MusicListSubers")
const Profile = () => import("../components/profile/Profile")
const Dj = () => import("../components/dj/Dj")
const DjPrograms = () => import("../components/dj/DjProgram")
const DjSubs = () => import("../components/dj/DjSubs")
const DjRank = () => import("../views/findMusic/DjRank")
const DjCategory = () => import("../views/findMusic/DjCategory")
const DailyRecommend = () => import('../views/dailyRecommend/DailyRecommend.vue')
const Local = () => import('../views/local/Local.vue')
const Recent = () => import('../views/recent/Recent.vue')
const Cloud = () => import('../views/cloud/Cloud.vue')
const Client = () => import('../views/client/Client.vue')
const Collect = () => import('../views/collect/Collect.vue')
const VideoPlay = () => import('../views/video/VideoPlay.vue')
const AllMV = () => import('../views/allMV/AllMV.vue')
const MVRank = () => import('../components/mv/MVRank.vue')
const TopicDetail = () => import('../views/friend/TopicDetail.vue')
const Topic = () => import('../views/friend/Topic.vue')
const Gender = () => import('../views/gender/Gender.vue')
const Follow = () => import('../views/follow/Follow.vue')
const Followed = () => import('../views/follow/Followed.vue')
const routes = [
    {
        redirect: "/findMusic",
        path: ""
    },
    {
        path: "/findMusic",
        component: FindMusic,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: FindMusicPersonalize
            },
            {
                path: "singers",
                component: FindMusicMusicList
            },
            {
                path: "searchalbum",
                component: FindMusicDj,
            },
            {
                path: "searchvideo",
                component: FindMusicRank
            },
            {
                path: "searchmusiclist",
                component: FindMusicSinger
            },
            {
                path: "searchlyric",
                component: FindMusicNewMusic
            },
            {
                path: "djrank",
                component: DjRank
            }
        ]
    },
    {
        path: "/video",
        component: Video,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: Videos
            },
            {
                path: "singers",
                component: MVs
            },
        ]
    },
    {
        path: "/friend",
        component: Friend
    },
    {
        path: "/living",
        component: Living
    },
    {
        path: "/personalFM",
        component: PersonalFM
    },
    {
        path: "/search",
        component: Search,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: SingleSongs
            },
            {
                path: "singers",
                component: Singers
            },
            {
                path: "searchalbum",
                component: SearchAlbum
            },
            {
                path: "searchvideo",
                component: SearchVideo
            },
            {
                path: "searchliving",
                component: SearchLiving
            },
            {
                path: "searchmusiclist",
                component: SearchMusicList
            },
            {
                path: "searchlyric",
                component: SearchLyric
            },
            {
                path: "searchuser",
                component: SearchUser
            }
        ]
    },
    {
        path: "/singer/:id",
        component: MainSinger,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: TopFifty
            },
            {
                path: "singers",
                component: SingerMV
            },
            {
                path: "searchalbum",
                component: SingerDetail
            },
            {
                path: "searchvideo",
                component: SimilarSinger
            }
        ]
    },
    {
        path: "/album/:id",
        component: MainAlbum,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: AlbumMusicList
            },
            {
                path: "singers",
                component: AlbumComments
            },
            {
                path: "searchalbum",
                component: AlbumDetail
            },
        ]
    },
    {
        path: "/mv/:id",
        component: MV
    },
    {
        path: "/musiclist/:id",
        component: MusicList,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: PlayList
            },
            {
                path: "singers",
                component: MusicListComment
            },
            {
                path: "searchalbum",
                component: MusicListSub
            },
        ]
    },
    {
        path: "/profile/:id",
        component: Profile
    },
    {
        path: "/dj/:id",
        component: Dj,
        children: [
            {
                redirect: "singlesongs",
                path: ""
            },
            {
                path: "singlesongs",
                component: DjPrograms
            },
            {
                path: "singers",
                component: DjSubs
            },
        ]
    },
    {
        path: "/djcategory/:id",
        component: DjCategory
    },
    {
        path: '/dailyRecommend',
        component: DailyRecommend
    },
    {
        path: "/local",
        component: Local
    },
    {
        path: '/recent',
        component: Recent
    },
    {
        path: '/cloud',
        component: Cloud
    },
    {
        path: '/client',
        component: Client
    },
    {
        path: '/collect',
        component: Collect
    },
    {
        path: '/videoPlay/:id',
        component: VideoPlay
    },
    {
        path: "/allmv",
        component: AllMV
    },
    {
        path: "/mvRank",
        component: MVRank
    },
    {
        path: "/topicDetail/:id",
        component: TopicDetail
    },
    {
        path: '/topic',
        component: Topic
    },
    {
        path: "/gender/:id",
        component: Gender
    },
    {
        path: '/follow/:id',
        component: Follow
    },
    {
        path: "/followed/:id",
        component: Followed
    }
];
const router = new VueRouter({
    routes,
    mode: "hash"
})
export default router
