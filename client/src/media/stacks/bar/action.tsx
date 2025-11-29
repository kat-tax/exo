import {Motion} from 'react-exo/motion';
import {View} from 'react-native';
import {useState} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {MenuDropdown} from 'app/ui/float';
import {ButtonIcon} from 'app/ui/button/icon';

import type {MenuDropdownItem} from 'app/ui/float/menu-dropdown';

const ICON_SIZE = __TOUCH__ ? 18 : 16;

export interface BarActionProps {
  id: string,
  icon: string,
  items?: Array<MenuDropdownItem | undefined | false>,
  onPress?: () => void,
}

export function BarAction(props: BarActionProps) {
  const [open, setOpen] = useState(false);
  const {ref, focused} = useFocusable({
    focusKey: `bar@%action-${props.id}%`,
    onEnterPress: () => {
      if (props.items) {
        setOpen(true);
      } else {
        props.onPress?.();
      }
    },
  });

  const button = props.items ? (
    <Motion.View
      ref={ref}
      initial={{rotate: '0deg'}}
      animate={{rotate: open ? '45deg' : '0deg'}}
      transition={{type: 'spring', speed: 100}}>
      <ButtonIcon
        icon={props.icon}
        size={ICON_SIZE}
        state={focused ? 'Focused' : 'Default'}
      />
    </Motion.View>
  ) : (
    <View ref={ref}>
      <ButtonIcon
        icon={props.icon}
        size={ICON_SIZE}
        state={focused ? 'Focused' : 'Default'}
        onPress={props.onPress}
      />
    </View>
  );

  if (props.items) {
    return (
      <MenuDropdown
        open={open}
        label={props.id}
        onOpenChange={setOpen}
        items={props.items}>
        {button}
      </MenuDropdown>
    );
  }

  return button;
}
