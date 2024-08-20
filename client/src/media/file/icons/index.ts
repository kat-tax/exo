import ext from './icon-manifest.json';

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

export function injectStyles() {
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
    const icon = ext.iconDefinitions[key];
    return `
      .icon.icon${key}::before {
        font-family: ${icon.fontId || 'inherit'};
        font-weight: ${icon.fontWeight || 'inherit'};
        font-size: ${icon.fontSize || 'inherit'};
        content: "${icon.fontCharacter}";
        color: ${icon.fontColor || 'inherit'};
      }
    `;
  }).join('\n');

  const style = document.createElement('style');
  style.innerHTML = rules + classes;
  document.head.appendChild(style);
}

export function getIconClass(
  fileName: string,
  fileExtension: string,
  language: string,
  theme: 'light' | 'dark',
) {

  // Default icons
  const defaultFileIcon = ext.file;

  // File icons (based on name)
  if (fileName && ext.fileNames[fileName]) {
    if (theme === 'light' && ext.light.fileNames[fileName])
      return ext.light.fileNames[fileName];
    if (ext.fileNames[fileName])
      return ext.fileNames[fileName];
  }

  // File icons (based on language)
  if (ext.languageIds[language]) {
    if (theme === 'light' && ext.light.languageIds[language])
      return ext.light.languageIds[language];
    if (ext.languageIds[language])
      return ext.languageIds[language];
  }

  // File icons (based on extension)
  if (fileExtension && ext.fileExtensions[fileExtension]) {
    if (theme === 'light' && ext.light.fileExtensions[fileExtension])
      return ext.light.fileExtensions[fileExtension];
    if (ext.fileExtensions[fileExtension])
      return ext.fileExtensions[fileExtension];
  }

  return defaultFileIcon;
}

export function getIcon(
  fileName: string,
  fileExtension: string,
  language: string,
  theme: 'light' | 'dark',
) {
  const icon = getIconClass(fileName, fileExtension, language, theme);
  return `icon icon${icon}`;
}
