import type {ColorSchemeName} from 'react-native';

let _manifest: Promise<typeof import('./icon-manifest.json')> | null = null;

async function getManifest() {
  if (!_manifest) {
    _manifest = import('./icon-manifest.json');
  }
  return (await _manifest);
}

export function importFont(name: string) {
  switch (name) {
    case './devopicons.woff2':
      return new URL('./devopicons.woff2', import.meta.url).href;
    case './file-icons.woff2':
      return new URL('./file-icons.woff2', import.meta.url).href;
    case './fontawesome.woff2':
      return new URL('./fontawesome.woff2', import.meta.url).href;
    case './mfixx.woff2':
      return new URL('./mfixx.woff2', import.meta.url).href;
    case './octicons.woff2':
      return new URL('./octicons.woff2', import.meta.url).href;
  }
}

export async function injectStyles() {
  const ext = await getManifest();
  const rules: string = ext.fonts.map((font) => {
    return `
      @font-face {
        src: url(${importFont(font.src[0].path)});
        font-family: ${font.id};
        font-weight: ${font.weight};
        font-style: ${font.style};
        font-size: ${font.size};
      }
    `;
  }).join('\n');

  const classes: string = Object.keys(ext.iconDefinitions).map((key: string) => {
    const icon = ext.iconDefinitions[key as keyof typeof ext.iconDefinitions];
    return `
      .icon.icon${key} {
        position: relative;
      }
      .icon.icon${key}::before {
        font-family: ${icon.fontId || 'inherit'};
        font-weight: ${'fontWeight' in icon ? icon.fontWeight : 'inherit'};
        font-size: ${'fontSize' in icon ? icon.fontSize : 'inherit'};
        content: "${icon.fontCharacter}";
        color: ${'fontColor' in icon ? icon.fontColor : 'inherit'};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }).join('\n');

  const style = document.createElement('style');
  style.innerHTML = rules + classes;
  document.head.appendChild(style);
}

export async function getIconClass(
  fileName: string,
  fileExtension: string,
  language: string,
  theme: ColorSchemeName,
) {
  const ext = await getManifest();
  // Default icons
  const defaultFileIcon = ext.file;

  // File icons (based on name)
  if (fileName && ext.fileNames[fileName as keyof typeof ext.fileNames]) {
    if (theme === 'light' && ext.light.fileNames[fileName as keyof typeof ext.light.fileNames])
      return ext.light.fileNames[fileName as keyof typeof ext.light.fileNames];
    if (ext.fileNames[fileName as keyof typeof ext.fileNames])
      return ext.fileNames[fileName as keyof typeof ext.fileNames];
  }

  // File icons (based on language)
  if (ext.languageIds[language as keyof typeof ext.languageIds]) {
    if (ext.languageIds[language as keyof typeof ext.languageIds])
      return ext.languageIds[language as keyof typeof ext.languageIds];
  }

  // File icons (based on extension)
  if (fileExtension && ext.fileExtensions[fileExtension as keyof typeof ext.fileExtensions]) {
    if (theme === 'light' && ext.light.fileExtensions[fileExtension as keyof typeof ext.light.fileExtensions])
      return ext.light.fileExtensions[fileExtension as keyof typeof ext.light.fileExtensions];
    if (ext.fileExtensions[fileExtension as keyof typeof ext.fileExtensions])
      return ext.fileExtensions[fileExtension as keyof typeof ext.fileExtensions];
  }

  return defaultFileIcon;
}

export async function getIcon(
  fileName: string,
  fileExtension: string,
  language: string,
  theme: ColorSchemeName,
) {
  const icon = await getIconClass(fileName, fileExtension, language, theme);
  return `icon icon${icon}`;
}
