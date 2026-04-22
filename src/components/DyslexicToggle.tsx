import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const DYSLEXIC_MODE_STORAGE_KEY = "dyslexic-reading-mode";
const DYSLEXIC_MODE_CLASS = "dyslexic-mode";
const HIGH_CONTRAST_MODE_STORAGE_KEY = "high-contrast-mode";
const HIGH_CONTRAST_MODE_CLASS = "high-contrast-mode";
const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "KBD",
  "SAMP",
  "TEXTAREA",
  "SVG",
  "OPTION",
]);

const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

const collectTextNodes = (root: HTMLElement): Text[] => {
  const nodes: Text[] = [];
  const queue: ChildNode[] = Array.from(root.childNodes);

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      const content = textNode.textContent;

      if (!content || !content.trim()) {
        continue;
      }

      const parentElement = textNode.parentElement;
      if (!parentElement) {
        continue;
      }

      if (parentElement.closest("[data-dyslexic-word]")) {
        continue;
      }

      if (parentElement.closest("[data-dyslexic-ignore]")) {
        continue;
      }

      if (SKIP_TAGS.has(parentElement.tagName)) {
        continue;
      }

      nodes.push(textNode);
      continue;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      if (element.hasAttribute("data-dyslexic-ignore")) {
        continue;
      }

      if (element.hasAttribute("data-dyslexic-word")) {
        continue;
      }

      if (SKIP_TAGS.has(element.tagName)) {
        continue;
      }

      queue.unshift(...Array.from(element.childNodes));
    }
  }

  return nodes;
};

const applyDyslexicWordStyling = () => {
  if (!isBrowser || !document.body) {
    return;
  }

  const textContainers = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".app-main p:not([data-dyslexic-ignore]), .app-main li:not([data-dyslexic-ignore])"
    )
  );

  textContainers.forEach((element) => {
    if (element.closest("[data-dyslexic-ignore]")) {
      return;
    }

    const textNodes = collectTextNodes(element);

    textNodes.forEach((textNode) => {
      const textContent = textNode.textContent;
      if (!textContent) {
        return;
      }

      const segments = textContent.split(/(\s+)/);
      if (segments.length === 0) {
        return;
      }

      const fragment = document.createDocumentFragment();

      segments.forEach((segment) => {
        if (!segment) {
          return;
        }

        if (/^\s+$/.test(segment)) {
          fragment.appendChild(document.createTextNode(segment));
          return;
        }

        const characters = Array.from(segment);
        if (characters.length === 0) {
          fragment.appendChild(document.createTextNode(segment));
          return;
        }

        const [firstChar, ...restChars] = characters;
        const word = document.createElement("span");
        word.className = "dyslexic-word";
        word.setAttribute("data-dyslexic-word", "true");

        const firstLetter = document.createElement("span");
        firstLetter.className = "dyslexic-first-letter";
        firstLetter.textContent = firstChar;

        word.appendChild(firstLetter);

        if (restChars.length > 0) {
          const remainder = document.createElement("span");
          remainder.className = "dyslexic-rest-of-word";
          remainder.textContent = restChars.join("");
          word.appendChild(remainder);
        }

        fragment.appendChild(word);
      });

      textNode.replaceWith(fragment);
    });
  });
};

const removeDyslexicWordStyling = () => {
  if (!isBrowser || !document.body) {
    return;
  }

  const wordNodes =
    document.querySelectorAll<HTMLElement>("[data-dyslexic-word]");

  wordNodes.forEach((wordNode) => {
    const parent = wordNode.parentNode;
    if (!parent) {
      return;
    }

    const textContent = wordNode.textContent ?? "";
    const textNode = document.createTextNode(textContent);
    parent.replaceChild(textNode, wordNode);
  });
};

export function DyslexicToggle() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isDyslexicMode, setIsDyslexicMode] = useState<boolean>(() => {
    if (!isBrowser) {
      return false;
    }

    try {
      return (
        window.localStorage.getItem(DYSLEXIC_MODE_STORAGE_KEY) === "true"
      );
    } catch {
      return false;
    }
  });
  const [isHighContrastMode, setIsHighContrastMode] = useState<boolean>(() => {
    if (!isBrowser) {
      return false;
    }

    try {
      return (
        window.localStorage.getItem(HIGH_CONTRAST_MODE_STORAGE_KEY) === "true"
      );
    } catch {
      return false;
    }
  });

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (isDyslexicMode) {
      document.body.classList.add(DYSLEXIC_MODE_CLASS);
      try {
        window.localStorage.setItem(DYSLEXIC_MODE_STORAGE_KEY, "true");
      } catch {
        // ignore storage failures
      }
      applyDyslexicWordStyling();
    } else {
      document.body.classList.remove(DYSLEXIC_MODE_CLASS);
      removeDyslexicWordStyling();
      try {
        window.localStorage.removeItem(DYSLEXIC_MODE_STORAGE_KEY);
      } catch {
        // ignore storage failures
      }
    }
  }, [isDyslexicMode]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (isHighContrastMode) {
      document.body.classList.add(HIGH_CONTRAST_MODE_CLASS);
      try {
        window.localStorage.setItem(
          HIGH_CONTRAST_MODE_STORAGE_KEY,
          "true"
        );
      } catch {
        // ignore storage failures
      }
    } else {
      document.body.classList.remove(HIGH_CONTRAST_MODE_CLASS);
      try {
        window.localStorage.removeItem(HIGH_CONTRAST_MODE_STORAGE_KEY);
      } catch {
        // ignore storage failures
      }
    }
  }, [isHighContrastMode]);

  useEffect(() => {
    if (!isBrowser || !isDyslexicMode) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      applyDyslexicWordStyling();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, isDyslexicMode]);

  useEffect(() => {
    if (!isBrowser || !showMenu) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        (menuRef.current && menuRef.current.contains(target)) ||
        (buttonRef.current && buttonRef.current.contains(target))
      ) {
        return;
      }
      setShowMenu(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const toggleMenu = () => setShowMenu((previous) => !previous);
  const toggleDyslexicMode = () => setIsDyslexicMode((previous) => !previous);
  const toggleHighContrastMode = () =>
    setIsHighContrastMode((previous) => !previous);

  const menuId = "navbar-settings-menu";

  return (
    <div className="navbar-accessibility" ref={menuRef}>
      <button
        type="button"
        className="navbar-settings-button"
        aria-haspopup="true"
        aria-expanded={showMenu}
        aria-controls={menuId}
        aria-label="Toggle accessibility settings"
        onClick={toggleMenu}
        ref={buttonRef}
      >
        <span aria-hidden="true" className="navbar-settings-icon">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            role="img"
            className="navbar-settings-icon-svg"
          >
            <path
              fill="currentColor"
              d="M19.14 12.94c.04-.31.07-.63.07-.94 0-.31-.03-.63-.07-.94l2.03-1.58c.19-.15.24-.42.12-.63l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96c-.5-.38-1.05-.69-1.65-.94l-.36-2.54A.5.5 0 0 0 14.03 2h-4.06a.5.5 0 0 0-.49.42l-.36 2.54c-.59.24-1.14.54-1.65.9l-2.39-.96a.5.5 0 0 0-.61.22L2.55 8.44c-.12.21-.07.48.12.63l2.03 1.58c-.04.31-.07.63-.07.94 0 .31.03.63.07.94l-2.03 1.58a.5.5 0 0 0-.12.63l1.92 3.32c.14.24.43.34.69.24l2.39-.96c.51.36 1.06.66 1.65.9l.36 2.54c.04.27.27.46.54.46h4.06c.27 0 .49-.19.54-.46l.36-2.54c.59-.24 1.14-.54 1.65-.9l2.39.96c.26.1.55 0 .69-.24l1.92-3.32a.5.5 0 0 0-.12-.63l-2.03-1.58Zm-7.14 2.56a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
            />
          </svg>
        </span>
      </button>
      {showMenu ? (
        <div
          id={menuId}
          className="navbar-settings-menu"
          role="menu"
        >
          <label
            className="navbar-settings-option"
            role="menuitemcheckbox"
            aria-checked={isDyslexicMode}
          >
            <input
              type="checkbox"
              checked={isDyslexicMode}
              onChange={toggleDyslexicMode}
            />
            <span>Dyslexic reading mode</span>
          </label>
          <p className="navbar-settings-description">
            Emphasises the first letter of words in paragraphs and bullet lists to support dyslexic readers.
          </p>
          <label
            className="navbar-settings-option"
            role="menuitemcheckbox"
            aria-checked={isHighContrastMode}
          >
            <input
              type="checkbox"
              checked={isHighContrastMode}
              onChange={toggleHighContrastMode}
            />
            <span>High contrast mode</span>
          </label>
          <p className="navbar-settings-description">
            Switches to a black background with yellow text for increased legibility in low-contrast environments.
          </p>
        </div>
      ) : null}
    </div>
  );
}
