/**
 * Client for interacting with the External API
 * @class
 */

// Type imports
/**
 * @typedef {import('./types').ExternalContactWithProductConfig} ExternalContactWithProductConfig
 */
/**
 * @typedef {import('./types').ExternalOrganizationWithProductConfig} ExternalOrganizationWithProductConfig
 */
/**
 * @typedef {import('./types').ExternalMatterWithProductConfig} ExternalMatterWithProductConfig
 */
/**
 * @typedef {import('./types').OrganizationProfileDataSources} OrganizationProfileDataSources
 */
/**
 * @typedef {import('./types').EventType} EventType
 */

/**
 * @typedef {import('./types').ExternalContact} ExternalContact
 */
/**
 * @typedef {import('./types').ExternalOrganization} ExternalOrganization
 */
/**
 * @typedef {import('./types').ExternalMatter} ExternalMatter
 */
/**
 * @typedef {import('./types').EventData} EventData
 */
/**
 * @typedef {import('./types').ExternalOrganizationProfileData} ExternalOrganizationProfileData
 */
/**
 * @typedef {import('./types').EventsListResponse} EventsListResponse
 */
/**
 * @typedef {import('./types').OrganizationProfilesResponse} OrganizationProfilesResponse
 */
/**
 * @typedef {import('./types').Webhook} Webhook
 */
/**
 * @typedef {import('./types').ExternalMatterWithClassifications} ExternalMatterWithClassifications
 */

class ExternalApiClient {
  static get validDataSources() {
    return ['dnb', 'sp', 'web', 'naics', 'sali', 'customTaxonomy', 'linkedin'];
  }

  static get validReferenceTypes() {
    return ['self', 'global-parent', 'domestic-parent'];
  }

  static get validEventTypes() {
    return ['contact-updated', 'contact-profile-updated', 'organization-updated', 'workflow-failed', 'matter-updated'];
  }

  get validScopes() {
    return [
      'bch.external/contact.write',
      'bch.external/contact.read',
      'bch.external/organization.write',
      'bch.external/organization.read',
      'bch.external/matter.write',
      'bch.external/matter.read',
    ];
  }

  /**
   * Create a new ExternalApiClient
   * @param {Object} options - Configuration options
   * @param {string} options.clientId - OAuth client ID
   * @param {string} options.clientSecret - OAuth client secret
   * @param {string} [options.scope] - OAuth scope(s)
   * @param {number} [options.maxRetries=3] - Maximum number of retry attempts
   * @param {number} [options.retryDelay=1000] - Delay between retries in milliseconds
   * @param {number} [options.timeout=30000] - Request timeout in milliseconds
   * @param {string} [options.tokenEndpoint] - Custom token endpoint
   * @param {string} [options.apiBase] - Custom API base URL
   */
  constructor({ clientId, clientSecret, scope = this.validScopes.join(' '), maxRetries = 3, retryDelay = 1000, timeout = 30000, tokenEndpoint, apiBase } = {}) {
    if (!clientId || !clientSecret) {
      throw new Error('clientId and clientSecret are required');
    }

    const scopes = scope.split(' ');
    if (!scopes.every((scope) => this.validScopes.includes(scope))) {
      throw new Error('Invalid scope. Must be one of: ' + this.validScopes.join(', '));
    }

    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._scope = scope;
    this._apiVersion = 'v1';
    this._token = null;
    this._tokenExpiration = null;
    this._maxRetries = maxRetries;
    this._retryDelay = retryDelay;
    this._timeout = timeout;

    this._tokenEndpoint = tokenEndpoint || 'https://auth.external.index.io/oauth2/token';
    this._apiBase = apiBase || 'https://external.index.io';
  }

  /**
   * Create a new contact
   * @param {ExternalContactWithProductConfig} contactData - Contact information with configuration
   * @returns {Promise<ExternalContactWithProductConfig>} Created contact data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If contactData is invalid
   */
  async createContact(contactData) {
    if (!contactData || typeof contactData !== 'object') {
      throw new TypeError('contactData must be an object');
    }

    return this._makeRequest('/contacts', 'POST', contactData);
  }

  /**
   * Get a contact by ID
   * @param {string} contactId - The ID of the contact to retrieve
   * @returns {Promise<ExternalContactWithProductConfig>} Contact data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If contactId is invalid
   */
  async getContact(contactId) {
    if (!contactId || typeof contactId !== 'string') {
      throw new TypeError('contactId must be a non-empty string');
    }
    return this._makeRequest(`/contacts/${contactId}`, 'GET');
  }

  /**
   * Delete a contact by ID
   * @param {string} contactId - The ID of the contact to delete
   * @returns {Promise<string>} Empty response body (204 status)
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If contactId is invalid
   */
  async deleteContact(contactId) {
    if (!contactId || typeof contactId !== 'string') {
      throw new TypeError('contactId must be a non-empty string');
    }
    return this._makeRequest(`/contacts/${contactId}`, 'DELETE');
  }

  /**
   * Create a new organization
   * @param {ExternalOrganizationWithProductConfig} organizationData - Organization information with configuration
   * @returns {Promise<ExternalOrganizationWithProductConfig>} Created organization data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If organizationData is invalid
   */
  async createOrganization(organizationData) {
    if (!organizationData || typeof organizationData !== 'object') {
      throw new TypeError('organizationData must be an object');
    }

    // Validate required fields based on OpenAPI spec
    if (!organizationData.name) {
      throw new TypeError('name is required');
    }

    return this._makeRequest('/organizations', 'POST', organizationData);
  }

  /**
   * Get an organization by ID
   * @param {string} organizationId - The ID of the organization to retrieve
   * @returns {Promise<ExternalOrganizationWithProductConfig>} Organization data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If organizationId is invalid
   */
  async getOrganization(organizationId) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    return this._makeRequest(`/organizations/${organizationId}`, 'GET');
  }

  /**
   * Delete an organization by ID
   * @param {string} organizationId - The ID of the organization to delete
   * @returns {Promise<string>} Empty response body (204 status)
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If organizationId is invalid
   */
  async deleteOrganization(organizationId) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    return this._makeRequest(`/organizations/${organizationId}`, 'DELETE');
  }

  /**
   * Update an organization by ID
   * @param {string} organizationId - The ID of the organization to update
   * @param {ExternalOrganizationWithProductConfig} organizationData - Organization information with configuration
   * @returns {Promise<ExternalOrganizationWithProductConfig>} Updated organization data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If parameters are invalid
   */
  async updateOrganization(organizationId, organizationData) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    if (!organizationData || typeof organizationData !== 'object') {
      throw new TypeError('organizationData must be an object');
    }

    // Validate required fields based on OpenAPI spec
    if (!organizationData.name) {
      throw new TypeError('name is required');
    }

    return this._makeRequest(`/organizations/${organizationId}`, 'PUT', organizationData);
  }

  /**
   * List profiles for an organization
   * @param {string} organizationId - The ID of the organization
   * @returns {Promise<OrganizationProfilesResponse>} Organization profiles by data source
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If organizationId is invalid
   */
  async listOrganizationProfiles(organizationId) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    return this._makeRequest(`/organizations/${organizationId}/profiles`, 'GET');
  }

  /**
   * Get organization profile for a specific data source
   * @param {string} organizationId - The ID of the organization
   * @param {OrganizationProfileDataSources} dataSource - The data source identifier
   * @returns {Promise<ExternalOrganizationProfileData>} Organization profile data for the specified data source
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If parameters are invalid
   */
  async getOrganizationProfileForDataSource(organizationId, dataSource) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    if (!dataSource || !ExternalApiClient.validDataSources.includes(dataSource)) {
      throw new TypeError(`dataSource must be one of: ${ExternalApiClient.validDataSources.join(', ')}`);
    }
    return this._makeRequest(`/organizations/${organizationId}/profiles/${dataSource}`, 'GET');
  }

  /**
   * List parent organization profiles
   * @param {string} organizationId - The ID of the organization
   * @param {'global-parent'|'domestic-parent'} referenceType - The type of reference relationship
   * @returns {Promise<OrganizationProfilesResponse>} Parent organization profiles by data source
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If parameters are invalid
   */
  async listParentOrganizationProfiles(organizationId, referenceType) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    if (!referenceType || !ExternalApiClient.validReferenceTypes.includes(referenceType)) {
      throw new TypeError(`referenceType must be one of: ${ExternalApiClient.validReferenceTypes.join(', ')}`);
    }
    return this._makeRequest(`/organizations/${organizationId}/${referenceType}/profiles`, 'GET');
  }

  /**
   * Get parent organization profile for a specific data source
   * @param {string} organizationId - The ID of the organization
   * @param {string} referenceType - The type of reference relationship
   * @param {string} dataSource - The data source identifier
   * @returns {Promise<ExternalOrganizationProfileData>} Parent organization profile data for the specified data source
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If parameters are invalid
   */
  async getParentOrganizationProfileForDataSource(organizationId, referenceType, dataSource) {
    if (!organizationId || typeof organizationId !== 'string') {
      throw new TypeError('organizationId must be a non-empty string');
    }
    if (!referenceType || !ExternalApiClient.validReferenceTypes.includes(referenceType)) {
      throw new TypeError(`referenceType must be one of: ${ExternalApiClient.validReferenceTypes.join(', ')}`);
    }
    if (!dataSource || !ExternalApiClient.validDataSources.includes(dataSource)) {
      throw new TypeError(`dataSource must be one of: ${ExternalApiClient.validDataSources.join(', ')}`);
    }
    return this._makeRequest(`/organizations/${organizationId}/${referenceType}/profiles/${dataSource}`, 'GET');
  }

  /**
   * List events filtered by type
   * @param {EventType|EventType[]} [eventTypes] - Event type(s) to filter by
   * @returns {Promise<EventsListResponse>} Events list with pagination support
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If eventTypes is invalid
   */
  async listEvents(eventTypes) {
    if (eventTypes !== undefined) {
      if (Array.isArray(eventTypes)) {
        if (!eventTypes.every((type) => ExternalApiClient.validEventTypes.includes(type))) {
          throw new TypeError(`eventTypes must be one of: ${ExternalApiClient.validEventTypes.join(', ')}`);
        }
      } else if (!ExternalApiClient.validEventTypes.includes(eventTypes)) {
        throw new TypeError(`eventTypes must be one of: ${ExternalApiClient.validEventTypes.join(', ')}`);
      }
    }
    return this._makeRequest('/events', 'GET', { eventTypes });
  }

  /**
   * List all webhooks
   * @returns {Promise<Webhook[]>} Array of webhook objects
   * @throws {ExternalApiError} If the API request fails
   */
  async listWebhooks() {
    return this._makeRequest('/webhooks', 'GET');
  }

  /**
   * Delete a webhook
   * @param {string} webhookId - The ID of the webhook to delete
   * @returns {Promise<string>} Empty response body (204 status)
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If webhookId is invalid
   */
  async deleteWebhook(webhookId) {
    if (!webhookId || typeof webhookId !== 'string') {
      throw new TypeError('webhookId must be a non-empty string');
    }
    return this._makeRequest(`/webhooks/${webhookId}`, 'DELETE');
  }

  /**
   * Create a new matter
   * @param {ExternalMatterWithProductConfig} matterData - Matter information with configuration
   * @returns {Promise<ExternalMatterWithProductConfig>} Created matter data with configuration
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If matterData is invalid
   */
  async createMatter(matterData) {
    if (!matterData || typeof matterData !== 'object') {
      throw new TypeError('matterData must be an object');
    }
    // Validate required fields based on OpenAPI spec (e.g. title is required)
    if (!matterData.title) {
      throw new TypeError('title is required');
    }
    if (!matterData.id) {
      throw new TypeError('id is required');
    }
    return this._makeRequest('/matters', 'POST', matterData);
  }

  /**
   * Get a matter by ID
   * @param {string} matterId - The ID of the matter to retrieve
   * @returns {Promise<ExternalMatterWithClassifications>} Matter data with SALI classifications
   * @throws {ExternalApiError} If the API request fails
   * @throws {TypeError} If matterId is invalid
   */
  async getMatter(matterId) {
    if (!matterId || typeof matterId !== 'string') {
      throw new TypeError('matterId must be a non-empty string');
    }
    return this._makeRequest(`/matters/${matterId}`, 'GET');
  }

  /**
   * Test authentication credentials
   * @returns {Promise<{message?: string}>} Authentication test result (200 status indicates success)
   * @throws {ExternalApiError} If the API request fails
   */
  async testAuthentication() {
    return this._makeRequest('/test', 'GET');
  }

  async _makeRequest(path, method, bodyOrParams, retryCount = 0) {
    try {
      // Ensure valid token
      if (!this._token || !this._tokenExpiration || Date.now() >= this._tokenExpiration) {
        await this._refreshToken();
      }
      // Ensure path starts with a forward slash
      if (!path.startsWith('/')) {
        path = `/${path}`;
      }

      const url = new URL(`/${this._apiVersion}${path}`, this._apiBase);

      const headers = {
        Authorization: this._token,
        'Content-Type': 'application/json',
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this._timeout);

      const options = {
        method,
        headers,
        signal: controller.signal,
      };

      if (bodyOrParams) {
        if (method === 'POST' || method === 'PUT') {
          options.body = JSON.stringify(bodyOrParams);
        } else {
          // Remove undefined parameters
          const definedParams = Object.fromEntries(Object.entries(bodyOrParams).filter(([_, value]) => value !== undefined));
          url.search = new URLSearchParams(definedParams).toString();
        }
      }
      try {
        const response = await fetch(url, options);
        clearTimeout(timeoutId);
        if (response.status === 429 && retryCount < this._maxRetries) {
          const retryAfter = response.headers.get('Retry-After') || this._retryDelay;
          await new Promise((resolve) => setTimeout(resolve, retryAfter));
          return this._makeRequest(path, method, bodyOrParams, retryCount + 1);
        }

        if (!response.ok) {
          const body = await response.text();
          let parsedBody;
          try {
            parsedBody = JSON.parse(body);
          } catch {
            parsedBody = body;
          }
          throw new ExternalApiError(`Request failed with status ${response.status}`, response.status, parsedBody);
        } else if (response.status === 204) {
          return await response.text();
        }
        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new ExternalApiError('Request timed out', 408);
        }
        throw error;
      }
    } catch (error) {
      if (error.name === 'FetchError' && retryCount < this._maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, this._retryDelay));
        return this._makeRequest(path, method, bodyOrParams, retryCount + 1);
      }
      throw error;
    }
  }

  async _refreshToken() {
    const basicAuthToken = Buffer.from(`${this._clientId}:${this._clientSecret}`).toString('base64');

    const body = await fetch(this._tokenEndpoint, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: this._scope,
      }).toString(),
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => res.json());

    this._token = `${body.token_type} ${body.access_token}`;
    this._tokenExpiration = Date.now() + body.expires_in * 1000;
    return this._token;
  }
}

// Add a custom error class at the top of the file
class ExternalApiError extends Error {
  constructor(message, statusCode, responseBody) {
    super(message);
    this.name = 'ExternalApiError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

module.exports = ExternalApiClient;
