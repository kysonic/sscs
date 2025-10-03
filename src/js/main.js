function updateInterfaceValues() {
    offsetTop.querySelector('.value').textContent = rect.offsetTop;
    offsetLeft.querySelector('.value').textContent = rect.offsetLeft;
    clientTop.querySelector('.value').textContent = rect.clientTop;
    clientLeft.querySelector('.value').textContent = rect.clientLeft;
    clientHeight.querySelector('.value').textContent = rect.clientHeight;
    offsetHeight.querySelector('.value').textContent = rect.offsetHeight;
    offsetWidth.querySelector('.value').textContent = rect.offsetWidth;
    clientWidth.querySelector('.value').textContent = rect.clientWidth;
}

function setScrollHeight() {
    const value = rect.scrollHeight - rect.offsetHeight + rect.clientTop - rect.scrollTop;
    const validatedValue = value > 0 ? value : 0;
    scrollHeightVisual.style.height = validatedValue + 'px';
    scrollHeight.style.height = rect.scrollHeight + 'px';
    scrollHeight.style.marginTop = -rect.scrollTop + 'px';
    scrollHeight.querySelector('.value').textContent = rect.scrollHeight;
}

// Observe scroll to change scroll visual position
rect.addEventListener('scroll', () => {
    const value = rect.scrollTop - 50;
    const validatedValue = value > 0 ? value : 0;
    // Visual Rect
    scrollTopVisual.style.height = validatedValue + 'px';
    scrollTopVisual.style.marginTop = -validatedValue + 'px';
    // ScrollTop
    scrollTop.style.display = rect.scrollTop > 25 ? 'flex' : 'none';
    scrollTop.style.height = rect.scrollTop + 'px';
    scrollTop.style.marginTop = -rect.scrollTop + 'px';
    scrollTop.querySelector('.value').textContent = rect.scrollTop;
    // ScrollHeight
    setScrollHeight();
});

window.addEventListener('resize', updateInterfaceValues);

updateInterfaceValues();
setScrollHeight();
// Setup basic position
rect.scrollTo(0, 206);
