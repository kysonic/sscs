export const code = {
    HTML: `
<div class="container">
    <div class="wrapper">
        <div class="rect">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        </div>
    </div>
</div>
`.trim(),
    CSS: `
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
        width: 300px;
        height: 300px;
        border: 50px solid rgb(176, 210, 211);
        padding: 20px;
        overflow: auto;
    }
}
    `.trim(),
};
