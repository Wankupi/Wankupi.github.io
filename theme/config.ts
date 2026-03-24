export interface NavItem {
  text: string;
  link: string;
  icon: string;
}

export interface ThemeConfig {
  nav: {
    brand: { text: string; link: string };
    items: NavItem[];
  };
  themeColor?: string;
  backgroundImage?: string;
}
