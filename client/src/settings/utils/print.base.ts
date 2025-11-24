export interface PrintDocumentOptions {
  title?: string;
  warning?: PrintWarning;
  mnemonic?: PrintMnemonicKey;
  customStyles?: string;
  customContent?: string;
  windowHeight?: number;
  windowWidth?: number;
  maxWidth?: number;
}

export interface PrintMnemonicKey {
  phrase: string;
  columns?: number;
  showNumbers?: boolean;
  qrcode?: boolean;
  fontSize?: number;
  gap?: number;
}

export interface PrintWarning {
  title: string;
  message: string;
  backgroundColor?: string;
  borderColor?: string;
}
