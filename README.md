# GEOlayers.app plugins

[GEOlayers.app](https://editor.geolayers.app) allows you to create rich map animations directly in your browser. A geolayers.app plugin can be used in a browser-like environment to render and export images and videos of your animations. It can be integrated into content management systems or other creative applications like Adobe Premiere or Photoshop to streamline workflows.

## Getting Started

Embed the plugin SDK script in your website:

    <script src="https://editor.geolayers.app/plugin-sdk/v1/plugin-sdk.umd.js"></script>

this script will add "geolayers" to global context.

Then you can call geolayers.createPlugin(container, options) to instantiate the plugin:

    const plugin = geolayers.createPlugin(document.getElementById("plugin"), {
        onInit: () => console.log("Plugin ready"),
        pluginExportActions: [
            {
                name: "Export to Host",
                icon: "plus",
                onExport,
            },
        ],
        pluginRenderPresets: [
            {
                name: "MP4",
                renderSettings: {
                    resolution: [960, 540],
                    frameRate: 25,
                    exportType: "mp4",
                    customProperties: {
                        myProperty: "myValue",
                    },
                },
                onExport,
            },
            {
                name: "PNG",
                renderSettings: {
                    resolution: [960, 960],
                    exportType: "png",
                    customProperties: {
                        myProperty: "myValue2",
                    },
                },
                onExport,
            },
        ],
    });

Once a user triggers a render or export inside the plugin the onExport function is called with the video or image blob as first and a details object as second argument.
