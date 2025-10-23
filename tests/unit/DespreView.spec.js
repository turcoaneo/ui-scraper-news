import { mount } from '@vue/test-utils'
import DespreView from '@/views/DespreView.vue'

describe('DespreView.vue', () => {
it('renders correctly', () => {
try {
const wrapper = mount(DespreView)
// console.log(wrapper.html())
expect(wrapper.text()).toContain('Despre')
expect(wrapper.text()).toContain('GSP')
expect(wrapper.text()).toContain('Digisport')
expect(wrapper.text()).toContain('Prosport')
expect(wrapper.text()).toContain('Fanatik')
} catch (err) {
console.error('Mount failed:', err)
throw err
}
})
})
