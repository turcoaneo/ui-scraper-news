import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue', () => {
  // Global mock before first test only
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(['GSP', 'Digisport', 'Fanatik', 'Prosport'])
      })
    )
  })
  // Needed after test especially so that the others give up on beforeEach
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders sites fetched from backend (global fetch mock)', async () => {
    const wrapper = mount(AboutView)

    // Wait for fetch + DOM update
    await new Promise(resolve => setTimeout(resolve))

    const listItems = wrapper.findAll('ul.list li')
    expect(listItems).toHaveLength(4)
    expect(listItems.map(li => li.text())).toEqual([
      'GSP',
      'Digisport',
      'Fanatik',
      'Prosport'
    ])
  })

  // Per-test spy with mockResolvedValue
  it('renders sites from mocked endpoint (spy)', async () => {
    const mockResponse = ['GSP', 'Digisport', 'Fanatik', 'Prosport']

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    })

    const wrapper = mount(AboutView)
    await new Promise(resolve => setTimeout(resolve))

    const listItems = wrapper.findAll('ul.list li')
    expect(listItems).toHaveLength(mockResponse.length)
    expect(listItems.map(li => li.text())).toEqual(mockResponse)

    fetchSpy.mockRestore()
  })

  // Endpoint-aware mockImplementation
  it('renders sites and filters from different endpoints', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.endsWith('/sites')) {
        return Promise.resolve({
          json: () => Promise.resolve(['GSP', 'Digisport', 'Fanatik', 'Prosport'])
        })
      }
      return Promise.reject(new Error(`Unhandled fetch URL: ${url}`))
    })

    const wrapper = mount(AboutView)
    await new Promise(resolve => setTimeout(resolve))

    // Verify sites list
    const listItems = wrapper.findAll('ul.list li')
    expect(listItems.map(li => li.text())).toEqual([
      'GSP',
      'Digisport',
      'Fanatik',
      'Prosport'
    ])

    fetchSpy.mockRestore()
  })
})
