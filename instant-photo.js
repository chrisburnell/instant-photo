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
    :host img {
      inline-size: 3.1in;
      block-size: 3.1in;
      display: block;
    }
    @media (prefers-reduced-motion: no-preference) {
      :host([develop]) img {
        opacity: 0;
        filter: contrast(0%) saturate(50%);
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

  render() {
    if (!this.querySelector("img").getAttribute("src")) {
      return
    }

    this.src = this.querySelector("img").getAttribute("src")
    this.alt = this.querySelector("img").getAttribute("alt") || ""

    let content = []

    content.push(`
      <img src="${this.src}" alt="${this.alt}" loading="lazy" decoding="async">
    `)

    return content.join("")
  }

  initTemplate() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.render()
      return
    }

    let shadowroot = this.attachShadow({ mode: "open" })

    let sheet = new CSSStyleSheet()
    sheet.replaceSync(InstantPhoto.css)
    shadowroot.adoptedStyleSheets = [sheet]

    let template = document.createElement("template")
    template.innerHTML = this.render()
    this.innerHTML = ""
    shadowroot.appendChild(template.content.cloneNode(true))
  }

  async init() {
    this.initTemplate()
  }
}

InstantPhoto.register()
