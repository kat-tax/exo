import {Icon as RNIcon} from 'react-exo/icon';
import {withUnistyles} from 'react-native-unistyles';

export const Icon = withUnistyles(RNIcon, (theme) => ({
  color: theme.colors.foreground,
}));

export const IconRemote = (props: {
  size: `${number}%` | number;
  color: string;
  name: string;
}) => {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        color: props.color,
        backgroundColor: props.color,
        mask: `url(${`https://api.iconify.design/${props.name.replace(':', '/')}.svg`})`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  );
};
