import { mount } from '@vue/test-utils'
import DespreView from '@/views/DespreView.vue'

describe('DespreView.vue', () => {
it('renders correctly', () => {
const wrapper = mount(DespreView)
expect(wrapper.text()).toContain('DespreView')
})
})