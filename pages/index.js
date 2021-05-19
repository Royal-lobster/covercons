import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { SketchPicker } from "react-color";
import SvgInline from "../lib/SvgInline";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function Home() {
  const downloadHelper_a_tag = React.useRef();

  const [svg, setSvg] = React.useState(null);
  const [bgColor, setBgColor] = React.useState({ hex: "#0394e6" });
  const [icon, setIcon] = React.useState("home");
  const [iconInputFieldText, setIconInputFieldText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleDownloadCover = () => {
    const blob = new Blob([
      `<svg version="1.1"
        baseProfile="full"
        width="1500" height="600"
        xmlns="http://www.w3.org/2000/svg">

        <rect width="100%" height="100%" fill="${bgColor.hex}" />
        <g transform="translate(610, 180) scale(10)">
          ${svg
            .substring(122, svg.length - 6)
            .replaceAll("<path", "<path fill='#ffffffaf' ")}
        </g>
        </svg>
        `,
    ]);
    downloadHelper_a_tag.current.download = `covercon_${icon}.svg`;
    downloadHelper_a_tag.current.href = window.URL.createObjectURL(blob);
    downloadHelper_a_tag.current.click();
  };
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Notion Covercons</title>
          <meta name="description" content="Generate Beautiful Notion Covers" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Notion Covercons</h1>
          <div className={styles.wrapper}>
            <div className={styles.modifierSettings}>
              <div className={styles.selectIconsFromGoogle}>
                <h2>1. Select and Copy icon name from google fonts</h2>
                <button
                  onClick={() => setOpen(true)}
                  className={styles.iconNameSubmit}
                >
                  Instructions
                </button>
                <Modal open={open} onClose={() => setOpen(false)} center>
                  <h1>Instructions: </h1>
                  <div className={styles.googleFontsInstructions}>
                    <Image
                      src="/assets/step_1.png"
                      height="351"
                      width="197.57"
                    />
                    <Image
                      src="/assets/step_2.png"
                      height="351"
                      width="197.57"
                    />
                    <Image
                      src="/assets/step_3.png"
                      height="351"
                      width="197.57"
                    />
                  </div>
                  <a
                    href="https://fonts.google.com/icons"
                    target="_blank"
                    className={styles.iconNameSubmit}
                  >
                    Go to Google Fonts Icons
                  </a>
                  <p className={styles.opensInNewTabMsg}>(opens in new tab)</p>
                </Modal>
              </div>
              <div className={styles.modifierSettings__iconNameSelect}>
                <h2 htmlFor="icon_name">2. Paste the copied icon name</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIcon(iconInputFieldText);
                  }}
                >
                  <input
                    type="text"
                    value={iconInputFieldText}
                    onChange={(e) => setIconInputFieldText(e.target.value)}
                    placeholder="eg: home"
                  />
                  <button className={styles.iconNameSubmit}>Submit</button>
                </form>
              </div>
              <div className={styles.modifierSettings__colorSelect}>
                <h2>3. Select background color</h2>
                <SketchPicker
                  color={bgColor}
                  onChangeComplete={(color) => setBgColor(color)}
                />
              </div>
            </div>
            <div className={styles.coverPreview}>
              <h2>Live Preview</h2>
              <div className="preview">
                <SvgInline icon={icon} svg={svg} setSvg={setSvg} />
              </div>
              <div className={styles.downloadBtnWraper}>
                <a ref={downloadHelper_a_tag}></a>
                <div
                  className={styles.downloadBtn}
                  onClick={handleDownloadCover}
                >
                  Download Cover
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>Made By Srujan with Nextjs</footer>
      </div>
      <style jsx>
        {`
          .preview {
            overflow: hidden;
            display: grid;
            place-content: center;
            width: 100%;
            height: 300px;
            border-radius: 12px;
            background: ${bgColor.hex};
            box-shadow:
              0 0px 2.2px rgba(0, 0, 0, 0.02),
              0 0px 5.3px rgba(0, 0, 0, 0.028),
              0 0px 10px rgba(0, 0, 0, 0.035),
              0 0px 17.9px rgba(0, 0, 0, 0.042),
              0 0px 33.4px rgba(0, 0, 0, 0.05),
              0 0px 80px rgba(0, 0, 0, 0.07)
            ;
        `}
      </style>
    </>
  );
}
