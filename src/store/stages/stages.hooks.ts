import { storeToRefs } from 'pinia';
import { stagesStore } from './stages';

export const useStagesStore = () => {
  const { actions, effects } = stagesStore();
  const { state } = storeToRefs(stagesStore());

  return {
    stagesState: state,
    stagesActions: actions,
    stagesEffects: effects,
  };
};
