<script setup lang="ts">
import type { Stage } from '~/store/stages/stages.types';
import { useStagesStore } from '@/store/stages';

defineProps<{ items: Stage[] }>();

const { stagesState, stagesActions } = useStagesStore();

stagesActions.setTotalBestResult(0);
</script>

<template>
  <ul class="stages-list">
    <li v-for="(stage, index) in items" :key="stage.id" class="stages-list__stage">
      <div class="stages-list__stage-games">
        <div v-for="game in stage.games" :key="game.name" class="stages-list__stage-game">
          <div
            class="stages-list__stage-game-progress"
            :style="{ width: `${game.limitGameResult ? (100 / game.limitGameResult) * game.bestResult : 0}%` }"
          ></div>
        </div>
      </div>

      <div class="stages-list__stage-icon">
        <IcFinish
          v-if="index === (stagesState.stages && stagesState.stages?.length - 1)"
          :font-controlled="false"
          :filled="true"
        />
        <IcStarSolid
          v-else-if="
            stagesState.totalBestResult &&
            stagesState.totalBestResult >= stage.thresholdPoints &&
            index !== (stagesState.stages && stagesState.stages?.length - 1)
          "
          :font-controlled="false"
          :filled="true"
        />
        <IcStarOutline v-else :font-controlled="false" :filled="true" />
      </div>

      <div v-if="stage.isCurrent" class="stages-list__stage-text">
        {{ `${stagesState.totalBestResult} / ${stage.thresholdPoints}` }}
      </div>
      <div v-else class="stages-list__stage-text">
        {{ stage.thresholdPoints }}
      </div>
      <div v-if="stage.isFirstStage" class="stages-list__stage-text stages-list__stage-text--left">0</div>
    </li>
  </ul>
</template>

<style lang="scss">
.stages-list {
  display: flex;
  padding: 30px 2%;

  &__stage {
    position: relative;
    flex: 1 1 auto;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    padding-top: 4.4296788%;

    &:first-child {
      .stages-list__stage-games {
        border-radius: 30px 0 0 30px;
        overflow: hidden;
      }
    }
    &:last-child {
      padding-right: 4.64%;
      border-right: none;

      .stages-list__stage-games {
        border-radius: 0 30px 30px 0;
        overflow: hidden;
      }
      .stages-list__stage-icon {
        transform: translate(20%, -100%);
        svg {
          width: 29px;

          @include media(550px) {
            width: 46px;
          }
        }
      }
      .stages-list__stage-text {
        transform: translate(0, 100%);
      }
    }
  }

  &__stage-games {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: rgba(239, 239, 239, 0.6);
  }

  &__stage-game {
    flex: 1 1 auto;
    height: inherit;
  }

  &__stage-game-progress {
    width: 0;
    height: 100%;
    background: #30f;
  }

  &__stage-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -100%);
    svg {
      width: 16px;
      height: 16px;
    }
    @include media(400px) {
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__stage-text {
    position: absolute;
    bottom: -13px;
    right: 0;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.14px;
    color: #000;
    transform: translate(50%, 100%);

    @include media(400px) {
      font-size: 10px;
    }
    @include media(550px) {
      font-size: 12px;
    }
    @include media(650px) {
      font-size: 14px;
    }
  }
  &__stage-text--left {
    left: 0;
    right: auto;
    transform: translate(0%, 100%);
  }
}
</style>
