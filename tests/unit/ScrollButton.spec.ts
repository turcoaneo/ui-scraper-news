import { mount } from '@vue/test-utils'
import ScrollButton from '@/views/ScrollButton.vue'

describe('ScrollButton.vue', () => {
it('renders correctly', () => {
try {
const wrapper = mount(ScrollButton)
// console.log(wrapper.html())
expect(wrapper.text()).toContain('ScrollButton') // change here with real value of h1 or other div
} catch (err) {
console.error('Mount failed:', err)
throw err
}
})
})