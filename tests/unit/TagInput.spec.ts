import { mount } from '@vue/test-utils'
import TagInput from '@/views/TagInput.vue'

describe('TagInput.vue', () => {
  it('renders label, add button, dynamic tags, and permanent tags', () => {
    const wrapper = mount(TagInput, {
      props: {
        labelText: 'Some label',
        modelValue: ['value'],
        permanentTags: ['Becali']
      }
    })

    // static UI
    expect(wrapper.text()).toContain('Some label')
    expect(wrapper.text()).toContain('+')

    // permanent tag + caption
    const perm = wrapper.findAll('.tag.permanent')
    expect(perm.length).toBe(1)
    expect(perm[0].text()).toContain('Becali')
    expect(perm[0].text()).toContain('Nume exclus de server')

    // dynamic tag
    const dyn = wrapper.findAll('.tag:not(.permanent)')
    expect(dyn.length).toBe(1)
    expect(dyn[0].text()).toContain('value')
  })

  it('adds a tag on enter and via + button, emits updated modelValue', async () => {
    const wrapper = mount(TagInput, {
      props: {
        labelText: 'Include',
        modelValue: [],
        permanentTags: []
      }
    })

    const input = wrapper.get('input.tag-field')

    // add via Enter
    await input.setValue('first')
    await input.trigger('keyup.enter')
    let updateEvents = wrapper.emitted('update:modelValue') || []
    expect(updateEvents.length).toBe(1)
    expect(updateEvents[0][0]).toEqual(['first'])

    // reflect v-model change back into the component
    await wrapper.setProps({ modelValue: updateEvents[0][0] })

    // add via + button
    await input.setValue('second')
    await wrapper.get('button.add-btn').trigger('click')
    updateEvents = wrapper.emitted('update:modelValue') || []
    expect(updateEvents.length).toBe(2)
    expect(updateEvents[1][0]).toEqual(['first', 'second'])

    // reflect again
    await wrapper.setProps({ modelValue: updateEvents[1][0] })

    // verify DOM shows both tags
    const dyn = wrapper.findAll('.tag:not(.permanent)')
    expect(dyn.map(d => d.text())).toEqual(
      expect.arrayContaining(['first ×', 'second ×'])
    )
  })

  it('removes a tag when clicking ×', async () => {
    const wrapper = mount(TagInput, {
      props: {
        labelText: 'Exclude',
        modelValue: ['a', 'b', 'c'],
        permanentTags: []
      }
    })

    // remove middle tag (index 1)
    const removeButtons = wrapper.findAll('.tag:not(.permanent) button')
    expect(removeButtons.length).toBe(3)
    await removeButtons[1].trigger('click')

    const updates = wrapper.emitted('update:modelValue') || []
    expect(updates.length).toBe(1)
    expect(updates[0][0]).toEqual(['a', 'c'])

    // reflect updated model back
    await wrapper.setProps({ modelValue: updates[0][0] })

    const dyn = wrapper.findAll('.tag:not(.permanent)')
    expect(dyn.map(d => d.text())).toEqual(expect.arrayContaining(['a ×', 'c ×']))
    expect(dyn.map(d => d.text())).not.toEqual(expect.arrayContaining(['b ×']))
  })
})
