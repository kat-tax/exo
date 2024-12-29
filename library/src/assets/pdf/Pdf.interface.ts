import type {PdfRendererViewPropsType} from 'react-native-pdf-renderer/dist/PdfRendererView';

export type PdfComponent = (props: PdfProps) => JSX.Element;

export interface PdfProps extends Omit<PdfRendererViewPropsType, 'source'> {
  /** URL of the PDF */
  url: string,
}
