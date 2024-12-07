/** SDK interface for creating and managing Geolayers plugins */
export interface GeolayersPluginSdk {
	/** Creates a new plugin instance in the specified container element */
	createPlugin: (container: HTMLElement, options?: CreatePluginOptions) => GeolayersPlugin;
}

/** Configuration options for initializing a new plugin instance */
export interface CreatePluginOptions {
	/** Callback function executed after plugin is initialized and a user is logged in. Can rerun when a new user logs in.*/
	onInit?: () => void;
	/** Array of custom export actions available to the plugin */
	pluginExportActions?: PluginExportAction[];
	/** Array of predefined render settings presets */
	pluginRenderPresets?: PluginRenderPreset[];
	/** Custom window creation handler for plugin content */
	createContentWindow?: (container: HTMLElement, src: string) => [Window, () => void];
	/** Gets callen when the user opens an external link from within the plugin */
	openExternalLink?: (url: string) => Promise<void>;
	/** Source URL for the plugin */
	url?: string;
}

/** Main plugin interface providing core functionality and methods */
export interface GeolayersPlugin {
	/** Displays an alert dialog with the specified options
	 * @param options Configuration for the alert dialog
	 * @returns Promise that resolves when the alert is closed
	 */
	alert(options: AlertOptions): Promise<void>;
	/** Shows a confirmation dialog with the specified options
	 * @param options Configuration for the confirmation dialog
	 * @returns Promise that resolves to true if confirmed, false if canceled
	 */
	confirm(options: ConfirmOptions): Promise<boolean>;
	/** Updates the available export actions for the plugin
	 * @param actions Array of export actions to set
	 */
	setPluginExportActions(actions: PluginExportAction[]): Promise<void>;
	/** Updates the available render presets for the plugin
	 * @param presets Array of render presets to set
	 */
	setPluginRenderPresets(presets: PluginRenderPreset[]): Promise<void>;
	/** Removes the plugin instance and cleans up resources */
	remove(): void;
}

/** Configuration for a custom export action */
export interface PluginExportAction {
	/** Display name of the export action */
	name: string;
	/** Optional icon identifier or URL */
	icon?: string;
	/** Handler function called when the export action is triggered
	 * @param blob The exported data blob
	 * @param details Additional export details
	 */
	onExport: (blob: Blob, details: any) => void;
}

/** Configuration for a render preset */
export interface PluginRenderPreset {
	/** Display name of the preset */
	name: string;
	/** Optional icon identifier or URL */
	icon?: string;
	/** Render configuration settings */
	renderSettings: RenderSettings;
	/** Optional handler for export completion
	 * @param blob The exported data blob
	 * @param details Additional export details
	 */
	onExport?: (blob: Blob, details: any) => void;
}

/** Configuration options for rendering */
export interface RenderSettings {
	/** Output filename without extension */
	fileName?: string;
	/** Output dimensions as [width, height] */
	resolution?: [number, number];
	/** Number of parallel renderers to use */
	numRenderers?: number;
	/** Target frame rate for video exports */
	frameRate?: number;
	/** Output format type */
	exportType: "mp4" | "png";
	/** Export quality (0-1) */
	quality?: number;
	/** Scaling factor for render resolution */
	resolutionRenderFactor?: number;
	/** Additional custom rendering properties */
	customProperties?: { [key: string]: string | number | boolean };
}

/** Configuration options for alert dialogs */
export interface AlertOptions {
	/** Dialog title text */
	title: string;
	/** Dialog message content */
	text: string;
	/** Text for the confirmation button */
	confirmBtnText: string;
}

/** Configuration options for confirmation dialogs */
export interface ConfirmOptions {
	/** Dialog title text */
	title: string;
	/** Dialog message content */
	text: string;
	/** Text for the confirmation button */
	confirmBtnText: string;
	/** Text for the cancel button */
	cancelBtnText: string;
}
