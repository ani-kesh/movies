export function EmptyCoverPicture() {
  return (
    <svg
      version="1.2"
      baseProfile="tiny-ps"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 300"
      width="200"
      height="300"
    >
      <title>New Project</title>
      <defs>
        <image
          width="200"
          height="300"
          id="img1"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEsAQMAAAC8NG79AAAAAXNSR0IB2cksfwAAAANQTFRFVEuSwUPfEAAAAB5JREFUeJztwTEBAAAAwqD1T20Hb6AAAAAAAAAA4DceeAABWjPaUAAAAABJRU5ErkJggg=="
        />
      </defs>
      <use id="Background" href="#img1" x="0" y="0" />
    </svg>
  );
}
