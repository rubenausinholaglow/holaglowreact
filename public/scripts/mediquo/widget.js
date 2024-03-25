var MediquoWidget = {
  launcherId: "MediquoLauncher",
  containerId: "MediquoContainer",
  pendingConsultations: undefined,
  createIframe: ({ src, id }) => {
    document.getElementById(id) && document.getElementById(id).remove();
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", id);
    iframe.setAttribute("src", src);
    iframe.setAttribute("title", id);
    iframe.setAttribute("allow", "microphone; camera; autoplay");

    MediquoWidget.setStyles({
      element: iframe,
      styles: {
        position: "fixed",
        width: 0,
        height: 0,
        border: "none",
      },
    });
    document.body.appendChild(iframe);
    return iframe;
  },
  setStyles: ({ element, styles }) => {
    element.style = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
  },
  open: () => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    launcher
      ? launcher.contentWindow?.postMessage({ command: "open" }, "*")
      : console.error("MediquoWidget hasn't been initialized");
  },
  close: () => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    launcher
      ? launcher.contentWindow?.postMessage({ command: "close" }, "*")
      : console.warn("MediquoWidget hasn't been initialized");
  },
  destroy: () => {
    MediquoWidget.logout();
    document.getElementById(MediquoWidget.launcherId)?.remove();
    document.getElementById(MediquoWidget.containerId)?.remove();
  },
  logout: () => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    launcher
      ? launcher.contentWindow?.postMessage({ command: "logout" }, "*")
      : console.warn("MediquoWidget hasn't been initialized");
  },
  navigate: (path) => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    launcher
      ? launcher.contentWindow?.postMessage(
          { command: "navigate", payload: { path } },
          "*"
        )
      : console.error("MediquoWidget hasn't been initialized");
  },
  open_room: (professional_hash) => {
    var container = document.getElementById(MediquoWidget.containerId);
    container
      ? launcher.contentWindow?.postMessage(
          { command: "open_room", payload: { professional_hash } },
          "*"
        )
      : console.error("MediquoWidget container hasn't been initialized");
  },
  open_list: () => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    var container = document.getElementById(MediquoWidget.containerId);
    container && launcher
      ? launcher.contentWindow?.postMessage(
          { command: "navigate", payload: { path: "/" } },
          "*"
        ) && launcher.contentWindow?.postMessage({ command: "open" }, "*")
      : console.error("MediquoWidget container hasn't been initialized");
  },
  init: (params) => {
    return new Promise((resolve, reject) => {
      if (params && !params.apiKey) {
        console.error("apiKey is required");
        return;
      }

      var {
        apiKey,
        accessToken,
        environment = "production",
        show = "always",
        showInitialMessage = false,
        blockNavigation = false,
        showPracticeCountry = false,
        immediateVideoCall = false,
        mute = false,
        showChatSchedule = false,
        isMobileView = false,
        theme,
      } = params;

      var context = {
        local: "/",
        sandbox: "https://widget.dev.mediquo.com/",
        production: "https://widget.mediquo.com/",
      }[environment];

      var launcher = MediquoWidget.createIframe({
        src: `${context}launcher/index.html`,
        id: MediquoWidget.launcherId,
      });
      var container = MediquoWidget.createIframe({
        src: context,
        id: MediquoWidget.containerId,
      });

      container.onload = () => {
        setTimeout(() => {
          container.contentWindow?.postMessage(
            {
              command: "init",
              accessToken: accessToken ?? Storage.getAccessToken(),
              apiKey,
              show,
              theme,
              showInitialMessage,
              blockNavigation,
              showPracticeCountry,
              immediateVideoCall,
              mute,
              showChatSchedule,
              width: window.innerWidth,
              hasActiveSession: Storage.hasActiveSession(),
              isTemporalUser: !accessToken,
              isMobileView,
            },
            "*"
          );
        }, 0);
        window.onfocus = () =>
          container.contentWindow?.postMessage(
            { command: "focus", source: "parent" },
            "*"
          );
        window.onblur = () =>
          container.contentWindow?.postMessage(
            { command: "blur", source: "parent" },
            "*"
          );

        window.onresize = () =>
          container.contentWindow?.postMessage(
            { command: "resize", width: window.innerWidth },
            "*"
          );
      };

      window.addEventListener(
        "message",
        ({
          data: { command, styles, target, accessToken, source, payload },
        }) => {
          switch (command) {
            case "started":
              resolve({
                hasActiveSession: Storage.hasActiveSession(),
                pendingConsultations: payload.pendingConsultations,
              });
              break;
            case "container_init":
              container.contentWindow?.postMessage(
                {
                  command: "init",
                  accessToken: params.accessToken ?? Storage.getAccessToken(),
                  apiKey,
                  show,
                  theme,
                  showInitialMessage,
                  blockNavigation,
                  showPracticeCountry,
                  immediateVideoCall,
                  mute,
                  showChatSchedule,
                  width: window.innerWidth,
                  hasActiveSession: Storage.hasActiveSession(),
                  isTemporalUser: !params.accessToken,
                  referer: window.location.href,
                  isMobileView,
                },
                "*"
              );
              break;
            case "launcher_init":
            case "init":
              launcher.contentWindow?.postMessage(
                { command: "init", theme, isTemporalUser: !params.accessToken },
                "*"
              );
              break;
            case "styles":
              MediquoWidget.setStyles({
                element: { launcher: launcher, container: container }[target],
                styles,
              });
              break;
            case "open_list":
              container.contentWindow?.postMessage(
                { command: "open_list" },
                "*"
              );
              launcher.contentWindow?.postMessage(
                { command: "navigate", payload: { path: "/" } },
                "*"
              );
            case "open":
              launcher.contentWindow?.postMessage({ command: "open" }, "*");
              container.contentWindow?.postMessage({ command: "open" }, "*");
              break;
            case "open_room":
              container.contentWindow?.postMessage({ command, payload }, "*");
              break;

            case "navigate":
              container.contentWindow?.postMessage(
                { command: "navigate", payload },
                "*"
              );
              break;

            case "close":
              launcher.contentWindow?.postMessage({ command: "close" }, "*");
              container.contentWindow?.postMessage({ command: "close" }, "*");
              reject();
              break;
            case "logout":
              container.contentWindow?.postMessage({ command: "logout" }, "*");
            case "storage.save":
              Storage.saveSession(accessToken);
              break;
            case "storage.clear":
              Storage.clearSession();
              break;
            case "focus":
            case "blur":
              container.contentWindow?.postMessage({ command, source }, "*");
              break;
            case "videocall_link":
              window.cordova.InAppBrowser.open(payload, "_system");
              break;
            case "consultations":
              MediquoWidget.pendingConsultations = payload.pendingConsultations;
            case "message":
              launcher.contentWindow?.postMessage({ command, payload }, "*");
              break;
            default:
              break;
          }
        }
      );
    });
  },
  getPendingConsultations: () => MediquoWidget.pendingConsultations,
  remove: () => {
    var launcher = document.getElementById(MediquoWidget.launcherId);
    var container = document.getElementById(MediquoWidget.containerId);
    if (!launcher || !container) {
      console.warn("MediquoWidget hasn't been initialized");
      return;
    }

    launcher.remove();
    container.remove();
  },
};
window.MediquoWidget = MediquoWidget;

const Storage = {
  hasActiveSession: () => {
    const session = window.localStorage.getItem("mediquo.session");
    if (!session) {
      return false;
    }
    const { expiry } = JSON.parse(session);
    return expiry > new Date().getTime();
  },
  getAccessToken: () => {
    const session = window.localStorage.getItem("mediquo.session");
    if (session) {
      const { accessToken } = JSON.parse(session);
      return accessToken;
    }
  },
  saveSession: (accessToken) => {
    const ONE_MONTH_IN_MILLISECONDS = 2629800000;
    window.localStorage.setItem(
      "mediquo.session",
      JSON.stringify({
        accessToken,
        expiry: new Date().getTime() + ONE_MONTH_IN_MILLISECONDS,
      })
    );
  },
  clearSession: () => window.localStorage.removeItem("mediquo.session"),
};