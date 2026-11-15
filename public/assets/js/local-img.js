window.MAPSOFFICE = {
  baseUrl: "",
  appName: "Google Workers",
  assetVersion: "local",
  mapHero: "assets/img/home-hero.webp",
  walletHero: "assets/img/wallet-hero.webp",
  profileCover: "assets/img/profile-cover.webp",
  upgradeBanner: "assets/img/upgrade-global-banner.webp",
  upgradeMascot: "assets/img/upgrade-mascot.webp",
  limitMascot: "assets/img/limit-mascot.webp",
  welcomeBanner: "assets/img/welcome-banner.webp",
  missionsHero: "assets/img/missions-hero.webp",
  googleG: "assets/img/google-g.svg",
  logoBrand: "assets/img/logo-brand.svg"
};

window.__img = function (u) {
  u = String(u == null ? '' : u);
  if (!u) return '';
  if (/^(https?:)?\/\//i.test(u) || u.indexOf('data:') === 0 || u.indexOf('blob:') === 0) return u;
  return u.charAt(0) === '/' ? u : '/' + u;
};
