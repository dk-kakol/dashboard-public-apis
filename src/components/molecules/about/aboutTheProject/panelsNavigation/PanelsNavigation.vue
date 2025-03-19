<template>
  <RowAtom justify="center" justify-sm="space-between" class="m-panelsNavigation mb-6">
    <ColAtom
      cols="11"
      sm=""
      v-for="(button, index) in panelsButtons"
      :key="index"
      class="m-panelsNavigation__wrapper pa-0"
      @click="emit('navigate', button.id)"
    >
      <div class="m-panelsNavigation__button pa-2 ma-3" :class="{ '-active': isActive(button.id) }">
        <AnimateText :restart="panelsButtonsAnimationRestart[index]" :text="button.text" />
      </div>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

type Props = {
  currentPanel?: string
  panelsButtons: { text: string; id: string }[]
}
const props = defineProps<Props>()

const isActive = (id: string) => props.currentPanel === id

type Emit = {
  navigate: [value: string]
}
const emit = defineEmits<Emit>()

const panelsButtonsAnimationRestart = ref(Array(props.panelsButtons.length).fill(false))

const animatePanelsButtonsOnEnterViewport = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.m-panelsNavigation',
      start: 'top bottom',
      onEnter: () => {
        tl.restart()
      },
      onLeaveBack: () => {
        panelsButtonsAnimationRestart.value = panelsButtonsAnimationRestart.value.map(() => false)
      }
    }
  })
  panelsButtonsAnimationRestart.value.forEach((_, index) => {
    tl.add(() => {
      panelsButtonsAnimationRestart.value[index] = true
    }, '<+=0.5').to(
      '.m-panelsNavigation__button',
      {
        '--border-width': '100%',
        stagger: 0.5,
        duration: 2,
        ease: 'power2.out'
      },
      '<'
    )
  })
}
onMounted(() => {
  animatePanelsButtonsOnEnterViewport()
})
</script>

<style scoped lang="scss">
.m-panelsNavigation {
  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: var(--font-size-about-navigation);

    :deep() {
      span {
        display: block;
      }
    }
  }

  &__button {
    width: 100%;
    position: relative;

    --border-width: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: var(--border-width);
      border-bottom: 1px solid rgba(var(--v-theme-on-background));
    }

    &.-active {
      &::after {
        border-bottom: 4px solid var(--about-secondary-light-color);
      }

      :deep() {
        span {
          font-weight: 600;
        }
      }
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(var(--v-theme-on-background), 0.4);
      transform: scale(1.05);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }
  }
}
</style>
