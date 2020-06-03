import ResizeObserver from 'resize-observer-polyfill';

const listeners = (entries) => {
    for (let item of entries) {
        if (item.target && item.target.resizeListeners && item.target.resizeListeners.length) {
            for (let func of item.target.resizeListeners) {
                func(item);
            }
        }
    }
}

const domResize = (ele, func) => {
    if (!ele.resizeListeners) {
        ele.resizeListeners = [];
        const myObserver = new ResizeObserver(listeners);
        myObserver.observe(ele);
    }
    ele.resizeListeners.push(func);
}

export default domResize;