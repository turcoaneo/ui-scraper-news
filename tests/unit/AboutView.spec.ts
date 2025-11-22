import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue', () => {
  it('renders correctly', () => {
    try {
      const wrapper = mount(AboutView)
      // console.log(wrapper.html())
      expect(wrapper.text()).toContain('Topul știrilor zilnice de sport din online')
    } catch (err) {
      console.error('Mount failed:', err)
      throw err
    }
  })
})
