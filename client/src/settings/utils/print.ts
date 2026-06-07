import QRCode from 'qrcode';
import type {PrintDocumentOptions} from './print.base';

/**
 * Opens a print dialog to print a document
 * @param options - Configuration options for printing the document
 */
export async function printDocument({
  title,
  warning,
  mnemonic,
  customContent = '',
  customStyles = '',
  windowWidth = 800,
  windowHeight = 600,
  maxWidth = 800,
}: PrintDocumentOptions): Promise<void> {
  // Only available in browser environment
  if (typeof window === 'undefined') return;

  // Create a temporary window for printing
  const printWindow = window.open('', '', `width=${windowWidth},height=${windowHeight}`);
  if (!printWindow) return;

  const titleHtml = title ? `<h1>${title}</h1>` : '';

  const warningHtml = warning ? `
    <div class="warning">
      <strong>${warning.title}</strong>
      <p>${warning.message}</p>
    </div>
  ` : '';

  const warningStyles = warning ? `
    .warning {
      background: ${warning.backgroundColor ?? '#fef2f2'};
      border: 2px solid ${warning.borderColor ?? '#dc2626'};
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
  ` : '';

  // Generate mnemonic words HTML if mnemonic is provided
  let contentHtml = customContent;
  let mnemonicStyles = '';

  if (mnemonic) {
    const words = mnemonic.phrase.split(' ');
    const columns = mnemonic.columns ?? (words.length <= 12 ? 3 : 4);
    const showNumbers = mnemonic.showNumbers ?? true;
    const includeQRCode = mnemonic.qrcode ?? false;
    const fontSize = mnemonic.fontSize ?? 16;
    const gap = mnemonic.gap ?? 20;

    const wordsHtml = words
      .map((word, index) => {
        const number = showNumbers ? `${index + 1}. ` : '';
        return `<div class="word-item">${number}${word}</div>`;
      })
      .join('');

    let qrcodeHtml = '';
    if (includeQRCode) {
      try {
        // Generate QR code as SVG string
        const qrSvg = await QRCode.toString(mnemonic.phrase, {
          type: 'svg',
          width: 300,
          margin: 2,
          errorCorrectionLevel: 'L',
        });
        qrcodeHtml = `
          <div class="qrcode-container">
            ${qrSvg}
          </div>
        `;
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    }

    contentHtml = includeQRCode ? `
      <div class="mnemonic-layout">
        ${qrcodeHtml}
        <div class="words">
          ${wordsHtml}
        </div>
      </div>
    ` : `
      <div class="words">
        ${wordsHtml}
      </div>
    `;

    mnemonicStyles = includeQRCode ? `
      .mnemonic-layout {
        display: flex;
        gap: 24px;
        align-items: flex-start;
        padding: 20px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        margin-bottom: 24px;
      }
      .qrcode-container {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .qrcode-container svg {
        width: 300px;
        height: 300px;
      }
      .words {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: ${gap}px;
        padding: 0;
        height: 300px;
        align-content: center;
      }
      .word-item {
        flex: 0 0 auto;
        text-align: left;
        font-size: ${fontSize}px;
        line-height: 1.2;
      }
    ` : `
      .words {
        display: flex;
        flex-wrap: wrap;
        gap: ${gap}px;
        padding: 20px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        margin-bottom: 24px;
      }
      .word-item {
        flex: 1 0 ${100 / columns}%;
        text-align: left;
        font-size: ${fontSize}px;
        padding: 8px;
      }
    `;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${title ?? 'Print Document'}</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 40px;
            max-width: ${maxWidth}px;
            margin: 0 auto;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
          ${warningStyles}
          ${mnemonicStyles}
          @media print {
            body { padding: 20px; }
          }
          ${customStyles}
        </style>
      </head>
      <body>
        ${titleHtml}
        ${warningHtml}
        ${contentHtml}
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
