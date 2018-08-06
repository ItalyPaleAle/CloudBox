'use strict'

import {StorageProvider} from './lib/StorageProvider'

// tslint:disable-next-line: variable-name
const SMCloudStore = {
    /**
     * Initializes a new client to interact with cloud providers' object storage services.
     * 
     * @param provider - Name of the cloud provider to use (see `SMCloudStore.Providers`)
     * @param connection - Dictionary with connection options. List of keys is specific for every cloud provider
     * @returns An instance of a cloud provider module
     */
    Create: (provider: string, connection: {} | string): StorageProvider => {
        // Validate arguments
        const supportedProviders = SMCloudStore.Providers()
        if (!provider || typeof provider !== 'string' || !supportedProviders.includes(provider)) {
            throw Error('The specified provider is not valid. Valid providers inlcude: ' + supportedProviders.join(', '))
        }

        if (!connection) {
            throw Error('The connection argument must be non-empty')
        }

        // Require the specific provider, then initialize it
        const providerModule = require('./providers/' + provider + 'Provider.js')

        return new providerModule(connection)
    },

    /**
     * Returns a list of supported providers.
     * 
     * @returns List of supported provider names
     */
    Providers: (): string[] => {
        return [
            'AwsS3',
            'AzureStorage',
            'GoogleCloudStorage',
            'Minio'
        ]
    }
}

export = SMCloudStore