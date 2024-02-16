export interface RadioGroupProps {
  /**
   * The initial value of the selected radio button
   */
  initialValue?: string;
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onValueChange?: (value?: string) => void;
  /**
   * The accessibility label for the group
   */
  label?: string;
  /**
   * The radio groups' test identifier
   */
  testID?: string;
  /**
   * The radio group buttons
   */
  children?: React.ReactNode;
}
