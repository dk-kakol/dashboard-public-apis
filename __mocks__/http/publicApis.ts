import { vi } from "vitest";
import type { EntriesResponse, Entries } from '@/types';

const apis: Entries = [
  {
    id: 'firstid',
    API: 'AdoptAPet',
    Description: 'Resource to help get pets adopted',
    Auth: 'apiKey',
    HTTPS: true,
    Cors: 'yes',
    Link: 'https://www.adoptapet.com/public/apis/pet_list.html',
    Category: 'Animals'
  },
  {
    id: 'secondid',
    API: 'Axolotl',
    Description: 'Collection of axolotl pictures and facts',
    Auth: '',
    HTTPS: true,
    Cors: 'no',
    Link: 'https://theaxolotlapi.netlify.app/',
    Category: 'Animals'
  }
];

vi.mock('@/services/http/api/publicApis', () => {
  return {
    default: {
      fetchList: () => new Promise<{ data: EntriesResponse }>((resolve) => { 
        resolve({
          data: {
            count: apis.length,
            entries: apis,
          }
        })
      })
    }
  }
});