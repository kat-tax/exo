import {useCallback, useMemo, useRef} from 'react';
import type {useCodeScanner as _, CodeScannerFrame, Code} from 'react-native-vision-camera';

export const useCodeScanner: typeof _ = (codeScanner) => {
  const {onCodeScanned, ...codeScannerOptions} = codeScanner;
  const ref = useRef(onCodeScanned);
  ref.current = onCodeScanned;

  const callback = useCallback((codes: Code[], frame: CodeScannerFrame) => {
    ref.current(codes, frame);
  }, []);

  return useMemo(
    () => ({
      ...codeScannerOptions,
      onCodeScanned: callback,
    }),
    [JSON.stringify(codeScannerOptions), callback],
  );
}
