import type {GameProps} from '../Game.interface';

export default (tokens: GameProps) => `
<html>
  <head>
    <style>
      body, html, #game {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="game"></div>
    <script>
      EJS_player = "#game";
      EJS_core = "${tokens.platform}";
      EJS_gameUrl = "${tokens.url}";
      EJS_gameName = "${tokens.name}";
      EJS_biosUrl = "${tokens.bios}";
      EJS_loadStateURL = "${tokens.save ?? ''}";
      EJS_gamePatchUrl = "${tokens.patch ?? ''}";
      EJS_gameParentUrl = "${tokens.parent ?? ''}";
      EJS_cheats = ${tokens.cheats ? JSON.stringify(tokens.cheats) : '[]'};
      EJS_threads = ${tokens.threads?.toString() ?? 'false'};
      EJS_startOnLoaded = ${tokens.startOnLoaded?.toString() ?? 'false'};
      EJS_fullscreen = ${tokens.fullscreen?.toString() ?? 'false'};
      EJS_volume = ${tokens.volume?.toString() ?? 1};
      EJS_language = "${tokens.language ?? 'en-US'}";
      EJS_backgroundColor = "${tokens.background ?? '#000'}";
      EJS_backgroundBlur = "${tokens.blur?.toString() ?? 'false'}";
      EJS_color = "${tokens.accent ?? '#00FF80'}";
      EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
    </script>
    <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
  </body>
</html>
`;
