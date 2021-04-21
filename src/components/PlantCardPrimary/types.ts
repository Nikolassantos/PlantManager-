import { RectButtonProps } from 'react-native-gesture-handler';

export interface IPlantCardPrimary extends RectButtonProps {
  data: IDataProps;
}

interface IDataProps {
  name: string;
  photo: string;
}
