import { vi } from 'vitest';

vi.mock('vuetify', async () => {
  const vuetifyModule = await vi.importActual<typeof import('vuetify')>('vuetify');
  return {
    ...vuetifyModule,
    useDisplay: vi.fn(() => ({
      smAndUp: { value: true },
      smAndDown: { value: false }
    }))
  }
})