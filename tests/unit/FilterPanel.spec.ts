import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FilterPanel from '@/views/FilterPanel.vue'
import { useFilterStore } from '@/utils/useFilterStore'

describe('FilterPanel.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly', () => {
    const wrapper = mount(FilterPanel, {
      global: { plugins: [pinia] }
    })
    expect(wrapper.text()).toContain('Aplică filtre')
    expect(wrapper.text()).toContain('Caută după:')
  })

  it('updates store when including tags are added', async () => {
    const wrapper = mount(FilterPanel, {
      global: { plugins: [pinia] }
    })
    const store = useFilterStore()

    // simulate adding a tag in the "Include" TagInput
    const input = wrapper.findAll('input.tag-field')[0] // first TagInput input
    await input.setValue('tenis')
    await input.trigger('keyup.enter')

    // store should now contain the tag
    expect(store.filterIncluding).toContain('tenis')
  })

  it('updates store when excluding tags are added', async () => {
    const wrapper = mount(FilterPanel, {
      global: { plugins: [pinia] }
    })
    const store = useFilterStore()

    // simulate adding a tag in the "Exclude" TagInput
    const input = wrapper.findAll('input.tag-field')[1] // second TagInput input
    await input.setValue('snooker')
    await input.trigger('keyup.enter')

    expect(store.filterExcluding).toContain('snooker')
    // permanent tag "Becali" should always be present
    expect(wrapper.text()).toContain('Becali')
    expect(wrapper.text()).toContain('Nume exclus de server')
  })

  it('emits apply event when apply button is clicked', async () => {
    const wrapper = mount(FilterPanel, {
      global: { plugins: [pinia] }
    })

    // click the button by id
    // await wrapper.find('#apply-btn').trigger('click')
    await wrapper.find('[data-testid="apply-button"]').trigger('click')

    const events = wrapper.emitted('apply')
    expect(events).toBeDefined()
    expect(events).toHaveLength(1)
    // no payload → inner array is empty
    expect(events![0]).toEqual([])
  })


})
