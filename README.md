# Index Solutions SDK

A JavaScript SDK for interacting with the Index Solutions External API. This SDK provides contact monitoring, entity resolution, matter classification, and webhook management capabilities.

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Quick Start with Interactive CLI

The fastest way to explore the API is using our interactive CLI demo:

### 1. Set up environment variables

Create a `.env` file in the root directory:

```bash
# Required credentials (obtain from Index Solutions)
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here

# Optional configuration
SCOPE=bch.external/contact.read bch.external/contact.write bch.external/organization.read bch.external/organization.write bch.external/matter.read bch.external/matter.write
```

### 2. Run the interactive demo

```bash
node src/demo/interactiveCLI.js
```

The interactive CLI will:
- Show all available API methods
- Provide reasonable defaults for testing
- Let you input custom parameters as JSON or JavaScript objects
- Display formatted responses
- Allow you to repeat the last request easily

### 3. Example session

```
Welcome to the ExternalApiClient CLI Tool!

Available API methods:
1. createContact
2. getContact
3. deleteContact
4. createOrganization
5. getOrganization
6. updateOrganization
7. deleteOrganization
8. createMatter
9. getMatter
10. listEvents
11. listWebhooks
12. deleteWebhook
13. testAuthentication

Enter the number of the API method you want to call: 13

Calling method with parameters:

API Response:
{
  "message": "Authentication successful"
}
```

## Using the ExternalApiClient Class

### Basic Setup

```javascript
const ExternalApiClient = require('./src/ExternalApiClient');

const client = new ExternalApiClient({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  scope: 'bch.external/contact.read bch.external/organization.write', // optional
  // Optional configuration
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000,
  tokenEndpoint: 'https://auth.external.index.io/oauth2/token', // optional
  apiBase: 'https://external.index.io' // optional
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | string | **Required** | OAuth client ID from Index Solutions |
| `clientSecret` | string | **Required** | OAuth client secret from Index Solutions |
| `scope` | string | All scopes | Space-separated OAuth scopes |
| `maxRetries` | number | 3 | Maximum retry attempts for failed requests |
| `retryDelay` | number | 1000 | Delay between retries (milliseconds) |
| `timeout` | number | 30000 | Request timeout (milliseconds) |
| `tokenEndpoint` | string | Default endpoint | Custom OAuth token endpoint |
| `apiBase` | string | Default API base | Custom API base URL |

### Available Scopes

- `bch.external/contact.read` - Read contact information
- `bch.external/contact.write` - Create and monitor contacts
- `bch.external/organization.read` - Read organization information
- `bch.external/organization.write` - Create and update organizations
- `bch.external/matter.read` - Read matter information
- `bch.external/matter.write` - Create and classify matters

## API Methods

### Contact Management

#### Create Contact
```javascript
const contact = await client.createContact({
  id: 'unique-contact-id',
  firstName: 'John',
  lastName: 'Doe',
  emails: [{ type: 'work', value: 'john@example.com' }],
  organization: { id: 'org-1', name: 'Acme Corp' },
  config: {
    action: 'clean' // or 'save'
  }
});
```

#### Get Contact
```javascript
const contact = await client.getContact('unique-contact-id');
```

#### Delete Contact
```javascript
await client.deleteContact('unique-contact-id');
```

### Organization Management

#### Create Organization
```javascript
const organization = await client.createOrganization({
  id: 'unique-org-id',
  name: 'Acme Corporation',
  config: {
    action: 'resolve', // or 'save'
    dataSource: 'sp' // 'dnb' or 'sp'
  }
});
```

#### Get Organization
```javascript
const organization = await client.getOrganization('unique-org-id');
```

#### Update Organization
```javascript
const updated = await client.updateOrganization('unique-org-id', {
  name: 'Updated Company Name',
  config: { action: 'save' }
});
```

#### Delete Organization
```javascript
await client.deleteOrganization('unique-org-id');
```

### Organization Profiles

#### List All Profiles
```javascript
const profiles = await client.listOrganizationProfiles('org-id');
// Returns: { dnb: {...}, sp: {...}, web: {...}, etc. }
```

#### Get Specific Profile
```javascript
const dnbProfile = await client.getOrganizationProfileForDataSource('org-id', 'dnb');
```

#### Get Parent Organization Profiles
```javascript
const parentProfiles = await client.listParentOrganizationProfiles('org-id', 'global-parent');
const parentDnbProfile = await client.getParentOrganizationProfileForDataSource('org-id', 'global-parent', 'dnb');
```

**Available Data Sources**: `dnb`, `sp`, `web`, `naics`, `sali`, `customTaxonomy`, `linkedin`

### Matter Classification

#### Create Matter
```javascript
const matter = await client.createMatter({
  id: 'unique-matter-id',
  title: 'Acquisition Agreement Review',
  description: 'Review and classification of legal agreement...',
  department: 'Mergers & Acquisitions',
  players: [
    { id: 'attorney-1', name: 'Jane Smith', type: 'attorney' },
    { id: 'client-1', name: 'Acme Corp', type: 'client' }
  ],
  config: {
    action: 'classify',
    dataSource: 'sali'
  }
});
```

#### Get Matter (with Classifications)
```javascript
const matter = await client.getMatter('unique-matter-id');
// Returns matter with SALI classifications array
```

### Events and Webhooks

#### List Events
```javascript
// Get all events
const allEvents = await client.listEvents();

// Filter by event type
const contactEvents = await client.listEvents('contact-updated');

// Filter by multiple event types
const events = await client.listEvents(['contact-updated', 'organization-updated']);
```

**Event Types**: `contact-updated`, `contact-profile-updated`, `organization-updated`, `workflow-failed`, `matter-updated`

#### Webhook Management
```javascript
// List all webhooks
const webhooks = await client.listWebhooks();

// Delete a webhook
await client.deleteWebhook('webhook-id');
```

### Authentication Test
```javascript
const result = await client.testAuthentication();
// Returns: { message: "Authentication successful" }
```

## Error Handling

The SDK throws `ExternalApiError` for API-related errors:

```javascript
const { ExternalApiError } = require('./src/ExternalApiClient');

try {
  const contact = await client.getContact('nonexistent-id');
} catch (error) {
  if (error instanceof ExternalApiError) {
    console.log('API Error:', error.message);
    console.log('Status Code:', error.statusCode);
    console.log('Response Body:', error.responseBody);
  } else {
    console.log('Network or other error:', error.message);
  }
}
```

## Product Configuration Actions

### Contact Actions
- `clean` - Clean and standardize contact data
- `save` - Save contact for monitoring

### Organization Actions
- `resolve` - Resolve organization to database entity (DUNS/S&P)
- `save` - Save organization data

### Matter Actions
- `classify` - Classify matter using SALI taxonomy
- `save` - Save matter data

## Rate Limiting and Retries

The SDK automatically handles:
- **Rate limiting**: Respects `429` responses and `Retry-After` headers
- **Retries**: Configurable retry logic for transient failures
- **Timeouts**: Configurable request timeouts with abort signals
