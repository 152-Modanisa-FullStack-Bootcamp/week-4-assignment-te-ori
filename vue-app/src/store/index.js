import Vue from 'vue'
import Vuex from 'vuex'
import apiconst from "@/api/api"
Vue.use(Vuex)

const api = apiconst()

export default new Vuex.Store({
  state: {
    videos: []
  },
  getters: {
    getVideos: state => state.videos
  },
  mutations: {
    addVideo(state, video) {
      state.videos.push(video)
    }
  },
  actions: {
    async loadVideos({ commit }) {
      const data = await api.getVideos()
      console.log('data', data)
      for (const video of data) {
        console.log('video', video)
        commit("addVideo", video)
      }
    }
  },
  modules: {
  }
})
