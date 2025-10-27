import { mount } from '@vue/test-utils'
import ClusterView from '@/views/ClusterView.vue'

// Mock global fetch
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          clusters: [],
          timestamp: '2025-10-27T09:23:00',
          delta: '2025-10-27T09:13:00',
        }),
    })
  ) as unknown as typeof fetch
})

describe('ClusterView.vue', () => {
  it('renders correctly with same-day delta', async () => {
    const wrapper = mount(ClusterView)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('Știrile de top din sport')
    expect(wrapper.text()).toContain('Actualizat: luni, 27 octombrie 2025 la 09:23 (Verificat la 09:13)')
  })

  it('renders correctly with different-day delta', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            clusters: [],
            timestamp: '2025-10-27T09:23:00',
            delta: '2025-10-26T19:23:00',
          }),
      })
    ) as unknown as typeof fetch

    const wrapper = mount(ClusterView)
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('Actualizat: luni, 27 octombrie 2025 la 09:23 (Verificat: duminică, 26 octombrie 2025 la 19:23)')
  })
})
