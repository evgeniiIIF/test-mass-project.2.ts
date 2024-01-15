import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { axiosInstance } from '../../axios/axios';
import type { Stage, StagesState } from './stages.types';

const DEFAULT_STATE: Partial<StagesState> = {};

export const stagesStore = defineStore('stagesStore', () => {
  const state = ref(DEFAULT_STATE);

  watch(
    () => state.value.totalBestResult,
    () => {
      updateStages();
    },
  );

  const setStages = (data: StagesState['stages']) => {
    state.value.stages = data;
  };

  const setStagesOriginal = (data: StagesState['stages']) => {
    state.value.stagesOriginal = data;
  };

  const setTotalBestResult = (initResult: number = 0) => {
    state.value.totalBestResult = initResult < 0 ? 0 : initResult;
  };

  const updateStages = () => {
    const currentStageIndex: number = getCurrentStageIndex();
    updateBestResult(currentStageIndex);
    const totalBestResult = getTotalBestResult();
    setTotalBestResult(totalBestResult);
  };

  const getCurrentStageIndex = () => {
    const initResult = state.value.totalBestResult ?? 0;

    const currentStageIndex = state.value.stages?.findIndex((stage, stageIndex, stages) => {
      const prevStage = stages[stageIndex - 1] ?? { thresholdPoints: 0 };

      return (
        (initResult > prevStage.thresholdPoints && initResult < stage.thresholdPoints) ||
        stage.thresholdPoints === initResult
      );
    });

    return currentStageIndex ?? 0;
  };

  const updateBestResult = (currentStageIndex: number) => {
    const newStages: StagesState['stages'] = JSON.parse(JSON.stringify(state.value.stagesOriginal));

    let i = -1;

    while (i < currentStageIndex) {
      i += 1;
      let currentResult = state.value.totalBestResult ?? 0;

      const currentStage = newStages[i] ?? { thresholdPoints: 0, games: [] };
      const prevStage = newStages[i - 1] ?? { thresholdPoints: 0, games: [] };

      const gameThresholdPoints =
        (currentStage.thresholdPoints - prevStage.thresholdPoints) / currentStage.games.length;

      prevStage.isCurrent = false;
      currentResult -= prevStage.thresholdPoints;

      const newStage = {
        ...currentStage,
        isCurrent: true,
        games: currentStage.games.map((game) => {
          let newBestResult;

          if (currentResult > gameThresholdPoints) {
            newBestResult = gameThresholdPoints;
            currentResult -= gameThresholdPoints;
          } else {
            newBestResult = currentResult;
            currentResult -= currentResult;
          }

          return {
            ...game,
            bestResult: newBestResult,
            isPlayed: newBestResult === gameThresholdPoints,
            limitGameResult: gameThresholdPoints,
          };
        }),
      };

      newStages[i] = newStage;
    }

    setStages(newStages);
  };

  const getTotalBestResult = () => {
    return state.value.stages?.reduce((stagesAcc: number, stage: Stage) => {
      const currentStageGameResult = stage.games.reduce((gamesAcc, game) => {
        return gamesAcc + game.bestResult;
      }, 0);

      return stagesAcc + currentStageGameResult;
    }, 0);
  };

  const fetchStages = async () => {
    // const { data, status } = await useFetch('/api/stages/get');

    try {
      const response = await axiosInstance.get('/api/stages/get');
      const stages = response.data.stages;

      if (stages) {
        setStages(stages);
        setStagesOriginal(stages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    state,
    actions: {
      setTotalBestResult,
    },
    effects: {
      fetchStages,
    },
  };
});
