import { vi } from "vitest";

export default () => vi.mock('@/services/http/api/publicApis', () => {
  return {
    default: {
      fetchList: () => new Promise((resolve) => { 
        resolve({
          data: {
            count: 100,
          }
        })
      })
    }
  }
});