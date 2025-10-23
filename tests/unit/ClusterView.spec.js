import { mount } from '@vue/test-utils'
import ClusterView from '@/views/ClusterView.vue'

describe('ClusterView.vue', () => {
  it('renders correctly', () => {
    try {
      const wrapper = mount(ClusterView)
      // console.log(wrapper.html())
      expect(wrapper.text()).toContain('Știrile de top din sport')
    } catch (err) {
      console.error('Mount failed:', err)
      throw err
    }
  })
})
