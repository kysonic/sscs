export const code = {
    HTML: () => `
<div class="container">
    <div class="wrapper">
        <div class="rect">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        </div>
    </div>
</div>
`.trim(),
    CSS: (size = 300, border = 50, padding = 20) => `
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    .wrapper {
        position: relative;
        overflow: hidden;
        max-width: 968px;
        max-height: 968px;
        width: 95%;
        height: 95%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rect {
        width: ${size}px;
        height: ${size}px;
        border: ${border}px solid rgb(176, 210, 211);
        padding: ${padding}px;
        overflow: auto;
    }
}
    `.trim(),
};
