import {createLocalVue, shallowMount} from "@vue/test-utils"
import Vuex from "vuex"
import Home from "@/views/Home"
import data from "./test-data"

describe("Home.vue",() => {
    it("should contains video boxes", () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const wrapper = shallowMount(Home, {
            mocks: {
                $store: {
                    getters: {
                        getVideos: data
                    }
                }
            }
        });

        const videoBoxes = wrapper.findAll("video-box-stub")

        expect(videoBoxes).toHaveLength(data.length)
    })
})