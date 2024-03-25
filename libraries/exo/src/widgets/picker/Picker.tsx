// @ts-nocheck

// TODO: conform react native and web, they are very different

import {View} from 'react-native';
import * as P from '@radix-ui/react-select';
import type {PickerComponent, PickerProps, PickerItemProps} from './Picker.interface';
import './Picker.css';

/** A component that allows a selection of values */
export const Picker: PickerComponent = (props: PickerProps) => {
  return (
    <View style={[{alignItems: 'center'}]}>
      <PickerRoot/>
    </View>
  );
}

const PickerItem = (props: PickerItemProps) => (
  <P.Item
    {...props}
    className="PickerItem">
    <P.ItemText>{props.children}</P.ItemText>
    <P.ItemIndicator className="PickerItemIndicator" />
  </P.Item>
);


const PickerRoot = () => (
  <P.Root>
    <P.Trigger className="SelectTrigger" aria-label="Food">
      <P.Value placeholder="Select a fruit…" />
      <P.Icon className="SelectIcon">
        {/* <ChevronDownIcon/> */}
      </P.Icon>
    </P.Trigger>
    <P.Portal>
      <P.Content className="SelectContent">
        <P.ScrollUpButton className="SelectScrollButton">
          {/* <ChevronUpIcon/> */}
        </P.ScrollUpButton>
        <P.Viewport className="SelectViewport">
          <P.Group>
            <P.Label className="SelectLabel">Fruits</P.Label>
            <PickerItem value="apple">Apple</PickerItem>
            <PickerItem value="banana">Banana</PickerItem>
            <PickerItem value="blueberry">Blueberry</PickerItem>
            <PickerItem value="grapes">Grapes</PickerItem>
            <PickerItem value="pineapple">Pineapple</PickerItem>
          </P.Group>
          <P.Separator className="SelectSeparator" />
          <P.Group>
            <P.Label className="SelectLabel">Vegetables</P.Label>
            <PickerItem value="aubergine">Aubergine</PickerItem>
            <PickerItem value="broccoli">Broccoli</PickerItem>
            <PickerItem value="carrot" disabled>
              Carrot
            </PickerItem>
            <PickerItem value="courgette">Courgette</PickerItem>
            <PickerItem value="leek">Leek</PickerItem>
          </P.Group>
          <P.Separator className="SelectSeparator"/>
          <P.Group>
            <P.Label className="SelectLabel">Meat</P.Label>
            <PickerItem value="beef">Beef</PickerItem>
            <PickerItem value="chicken">Chicken</PickerItem>
            <PickerItem value="lamb">Lamb</PickerItem>
            <PickerItem value="pork">Pork</PickerItem>
          </P.Group>
        </P.Viewport>
        <P.ScrollDownButton className="SelectScrollButton">
          {/* <ChevronDownIcon/> */}
        </P.ScrollDownButton>
      </P.Content>
    </P.Portal>
  </P.Root>
);
