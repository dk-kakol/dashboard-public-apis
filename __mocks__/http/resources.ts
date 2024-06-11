import { vi } from "vitest";
import { ref } from "vue";
import type { Resources } from '@/types';
import resources from "@/services/http/api/resources";

const data: Resources = {
  auth: [
    {
      id: "664f2c017131d8ffc59d3e0a",
      name: "apiKey"
    },
    {
      id: "664f2c017131d8ffc59d3e0b",
      name: ""
    }
  ],
  categories: [
    {
      id: "664f2c017131d8ffc59d3e10",
      name: "Animals"
    },
    {
      id: "664f2c017131d8ffc59d3e11",
      name: "Anime"
    }
  ],
  cors: [
    {
      id: "664f2c017131d8ffc59d3e06",
      name: "yes"
    },
    {
      id: "664f2c017131d8ffc59d3e07",
      name: "no"
    }
  ],
  permissions: [
    {
      id: "664f2c007131d8ffc59d3df6",
      name: "addApiEntry",
      description: "Dodawanie nowych wpisów public api"
    },
    {
      id: "664f2c007131d8ffc59d3df7",
      name: "manageApiEntry",
      description: "Zarządzanie wpisami public api"
    }
  ],
}

vi.mock('@/services/http/api/resources', () => {
  return {
    default: {
      fetchResources: vi.fn(() => ({
        data: ref(data),
        response: ref({
          data,
          status: 200,
        }),
        isFinished: ref(true),
        isLoading: ref(false),
        isAborted: ref(false),
        isCanceled: ref(false),
        error: ref(new Error('Test Error')),
        execute: resources.fetchResources,
        abort: vi.fn(),
        cancel: vi.fn(),
        parsedData: ref(data)
      }))
    }
  }
});