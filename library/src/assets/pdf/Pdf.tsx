import type {PdfComponent} from './Pdf.interface';

/** A component that displays a PDF */
export const Pdf: PdfComponent = (props) => {
  return (
    <object
      data={`${props.url}#view=FitH&navpanes=0`}
      style={{height: '100%', width: '100%'}}
      type="application/pdf">
      <p>Download</p>
    </object>
  );
}
