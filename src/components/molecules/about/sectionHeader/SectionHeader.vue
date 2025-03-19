<template>
  <RowAtom no-gutters align-items="center" class="mb-3" ref="m-aboutHeader">
    <ColAtom justify-self="start" class="m-aboutHeader__beforeTitleLine">
      <hr />
    </ColAtom>
    <ColAtom cols="auto" class="m-aboutHeader__title px-3" ref="m-aboutHeader__title">
      <AnimateText :restart="animateTitle" :text="title"> </AnimateText>
    </ColAtom>
    <ColAtom cols="auto" class="m-aboutHeader__afterTitleLine" ref="m-aboutHeader__afterTitleLine">
      <hr />
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef, computed, ref, onMounted } from 'vue'
import gsap from 'gsap'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

type Props = {
  title: string
}
defineProps<Props>()
const aboutHeaderRef = useTemplateRef('m-aboutHeader')
const aboutHeaderTitleRef = useTemplateRef('m-aboutHeader__title')
const aboutHeaderAfterTitleRef = useTemplateRef('m-aboutHeader__afterTitleLine')
const { width: aboutHeaderWidth } = useElementBounding(aboutHeaderRef)
const { width: aboutHeaderTitleWidth } = useElementBounding(aboutHeaderTitleRef)
const { width: aboutHeaderAfterTitleWidth } = useElementBounding(aboutHeaderAfterTitleRef)
const initialAfterTitleLineLength = computed(
  () => 0.5 * aboutHeaderWidth.value - aboutHeaderTitleWidth.value
)
const animateTitle = ref(false)
const isFinishedMainAnimation = ref(false)

let tweenOnUpdate: gsap.core.Tween
const animateSectionHeader = () => {
  if (!aboutHeaderRef.value) return
  const beforeTitleLine = aboutHeaderRef.value.$el.querySelector(
    '.m-aboutHeader__beforeTitleLine hr'
  )
  const afterTitleCol = aboutHeaderRef.value.$el.querySelector('.m-aboutHeader__afterTitleLine')
  const afterTitleLine = aboutHeaderRef.value.$el.querySelector('.m-aboutHeader__afterTitleLine hr')
  if (!beforeTitleLine || !afterTitleLine || !afterTitleCol) return
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutHeaderRef.value.$el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        tl.restart()
      },
      onLeaveBack: () => {
        animateTitle.value = false
        isFinishedMainAnimation.value = false
        if (tweenOnUpdate) {
          tweenOnUpdate.kill()
        }
      },
      onUpdate: ({ direction }) => {
        if (!isFinishedMainAnimation.value || !aboutHeaderRef.value) return
        if (tweenOnUpdate?.isActive()) return
        tweenOnUpdate = gsap.to(afterTitleCol, {
          width: `${aboutHeaderAfterTitleWidth.value - direction * 10}px`,
          duration: 1,
          ease: 'power1.inOut'
        })
      }
    }
  })
  tl.to(beforeTitleLine, {
    duration: 2,
    width: '100%'
  })
    .add(() => {
      animateTitle.value = true
    }, '<')
    .to(
      afterTitleLine,
      {
        duration: 2,
        width: '14%'
      },
      '>+1'
    )
    .to(
      afterTitleLine,
      {
        opacity: '1'
      },
      '>-1'
    )
    .to(
      afterTitleLine,
      {
        duration: 2,
        width: '100%'
      },
      '>-0.2'
    )
    .add(() => {
      isFinishedMainAnimation.value = true
    }, '>')
}

onMounted(() => {
  animateSectionHeader()
})
</script>

<style lang="scss">
.m-aboutHeader {
  &__beforeTitleLine {
    display: flex;
    align-items: center;

    hr {
      width: 0;
    }
  }

  &__title span {
    font-size: var(--font-size-about-header);
    font-weight: 500;
    color: var(--about-primary-color);
  }

  &__afterTitleLine {
    display: flex;
    align-items: center;
    width: v-bind('`${initialAfterTitleLineLength}px`');

    hr {
      opacity: 0;
      width: 0;
    }
  }
}
</style>
