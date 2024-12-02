import { useTranslation } from "react-i18next";
export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="language-switcher">
      <button
        onClick={() => i18n.changeLanguage("fr")}
        className={i18n.language === "fr" ? "active" : ""}
      >
        {t("fr")}
      </button>
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        {t("en")}
      </button>
    </div>
  );
};
