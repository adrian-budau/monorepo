import type { Plugin } from "./api.js"

type PluginErrorOptions = {
	plugin: Plugin["meta"]["id"]
} & Partial<Error>

class PluginError extends Error {
	public readonly plugin: string

	constructor(message: string, options: PluginErrorOptions) {
		super(message)
		this.name = "PluginError"
		this.plugin = options.plugin
	}
}


export class PluginHasInvalidIdError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginHasInvalidIdError"
	}
}

export class PluginUsesReservedNamespaceError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginUsesReservedNamespaceError"
	}
}

export class PluginHasInvalidSchemaError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginHasInvalidSchemaError"
	}
}

export class PluginFunctionLoadMessagesAlreadyDefinedError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginFunctionLoadMessagesAlreadyDefinedError"
	}
}

export class PluginFunctionSaveMessagesAlreadyDefinedError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginFunctionSaveMessagesAlreadyDefinedError"
	}
}


export class PluginReturnedInvalidAppSpecificApiError extends PluginError {
	constructor(message: string, options: PluginErrorOptions) {
		super(message, options)
		this.name = "PluginReturnedInvalidAppSpecificApiError"
	}
}
