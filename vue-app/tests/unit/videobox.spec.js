import { createLocalVue, mount, shallowMount } from "@vue/test-utils"
import flushPromises from "flush-promises"
import VideoBox from "@/components/VideoBox"
import data from "./test-data"
import VueRouter from "vue-router"

import router from "@/router"

describe("VideoBox.vue", () => {
    const videoData = data[0];

    describe("Basic items", () => {
        let wrapper;
        beforeEach(() => {
            const localVue = createLocalVue();
            localVue.use(VueRouter)
            wrapper = shallowMount(VideoBox, {
                localVue,
                propsData: {
                    video: videoData
                }
            })
        })

        it("should exist", () => {
            expect(wrapper.exists()).toBeTruthy()
        })

        it("should contains", () => {
            const videoBox = wrapper.find(".videobox")
            const coverImage = videoBox.find("img.cover")
            const profileImage = videoBox.find("img.profile")
            const title = videoBox.find(".title");

            expect(videoBox.exists()).toBeTruthy()

            expect(coverImage.exists()).toBeTruthy()
            expect(coverImage.attributes("src")).toMatch(videoData.coverImage)

            expect(profileImage.exists()).toBeTruthy()
            expect(profileImage.attributes("src")).toMatch(videoData.ownerImage)

            expect(title.exists()).toBeTruthy()
        })

        it("should display hover image while mouse is over", async () => {
            const coverImage = wrapper.find("img.cover")
            coverImage.trigger('mouseover')
            await flushPromises()
            expect(coverImage.attributes("src")).toMatch(videoData.hoverImage)
        })
    })

    it("should contains link to watch page", async () => {
        const localVue = createLocalVue();
        localVue.use(VueRouter)
        const nonShallow = mount(VideoBox, {
            localVue,
            router,
            propsData: {
                video: videoData
            }
        })
        const videoBox = nonShallow.find(".videobox")
        const link = videoBox.find("a")

        expect(link.exists()).toBeTruthy()
        expect(link.attributes("href")).toMatch(`watch?id=${videoData.id}`)
    })


})