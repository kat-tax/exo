export interface TouchProps extends React.PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: multiple ref types
  refs?: any;
  onPress?: () => void;
  onDoublePress?: () => void;
}
