export type IconComponent = (props: IconProps) => JSX.Element;

export interface IconProps {
  name: string,
  size?: number,
  color?: string,
}
