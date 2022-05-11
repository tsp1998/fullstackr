import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeModels.ThemeColorsModel;
    sizes: ThemeModels.ThemeSizesModel;
  }
}