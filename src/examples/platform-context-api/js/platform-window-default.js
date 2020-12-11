export const CONTAINER_ID = "layout-container-2";
window.addEventListener("DOMContentLoaded", async () => {
    // Before .50 AI version this may throw...
    fin.Platform.Layout.init({ containerId: CONTAINER_ID });
    let myContainer = document.querySelector(`#${CONTAINER_ID}`);
    myContainer.addEventListener("container-created", async () => {
        let { top, left } = await fin.me.getBounds();
        await fin.me.setBounds({ top: top + 1, left: left + 1 });
        await fin.me.setBounds({ top, left });
        await fin.me.show();
    });
});
