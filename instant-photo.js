class InstantPhoto extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "instant-photo", InstantPhoto)
    }
  }

  static css = `
    :host {
      background-color: var(--instant-photo-background-color, #121212);
      display: inline-block;
      border-width: 0.2in 0.2in 0.9in 0.2in;
      border-style: solid;
      border-color: var(--instant-photo-border-color, #ededed);
    }
    img {
      inline-size: 3.1in;
      block-size: 3.1in;
      display: block;
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([develop]) img {
        opacity: 0;
        filter: contrast(0%) saturate(50%);
      }
      :host([visible]) img {
        animation: fadein var(--instant-photo-develop-duration, 10s) linear var(--instant-photo-develop-delay, 1s) forwards;
      }
    }
    @keyframes fadein {
      50% {
        opacity: 1;
        filter: contrast(67%) saturate(80%);
      }
      100% {
        opacity: 1;
        filter: contrast(100%) saturate(100%);
      }
    }
  `

  connectedCallback() {
    if (!this.querySelector("img").getAttribute("src")) {
      console.error(`Missing \`src\` attribute!`, this)
      return
    }

    this.init()
  }

  initTemplate() {
    if (this.shadowRoot) {
      return
    }

    this.attachShadow({ mode: "open" })

    let sheet = new CSSStyleSheet()
    sheet.replaceSync(InstantPhoto.css)
    this.shadowRoot.adoptedStyleSheets = [sheet]

    let template = document.createElement("template")
    template.innerHTML = this.innerHTML
    this.innerHTML = ""
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const threshold = Math.min(Math.max(Number(this.getAttribute("threshold") || 0.333), 0), 1)

    if (this.hasAttribute("develop")) {
      const observer = new IntersectionObserver((entries, observer) => {
        console.log(this, entries[0].intersectionRatio)
        if (entries[0].intersectionRatio > threshold) {
          this.setAttribute("visible", true)
          observer.unobserve(this)
        }
      }, { threshold: threshold })
      observer.observe(this)
    }
  }

  async init() {
    this.initTemplate()
  }
}

InstantPhoto.register()
