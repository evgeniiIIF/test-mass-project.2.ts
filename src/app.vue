<script setup>
import { useStagesStore } from './store/stages';

const { stagesState, stagesEffects, stagesActions } = useStagesStore();

await useAsyncData('stages', async () => {
  await Promise.all([stagesEffects.fetchStages()]);
});

const stagesItems = computed(() => {
  return stagesState.value.stages;
});
const setTotalBestResult = (e) => {
  stagesActions.setTotalBestResult(Number(e));
};

const incrementTotalBestResult = () => {
  const newTotalBestResult = stagesState.value.totalBestResult + 5;
  stagesActions.setTotalBestResult(newTotalBestResult);
};

const decrementTotalBestResult = () => {
  const newTotalBestResult = stagesState.value.totalBestResult - 5;
  stagesActions.setTotalBestResult(newTotalBestResult);
};
</script>

<template>
  <NuxtLayout name="app-layout">
    <div class="app">
      <div class="app__stages">
        <AppStagesList :items="stagesItems" />
      </div>

      <div class="app__controls">
        <div class="app__buttons">
          <button type="button" class="button button--left" @click="decrementTotalBestResult">-</button>
          <button type="button" class="button button--right" @click="incrementTotalBestResult">+</button>
        </div>

        <label class="input">
          <p class="input__label"></p>
          <input
            class="input__input"
            type="number"
            :value="stagesState.totalBestResult"
            step="5"
            maxlength="4"
            max="1000"
            min="0"
            @input="setTotalBestResult($event.target.value)"
          />
        </label>

        <label class="input input--range">
          <p class="input__label"></p>
          <input
            class="input__input input__input--range"
            type="range"
            name="volume"
            step="5"
            min="0"
            max="1000"
            :value="stagesState.totalBestResult"
            @input="setTotalBestResult($event.target.value)"
          />
        </label>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.app {
  &__stages {
    padding: 83px 0;
  }

  &__controls {
    max-width: 600px;
    padding: 30px 20px;
    @include mb(30px);
  }

  &__buttons {
    display: flex;
    @include mr(4px);
    width: 160px;
  }
}

.input {
  display: block;

  &--range {
    padding: 0;
    .input__input {
      max-width: 400px;
      padding: 8px 0;
    }
  }

  &__label {
  }

  &__input {
    width: 100%;
    max-width: 300px;
    padding: 8px;
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    outline: none;
    color: #262626;
    transition: $transition-1;

    @include hover {
      border-color: #262626;
      cursor: pointer;
    }
  }
}

.button {
  width: 100%;
  padding: 8px;
  border: 1px solid #d6d6d6;
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  color: #262626;
  background: rgba(239, 239, 239, 0.6);
  box-shadow: inset 0 0 0 2px hsla(0, 0%, 100%, 0);
  cursor: pointer;
  transition: $transition-1;

  @include hover {
    background: #30f;
    color: #fff;
  }

  &--left {
    border-radius: 30px 0px 0px 30px;
  }
  &--right {
    border-radius: 0px 30px 30px 0;
  }
}
</style>
