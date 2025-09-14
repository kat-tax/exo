import {Icon as RNIcon} from 'react-exo/icon';
import {withUnistyles} from 'react-native-unistyles';
import {useMemo, cloneElement} from 'react';

const IconThemed = withUnistyles(RNIcon, (theme) => ({
  color: theme.colors.foreground,
}));

const Icon = ({style, ...props}) => {
  const styles = useMemo(() => merge(style), [style]);
  return (
    <IconThemed
      {...props}
      {...styles}
    />
  );
}

Icon.New = (icon, styles) => {
  if (!icon) return null;
  return cloneElement(icon, merge(styles));
}

function merge(props) {
  if (!props || typeof props !== 'object') return {};
  const icon = {};
  Object.values(props)?.forEach(i => {
    if (i && typeof i === 'object') {
      if ('color' in i) icon.color = i.color;
      if ('size' in i) icon.size = i.size;
      if ('name' in i) icon.name = i.name;
    }
  });
  return icon;
}

export {Icon};
