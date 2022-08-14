<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="modal-backdrop" v-if="modelValue">
        <div class="modal">
          <div class="modal-title">
            <slot name="title" />
          </div>
          <div class="modal-content">
            <slot name="content" />
          </div>
          <div class="modal-actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<style lang="sass">
.modal-backdrop
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 100
  display: flex
  align-items: center
  justify-content: center
.modal
  background-color: #333
  border-radius: 4px
  width: min(95vw, 512px)
  border: 1px solid rgba(255,255,255,.05)
  color: #fff
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
  .modal-title
    font-size: 1.25rem
    font-weight: 700
    padding: 16px
    padding-bottom: 0
  .modal-content
    padding: 16px
    line-height: 1.5
    img
      max-width: 70%
      display: block
      margin: 0 auto
  .modal-actions
    padding: 8px 16px
    display: flex
    justify-content: flex-end
    background-color: rgba(0,0,0,.05)
    border-radius: 0 0 4px 4px
    gap: 16px
    .spacer
      flex: 1
    .modal-action
      background-color: rgba(255,255,255,.05)
      padding: 8px 16px
      min-width: 100px
      text-align: center
      border-radius: 6px
      border: 1px solid rgba(255,255,255,.05)
      box-shadow: 0 2.5px 2.5px 0 rgba(0, 0, 0, 0.1)
      cursor: pointer
      &:hover
        background-color: rgba(255,255,255,.15)
      &:active
        background-color: rgba(255,255,255,.2)
        box-shadow: 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.1)
      &.primary
        background-color: #015db5
        &:hover
          background-color: #01509c
        &:active
          background-color: #01396e
      &.danger
        background-color: #d32f2f
        &:hover
          background-color: #b71c1c
        &:active
          background-color: #8e0000
.modal-enter-active, .modal-leave-active
  transition: opacity 0.3s
.modal-enter, .modal-leave-to
  opacity: 0
</style>
<script>
export default {
  name: "Modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>