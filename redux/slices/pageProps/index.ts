import { Resources } from '../../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from '../../../constants/slicer.constant';
import { RootResources } from '../../../types/services/root';

const initialState: Resources.PageTypes & { sliders?: RootResources.getSliderTypes.data[] } = {
  description: '',
  haveSlider: false,
  keywords: '',
  sections: [],
  slug: '',
  title: '',
  sliders: [],
};

export const pagePropsSlice = createSlice({
  name: PageProps,
  initialState,
  reducers: {
    setPageProps: (
      state,
      action: PayloadAction<Resources.PageTypes & { sliders: RootResources.getSliderTypes.data[] }>,
    ) => {
      state = action.payload;
    },
    setCertainPageProps: (
      state,
      action: PayloadAction<
        Resources.PageTypes & { sliders?: RootResources.getSliderTypes.data[] }
      >,
    ) => {
      state = { ...state, ...action.payload };
    },
    setSliders: (state, action: PayloadAction<RootResources.getSliderTypes.data[]>) => {
      state.sliders = action.payload;
    },
  },
});

export const { setPageProps, setCertainPageProps, setSliders } = pagePropsSlice.actions;
export default pagePropsSlice.reducer;
