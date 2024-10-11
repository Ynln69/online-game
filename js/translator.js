const savedLanguage = localStorage.getItem("language") || "pl";

// Підключення i18next
i18next.use(i18nextXHRBackend).init(
  {
    lng: savedLanguage,
    fallbackLng: "pl",
    debug: true,
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
  },
  function (err, t) {
    updateContent();
    updateActiveLanguageButton(savedLanguage);
  }
);

function updateContent() {
  document.querySelectorAll("[data-translate]").forEach(function (element) {
    const key = element.getAttribute("data-translate");
    element.textContent = i18next.t(key);
  });
}

function changeLanguage(language) {
  i18next.changeLanguage(language, () => {
    localStorage.setItem("language", language);
    updateContent();
    updateActiveLanguageButton(language);
  });
}

function updateActiveLanguageButton(language) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeButton = document.getElementById(`lang-${language}`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

document.getElementById("lang-pl").addEventListener("click", function () {
  changeLanguage("pl");
});

document.getElementById("lang-en").addEventListener("click", function () {
  changeLanguage("en");
});
