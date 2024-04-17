// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['json','text'],
        thresholds : {
            branches : 50,
            functions : 50,
            lines : 50,
            statements : 50
        }
    },
  },
})