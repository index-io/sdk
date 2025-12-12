import type {
  EventType,
  EventsListResponse,
  ExternalContactWithProductConfig,
  ExternalMatterWithClassifications,
  ExternalMatterWithProductConfig,
  ExternalOrganizationProfileData,
  ExternalOrganizationWithProductConfig,
  OrganizationProfileDataSources,
  OrganizationProfilesResponse,
  Timecard,
  Webhook,
} from './types';

export type ExternalApiClientOptions = {
  clientId: string;
  clientSecret: string;
  scope?: string;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  tokenEndpoint?: string;
  apiBase?: string;
};

declare class ExternalApiClient {
  constructor(options: ExternalApiClientOptions);

  createContact(contactData: ExternalContactWithProductConfig): Promise<ExternalContactWithProductConfig>;
  getContact(contactId: string): Promise<ExternalContactWithProductConfig>;
  deleteContact(contactId: string): Promise<string>;
  getContactProfile(contactId: string): Promise<Record<string, unknown>>;
  getContactProfileRaw(contactId: string): Promise<Record<string, unknown>>;

  createOrganization(organizationData: ExternalOrganizationWithProductConfig): Promise<ExternalOrganizationWithProductConfig>;
  getOrganization(organizationId: string): Promise<ExternalOrganizationWithProductConfig>;
  updateOrganization(organizationId: string, organizationData: ExternalOrganizationWithProductConfig): Promise<ExternalOrganizationWithProductConfig>;
  deleteOrganization(organizationId: string): Promise<string>;

  listOrganizationProfiles(organizationId: string): Promise<OrganizationProfilesResponse>;
  getOrganizationProfileForDataSource(organizationId: string, dataSource: OrganizationProfileDataSources): Promise<ExternalOrganizationProfileData>;
  listParentOrganizationProfiles(organizationId: string, referenceType: 'global-parent' | 'domestic-parent'): Promise<OrganizationProfilesResponse>;
  getParentOrganizationProfileForDataSource(
    organizationId: string,
    referenceType: 'global-parent' | 'domestic-parent',
    dataSource: OrganizationProfileDataSources
  ): Promise<ExternalOrganizationProfileData>;

  listEvents(eventTypes?: EventType | EventType[]): Promise<EventsListResponse>;

  listWebhooks(): Promise<Webhook[]>;
  deleteWebhook(webhookId: string): Promise<string>;

  createMatter(matterData: ExternalMatterWithProductConfig): Promise<ExternalMatterWithProductConfig>;
  getMatter(matterId: string): Promise<ExternalMatterWithClassifications>;

  createTimecard(matterId: string, timecardData: { externalId: string; narrative: string; externalMatterId?: string; [key: string]: unknown }): Promise<Timecard>;
  getTimecard(matterId: string, timecardId: string): Promise<Timecard>;
  deleteTimecard(matterId: string, timecardId: string): Promise<string>;

  getQuota(): Promise<{
    projectUri: string;
    products: Array<{
      projectUri: string;
      productId: string;
      totalQuantity: number;
      usedQuantity: number;
      quantityAvailable: number;
      hasQuota: boolean;
      activeLicenses: number;
    }>;
  }>;

  testAuthentication(): Promise<{ message?: string }>;
}

export = ExternalApiClient;


