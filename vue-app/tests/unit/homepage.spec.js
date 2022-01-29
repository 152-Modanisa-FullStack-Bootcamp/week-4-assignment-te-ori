import {shallowMount} from "@vue/test-utils"
import Home from "@/views/Home"
import data from "./test-data"

describe("Home.vue",() => {
    it("should contains video boxes", () => {
        const wrapper = shallowMount(Home, {
            mocks: {
                data() {
                    return data
                }
            }
        });
        const videoBoxes = wrapper.findAll(".video-box")

        expect(videoBoxes).toHaveLength(data.length)
    })
})