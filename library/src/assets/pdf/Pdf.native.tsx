// @ts-ignore
import PdfRendererView from 'react-native-pdf-renderer';
import type {PdfComponent} from './Pdf.interface';

export const Pdf: PdfComponent = (props) => {
  return (
    <PdfRendererView
      source={props.url}
      {...props}
    />
  );
}
