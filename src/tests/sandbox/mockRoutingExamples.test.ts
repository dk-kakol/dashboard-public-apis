import { useRouter, useRoute } from 'vue-router'
import type { Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

interface propsType {
  isAuthenticated: boolean
}

const Component = defineComponent({
  template: `<button @click="redirect">Click to Edit</button>`,
  props: ['isAuthenticated'],
  setup (props: propsType) {
    const router = useRouter()
    const route = useRoute()

    const redirect = () => {
      if (props.isAuthenticated) {
        router.push(`/posts/${route.params.id}/edit`)
      } else {
        router.push('/404')
      }
    }

    return {
      redirect
    }
  }
})

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

test('allows authenticated user to edit a post', async () => {
  const mockedUseRoute = useRoute as Mock;
  mockedUseRoute.mockImplementationOnce(() => ({
    params: {
      id: 1
    }
  }))

  const push = vi.fn()
  const mockedUseRouter = useRouter as Mock;
  mockedUseRouter.mockImplementationOnce(() => ({
    push
  }))

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: true
    },
    global: {
      stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
    }
  })

  await wrapper.find('button').trigger('click')

  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith('/posts/1/edit')
})

test('redirect an unauthenticated user to 404', async () => {
  const mockedUseRoute = useRoute as Mock;
  mockedUseRoute.mockImplementationOnce(() => ({
    params: {
      id: 1
    }
  }))

  const push = vi.fn()
  const mockedUseRouter = useRouter as Mock;
  mockedUseRouter.mockImplementationOnce(() => ({
    push
  }))
  // poniższe i ostatnia linijka też będą działać
  // mockedUseRouter.mockReturnValue({
  //   ...useRouter(),
  //   push,
  // })
  const wrapper = mount(Component, {
    props: {
      isAuthenticated: false
    },
    global: {
      stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
    }
  })

  await wrapper.find('button').trigger('click')

  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith('/404')
  // expect(mockedUseRouter().push).toHaveBeenCalledWith('/404')
})

test('inny sposób: allows authenticated user to edit a post', async () => {
  vi.mocked(useRoute).mockReturnValue({
    ...useRoute(),
    params: {
      id: '1',
    },
  })

  vi.mocked(useRouter).mockReturnValue({
    ...useRouter(),
    push: vi.fn(),
  }); 

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: true
    },
    global: {
      stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
    }
  })

  await wrapper.find('button').trigger('click')

  expect(useRouter().push).toHaveBeenCalledTimes(1)
  expect(useRouter().push).toHaveBeenCalledWith('/posts/1/edit')
})

test('inny sposób: redirect an unauthenticated user to 404', async () => {
  vi.mocked(useRoute).mockReturnValue({
    ...useRoute(),
    params: {
      id: '1',
    },
  })

  vi.mocked(useRouter).mockReturnValue({
    ...useRouter(),
    push: vi.fn(),
  }); 

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: false
    },
    global: {
      stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
    }
  })

  await wrapper.find('button').trigger('click')

  expect(useRouter().push).toHaveBeenCalledTimes(1)
  expect(useRouter().push).toHaveBeenCalledWith('/404')
})