import { Spin } from "antd"
import React from "react"
import { renderToString } from "react-dom/server"

export const LoadingComponent = {
    runLoadingBlockUI,
    stopRunLoading,
}

function runLoadingBlockUI() {
    ($ as any).blockUI({
        css: {
            border: "none",
            padding: "15px",
            backgroundColor: 0,
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            opacity: 1,
            color: "#fff",
        },
        message: renderToHtmlCode(),
    })
}

function stopRunLoading() {
    ($ as any).unblockUI()
}

const renderToHtmlCode = () => {
    return renderToString(
        <Spin tip="Loading" size="large"/>
    )
}
