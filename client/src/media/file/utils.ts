import {FS, isTextFile} from 'react-exo/fs';
import {fetchIpfs} from 'media/utils/ipfs';
import {FileType} from 'media/file/types';
import {toText} from 'app/utils/formatting';

import type {
  FileData,
  FileFormat,
  FileProtocol,
  FileTransfer,
  FileRenderInfo,
} from 'media/file/types';

export async function getData<T extends FileFormat>(
  path: string,
  format: T,
  type?: string,
): Promise<FileData<T> | undefined> {
  const protocol = getProtocol(path);
  const $ = await getTransfer(path, protocol);

  // Remote (fetch)
  if ($ instanceof Response) {
    switch (format) {
      case 'arrayBuffer':
        return await $.arrayBuffer() as FileData<T>;
      case 'dataUrl':
        if (protocol === 'http' || protocol === 'https')
          return path as FileData<T>;
        return URL.createObjectURL(await $.blob()) as FileData<T>;
      case 'blob':
        return await $.blob() as FileData<T>;
      case 'text':
        return await $.text() as FileData<T>;
      case 'json':
        return await $.json() as FileData<T>;
      default:
        return format satisfies never;
    }
  }

  // Local (humanfs)
  switch (format) {
    case 'arrayBuffer':
      return $?.buffer as FileData<T>;
    case 'dataUrl':
      return $ ? URL.createObjectURL(new Blob([$], {type})) as FileData<T> : undefined;
    case 'blob':
      return $ ? new Blob([$], {type}) as FileData<T> : undefined;
    case 'text':
      return $ ? toText($) as FileData<T> : undefined;
    case 'json':
      return $ ? JSON.parse(toText($)) as FileData<T> : undefined;
    default:
      return format satisfies never;
  }
}

export async function getTransfer(
  path: string,
  protocol: FileProtocol,
): Promise<FileTransfer | undefined> {
  switch (protocol) {
    case 'fs':
      return (await FS.init()).bytes?.(path);
    case 'ipfs':
      return fetchIpfs(path);
    case 'http':
    case 'https':
      return fetch(path);
    default: protocol satisfies never;
  }
}

export function getProtocol(path: string): FileProtocol {
  let protocol: FileProtocol = 'fs';
  try {protocol = new URL(path).protocol.slice(0, -1) as FileProtocol} catch (e) {}
  return protocol;
}

export function getRenderer(
  extension: string,
): FileRenderInfo {
  switch (extension) {
    // Archives
    case 'zip':
      return [FileType.Zip, {}];
    // Torrents
    case 'torrent':
      return [FileType.Torrent, {}];
    // Models
    case 'glb':
    case 'gltf':
      return [FileType.Model, {}];
    // Animations
    case 'lottie':
      return [FileType.Lottie, {}];
    case 'riv':
      return [FileType.Rive, {}];
    // Videos
    case 'mp4':
    case 'm4v':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'wmv':
    case 'flv':
    case 'vob':
    case 'ogv':
    case 'ogg':
    case 'drc':
    case 'webm':
    case 'm3u8':
      return [FileType.Video, {}];
    // Images
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'ico':
    case 'tiff':
    case 'webp':
    case 'avif':
    case 'heic':
    case 'heif':
    case 'svg':
    case 'raw':
      return [FileType.Image, {}];
    // Audio
    case 'mp3':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'm4a':
    case 'opus':
    case 'amr':
    case 'wma':
    case 'aiff':
      return [FileType.Audio, {}];
    // Maps
    case 'geojson':
      return [FileType.Map, {}];
    // Documents
    case 'pdf':
      return [FileType.Pdf, {}];
    case 'typ':
      return [FileType.Typst, {}];
    case 'md':
    case 'markdown':
    case 'mkd':
    case 'mkdn':
    case 'mkdown':
    case 'mdx':
    case 'ron':
      return [FileType.Markdown, {}];
    // Books
    case 'epub':
      return [FileType.Book, {continuous: true}];
    // Roms
    case 'n64':
    case 'v64':
    case 'z64':
      return [FileType.Game, {platform: 'n64'}];
    case 'gb':
    case 'gbc':
      return [FileType.Game, {platform: 'gb'}];
    case 'gba':
      return [FileType.Game, {platform: 'gba'}];
    case 'nds':
      return [FileType.Game, {platform: 'nds'}];
    case 'nes':
      return [FileType.Game, {platform: 'nes'}];
    case 'sfc':
    case 'smc':
      return [FileType.Game, {platform: 'snes'}];
    case 'psx':
      return [FileType.Game, {platform: 'psx'}];
    case 'gen':
    case 'smd':
      return [FileType.Game, {platform: 'segaMD'}];
    case 'sms':
      return [FileType.Game, {platform: 'segaMS'}];
    case 'gg':
      return [FileType.Game, {platform: 'segaGG'}];
    case 'scd':
      return [FileType.Game, {platform: 'segaCD'}];
    case '32x':
      return [FileType.Game, {platform: 'sega32x'}];
    case 'sat':
      return [FileType.Game, {platform: 'segaSaturn'}];
    case 'a78':
      return [FileType.Game, {platform: 'atari7800'}];
    case 'a26':
      return [FileType.Game, {platform: 'atari2600'}];
    case 'jag':
    case 'j64':
      return [FileType.Game, {platform: 'jaguar'}];
    case 'lnx':
      return [FileType.Game, {platform: 'lynx'}];
    case 'pce':
      return [FileType.Game, {platform: 'pce'}];
    case 'pcfx':
      return [FileType.Game, {platform: 'pcfx'}];
    case 'ngp':
      return [FileType.Game, {platform: 'ngp'}];
    case 'vb':
      return [FileType.Game, {platform: 'vb'}];
    case 'ws':
    case 'wsc':
      return [FileType.Game, {platform: 'ws'}];
    case 'col':
      return [FileType.Game, {platform: 'coleco'}];
    case 'd64':
    case 't64':
    case 'prg':
      return [FileType.Game, {platform: 'vice_x64'}];
    // Texts
    case 'txt':
      return [FileType.Text, {language: 'text'}];
    case 'abap':
      return [FileType.Text, {language: 'abap'}];
    case 'apl':
    case 'dyalog':
      return [FileType.Text, {language: 'apl'}];
    case 'applescript':
    case 'scpt':
      return [FileType.Text, {language: 'applescript'}];
    case 'asciidoc':
    case 'adoc':
      return [FileType.Text, {language: 'asciidoc'}];
    case 'ps1':
    case 'psm1':
    case 'psd1':
      return [FileType.Text, {language: 'powershell'}];
    case 'bat':
    case 'cmd':
      return [FileType.Text, {language: 'batch'}];
    case 'sh':
    case 'bash':
    case 'bats':
    case 'command':
    case 'ksh':
    case 'cgi':
    case 'fcgi':
    case 'sh.in':
    case 'tmux':
    case 'tool':
    case 'zsh':
      return [FileType.Text, {language: 'shell'}];
    case 'sh-session':
      return [FileType.Text, {language: 'shellsession'}];
    case 'c':
    case 'cats':
    case 'idc':
    case 'w':
      return [FileType.Text, {language: 'c'}];
    case 'c++':
    case 'cpp':
    case 'cc':
    case 'cp':
    case 'cxx':
    case 'hh':
    case 'h++':
    case 'hpp':
    case 'hxx':
    case 'inl':
    case 'ipp':
    case 'tcc':
    case 'tpp':
      return [FileType.Text, {language: 'c++'}];
    case 'cshtml':
    case 'csx':
      return [FileType.Text, {language: 'c#'}];
    case 'h':
      return [FileType.Text, {language: 'objective-c'}];
    case 'cs':
    case 'st':
      return [FileType.Text, {language: 'smalltalk'}];
    case 'bas':
    case 'frm':
    case 'frx':
    case 'vba':
    case 'vbs':
    case 'vbhtml':
      return [FileType.Text, {language: 'vb'}];
    case 'cmake':
    case 'cmake.in':
      return [FileType.Text, {language: 'cmake'}];
    case 'cob':
    case 'cbl':
    case 'ccp':
    case 'cpy':
      return [FileType.Text, {language: 'cobol'}];
    case 'css':
      return [FileType.Text, {language: 'css'}];
    case 'csv':
      return [FileType.Text, {language: 'csv'}];
    case 'clj':
    case 'boot':
    case 'cl2':
    case 'cljc':
    case 'cljs':
    case 'cljs.hl':
    case 'cljscm':
    case 'cljx':
    case 'hic':
      return [FileType.Text, {language: 'clojure'}];
    case 'jsx':
      return [FileType.Text, {language: 'jsx'}];
    case 'tsx':
      return [FileType.Text, {language: 'tsx'}];
    case 'js':
    case 'mjs':
    case '_js':
    case 'es6':
    case 'es':
    case 'gs':
    case 'frag':
    case 'jake':
    case 'jsb':
    case 'jscad':
    case 'jsfl':
    case 'jsm':
    case 'jss':
    case 'njs':
    case 'pac':
    case 'sjs':
    case 'ssjs':
    case 'bones':
    case 'sublime-build':
    case 'sublime-commands':
    case 'sublime-completions':
    case 'sublime-keymap':
    case 'sublime-macro':
    case 'sublime-menu':
    case 'sublime-mousemap':
    case 'sublime-project':
    case 'sublime-settings':
    case 'sublime-theme':
    case 'sublime-workspace':
    case 'sublime_metrics':
    case 'sublime_session':
    case 'xsjs':
    case 'xsjslib':
      return [FileType.Text, {language: 'javascript'}];
    case 'ts':
    case 'mts':
      return [FileType.Text, {language: 'typescript'}];
    case 'coffee':
    case '_coffee':
    case 'cjsx':
    case 'cson':
    case 'iced':
    case 'cake':
      return [FileType.Text, {language: 'coffeescript'}];
    case 'lua':
    case 'nse':
    case 'pd_lua':
    case 'rbxs':
    case 'wlua':
      return [FileType.Text, {language: 'lua'}];
    case 'lisp':
    case 'lsp':
    case 'asd':
    case 'cl':
    case 'l':
    case 'ny':
    case 'podsl':
    case 'sexp':
      return [FileType.Text, {language: 'lisp'}];
    case 'rb':
    case 'builder':
    case 'gemspec':
    case 'god':
    case 'irbrc':
    case 'jbuilder':
    case 'mspec':
    case 'podspec':
    case 'rabl':
    case 'rake':
    case 'rbuild':
    case 'rbw':
    case 'rbx':
    case 'ru':
    case 'ruby':
    case 'thor':
    case 'watchr':
      return [FileType.Text, {language: 'ruby'}];
    case 'tex':
    case 'aux':
    case 'bbx':
    case 'bib':
    case 'cbx':
    case 'dtx':
    case 'ins':
    case 'lbx':
    case 'ltx':
    case 'mkii':
    case 'mkiv':
    case 'mkvi':
      return [FileType.Text, {language: 'tex'}];
    case 'vhdl':
    case 'vhd':
    case 'vhf':
    case 'vhi':
    case 'vho':
    case 'vhs':
    case 'vht':
    case 'vhw':
      return [FileType.Text, {language: 'vhdl'}];
    case 'matlab':
      return [FileType.Text, {language: 'matlab'}];
    case 'do':
    case 'ado':
    case 'doh':
    case 'ihlp':
    case 'mata':
    case 'matah':
    case 'sthlp':
      return [FileType.Text, {language: 'stata'}];
    case 'jl':
    case 'julia':
      return [FileType.Text, {language: 'julia'}];
    case 'ml':
    case 'eliom':
    case 'eliomi':
    case 'ml4':
    case 'mli':
    case 'mll':
    case 'mly':
      return [FileType.Text, {language: 'ocaml'}];
    case 'java':
      return [FileType.Text, {language: 'java'}];
    case 'kt':
    case 'ktm':
    case 'kts':
      return [FileType.Text, {language: 'kotlin'}];
    case 'coq':
      return [FileType.Text, {language: 'coq'}];
    case 'v':
      return [FileType.Text, {language: 'verilog'}];
    case 'd':
      return [FileType.Text, {language: 'makefile'}];
    case 'di':
      return [FileType.Text, {language: 'd'}];
    case 'dart':
      return [FileType.Text, {language: 'dart'}];
    case 'diff':
    case 'patch':
      return [FileType.Text, {language: 'diff'}];
    case 'dockerfile':
      return [FileType.Text, {language: 'dockerfile'}];
    case 'py':
    case 'bzl':
    case 'gyp':
    case 'lmi':
    case 'pyde':
    case 'pyp':
    case 'pyt':
    case 'pyw':
    case 'rpy':
    case 'tac':
    case 'wsgi':
    case 'xpy':
    case 'numpy':
    case 'numpyw':
    case 'numsc':
      return [FileType.Text, {language: 'python'}];
    case 'pas':
    case 'dpr':
    case 'lpr':
    case 'dfm':
      return [FileType.Text, {language: 'pascal'}];
    case '6pl':
    case '6pm':
    case 'nqp':
    case 'p6':
    case 'p6l':
    case 'p6m':
    case 'perl':
    case 'ph':
    case 'pl6':
    case 'plx':
    case 'pm':
    case 'pm6':
    case 'pod':
    case 'psgi':
      return [FileType.Text, {language: 'perl'}];
    case 'elm':
      return [FileType.Text, {language: 'elm'}];
    case 'el':
    case 'emacs':
    case 'emacs.desktop':
      return [FileType.Text, {language: 'emacs-lisp'}];
      case 'erl':
    case 'hrl':
    case 'xrl':
    case 'yrl':
    case 'escript':
      return [FileType.Text, {language: 'erlang'}];
    case 'erb':
    case 'erb.deface':
      return [FileType.Text, {language: 'erb'}];
    case 'fsi':
    case 'fsx':
      return [FileType.Text, {language: 'f#'}];
    case 'fx':
      return [FileType.Text, {language: 'hlsl'}];
    case 'f':
    case 'for':
    case 'f77':
      return [FileType.Text, {language: 'fortran-fixed-form'}];
    case 'f90':
    case 'f95':
    case 'f03':
    case 'f08':
    case 'f18':
      return [FileType.Text, {language: 'fortran-free-form'}];
    case 'gd':
      return [FileType.Text, {language: 'gdscript'}];
    case 'fs':
    case 'fp':
    case 'frg':
    case 'fsh':
    case 'fshader':
    case 'geo':
    case 'geom':
    case 'glslv':
    case 'gshader':
    case 'shader':
    case 'vert':
    case 'vrx':
    case 'vsh':
    case 'vshader':
      return [FileType.Text, {language: 'glsl'}];
    case 'gp':
    case 'gnu':
    case 'gnuplot':
    case 'plot':
    case 'plt':
      return [FileType.Text, {language: 'gnuplot'}];
    case 'go':
      return [FileType.Text, {language: 'go'}];
    case 'gherkin':
      return [FileType.Text, {language: 'gherkin'}];
    case 'git-commit':
      return [FileType.Text, {language: 'git-commit'}];
    case 'git-rebase':
      return [FileType.Text, {language: 'git-rebase'}];
    case 'gleam':
      return [FileType.Text, {language: 'gleam'}];
    case 'glimmer-js':
    case 'gjs':
      return [FileType.Text, {language: 'glimmer-js'}];
    case 'glimmer-ts':
    case 'gts':
      return [FileType.Text, {language: 'glimmer-ts'}];
    case 'bal':
      return [FileType.Text, {language: 'ballerina'}];
    case 'graphql':
      return [FileType.Text, {language: 'graphql'}];
    case 'po':
    case 'pot':
    case 'potx':
      return [FileType.Text, {language: 'po'}];
    case 'narrat':
      return [FileType.Text, {language: 'narrat'}];
    case 'groovy':
    case 'grt':
    case 'gtpl':
    case 'gvy':
    case 'gsp':
      return [FileType.Text, {language: 'groovy'}];
    case 'hcl':
    case 'tf':
      return [FileType.Text, {language: 'hcl'}];
    case 'hlsl':
    case 'fxh':
    case 'hlsli':
      return [FileType.Text, {language: 'hlsl'}];
    case 'html':
    case 'htm':
    case 'xht':
    case 'xhtml':
    case 'htm.hl':
      return [FileType.Text, {language: 'html'}];
    case 'mustache':
    case 'jinja':
      return [FileType.Text, {language: 'jinja'}];
    case 'jison':
      return [FileType.Text, {language: 'jison'}];
    case 'jade':
      return [FileType.Text, {language: 'jade'}];
    case 'haml':
    case 'haml.deface':
      return [FileType.Text, {language: 'haml'}];
    case 'handlebars':
    case 'hbs':
    case 'hb':
      return [FileType.Text, {language: 'handlebars'}];
    case 'hs':
    case 'hsc':
      return [FileType.Text, {language: 'haskell'}];
    case 'hx':
    case 'hxsl':
      return [FileType.Text, {language: 'haxe'}];
    case 'hy':
      return [FileType.Text, {language: 'hy'}];
    case 'http':
      return [FileType.Text, {language: 'http'}];
    case 'php':
    case 'php3':
    case 'php4':
    case 'php5':
    case 'phps':
    case 'phpt':
    case 'phtml':
    case 'ctp':
    case 'aw':
      return [FileType.Text, {language: 'php'}];
    case 'ini':
    case 'cfg':
    case 'prefs':
    case 'properties':
      return [FileType.Text, {language: 'ini'}];
    case 'json':
      return [FileType.Text, {language: 'json'}];
    case 'json5':
      return [FileType.Text, {language: 'json5'}];
    case 'jsonc':
      return [FileType.Text, {language: 'jsonc'}];
    case 'jsonl':
      return [FileType.Text, {language: 'jsonl'}];
    case 'jsonnet':
      return [FileType.Text, {language: 'jsonnet'}];
    case 'yml':
    case 'yaml':
    case 'reek':
    case 'rviz':
    case 'syntax':
    case 'sublime-syntax':
    case 'yaml-tmlanguage':
      return [FileType.Text, {language: 'yaml'}];
    case 'rst':
    case 'rest':
    case 'rest.txt':
    case 'rst.txt':
      return [FileType.Text, {language: 'rst'}];
    case 'sql':
    case 'cql':
    case 'ddl':
    case 'prc':
    case 'tab':
    case 'udf':
    case 'viw':
    case 'db2':
    case 'pls':
    case 'pck':
    case 'pkb':
    case 'pks':
    case 'plb':
    case 'plsql':
      return [FileType.Text, {language: 'sql'}];
    case 'xml':
    case 'ant':
    case 'axml':
    case 'ccxml':
    case 'clixml':
    case 'cproject':
    case 'csl':
    case 'csproj':
    case 'ct':
    case 'dita':
    case 'ditamap':
    case 'ditaval':
    case 'dll.config':
    case 'dotsettings':
    case 'filters':
    case 'fsproj':
    case 'fxml':
    case 'glade':
    case 'grxml':
    case 'gml':
    case 'iml':
    case 'ivy':
    case 'jelly':
    case 'jsproj':
    case 'kml':
    case 'launch':
    case 'mdpolicy':
    case 'mod':
    case 'nproj':
    case 'nuspec':
    case 'odd':
    case 'osm':
    case 'plist':
    case 'props':
    case 'pluginspec':
    case 'ps1xml':
    case 'psc1':
    case 'pt':
    case 'rdf':
    case 'rss':
    case 'scxml':
    case 'srdf':
    case 'storyboard':
    case 'stTheme':
    case 'sublime-snippet':
    case 'targets':
    case 'tmCommand':
    case 'tml':
    case 'tmLanguage':
    case 'tmPreferences':
    case 'tmSnippet':
    case 'tmTheme':
    case 'ui':
    case 'urdf':
    case 'ux':
    case 'vbproj':
    case 'vcxproj':
    case 'vssettings':
    case 'vxml':
    case 'wsdl':
    case 'wsf':
    case 'wxi':
    case 'wxl':
    case 'wxs':
    case 'x3d':
    case 'xacro':
    case 'xaml':
    case 'xbst':
    case 'xib':
    case 'xlf':
    case 'xliff':
    case 'xmi':
    case 'xml.dist':
    case 'xproj':
    case 'xsd':
    case 'xul':
    case 'zcml':
      return [FileType.Text, {language: 'xml'}];
    default: {
      // TODO: pass data to isTextFile to auto-detect utf-8 files
      // const isText = await isTextFile(ext, null);
      const isText = false;
      console.log(isTextFile);
      return isText
        ? [FileType.Text, {language: 'text'}]
        : [FileType.Binary, {}];
    }
  }
}
