export type IconComponent = (props: IconProps) => JSX.Element;

export interface IconProps {
  /** The name of the icon to display */
  name: string,
  /** The size of the icon */
  size?: number,
  /** The color of the icon */
  color?: string,
}
