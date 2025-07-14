/**

 * @typedef {"dnb"|"sp"|"web"|"naics"|"sali"|"customTaxonomy"|"linkedin"|"idx-related-profile"} OrganizationProfileDataSources
 */

/**

 * @typedef {Object} EventData
 * @property {string} id - Unique identifier for the event
 * @property {EventType} type - Type of the event
 * @property {"created"|"processing"|"processed"|"failed"} status
 * @property {string} timestamp - ISO 8601 formatted timestamp of when the event occurred
 */

/**

 * Contact Product Configuration
 * @typedef {CleanContactProductConfiguration|SaveContactProductConfiguration} ContactProductConfiguration
 */

/**

 * Organization Product Configuration
 * @typedef {ResolveOrganizationProductConfiguration|SaveOrganizationProductConfiguration} OrganizationProductConfiguration
 */

/**

 * Contact information for an individual
 * @typedef {Object} ExternalContact
 * @property {string} [id] - Unique identifier for the contact
 * @property {string} [uri] - A URI we use internally for referencing the contact
 * @property {string} [firstName] - The contact's first name
 * @property {string} [lastName] - The contact's last name
 * @property {string} [middleName] - The contact's middle name, if any
 * @property {string} [jobTitle] - The contact's current job title
 * @property {SimpleOrganizationValue} [organization] - The organization the contact is associated with
 * @property {WorkStatus} [workStatus] - The current employment status of the contact
 * @property {Array<SimpleEmailValue>} [emails] - List of email addresses associated with the contact
 * @property {Array<ValidationUrl>} [urls] - List of relevant URLs associated with the contact (e.g., LinkedIn profile)
 * @property {Address} [address] - The contact's physical address
 * @property {"created"|"processing"|"monitoring"|"cleaned"|"failed"|"inactive"} [status] - The current status of the contact in the system
 */

/**

 * External representation of an organization
 * @typedef {Object} ExternalOrganization
 * @property {string} id - Unique identifier for the organization
 * @property {string} uri - A URI we use internally for referencing the organization
 * @property {string} name - The primary name of the organization
 * @property {Array<string>} [alternateNames] - Alternative names or aliases for the organization
 * @property {Array<OrganizationValidationUrl>} [urls] - URLs associated with the organization
 * @property {Array<ExternalLocation>} [locations] - An array of the organization's locations
 * @property {Array<ExternalProfileReference>} [profiles] - An array of references to profiles related to the Organization (e.g. an S&P Profile)
 * @property {"created"|"processing"|"monitoring"|"cleaned"|"failed"|"inactive"} [status] - The current status of the contact in the system
 */

/**

 * @typedef {ExternalContact|Object} ExternalContactWithProductConfig
 */

/**

 * @typedef {ExternalOrganization|Object} ExternalOrganizationWithProductConfig
 */

/**

 * Basic information about an organization
 * @typedef {Object} SimpleOrganizationValue
 * @property {string} id - Unique identifier for the organization
 * @property {string} name - The name of the organization
 */

/**

 * Represents an email address with its associated type
 * @typedef {Object} SimpleEmailValue
 * @property {"work"|"personal"|"other"|"obsolete"} type - The category or purpose of the email address
 * @property {string} value - The actual email address
 */

/**

 * @typedef {"employed"|"self-employed"|"between-jobs"|"in-school"|"retired"|"deceased"} WorkStatus
 */

/**

 * @typedef {Object} ExternalLocation
 * @property {string} [id]
 * @property {string} [name]
 * @property {Address} [address] - The location's physical address
 */

/**

 * Legal Matter. Should include a title and description in most cases. typeDescription and department are not available in all systems but should be provided if available.
 * @typedef {Object} ExternalMatter
 * @property {string} id - ID in external system
 * @property {string} [uri] - Internal URI of the matter
 * @property {string} title - Title/name of the matter
 * @property {string} [description] - Detailed description of the matter. This is the Narrative Description Text in the SALI Matter Record.
 * @property {string} [department] - Department handling the matter
 * @property {string} [matterType] - Matter type as defined in the Firm's Matter Type Taxonomy
 * @property {Array<MatterPlayer>} [players]
 */

/**

 * @typedef {ExternalMatter|Object} ExternalMatterWithProductConfig
 */

/**

 * @typedef {ExternalMatter|Object} ExternalMatterWithClassifications
 */

/**

 * @typedef {Object} Webhook
 * @property {string} id
 * @property {string} url
 * @property {string} [name]
 * @property {"enabled"|"disabled"} [status]
 * @property {Array<EventTypeWithWildcard>} [events] - The events that this webhook will trigger for. If no events are specified or if the value includes '*', the webhook will trigger for all events.
 * @property {string} createdAt
 */

/**

 * @typedef {EventData|EventPayload} EventWithPayload
 */

/**

 * @typedef {SALIServiceClassification|SALIAreaOfLawClassification} MatterClassification
 */

/**

 * @typedef {Object} SALIServiceClassification
 * @property {"service"} type - @constant
 * @property {SALIService} value
 * @property {string} [id] - IRI of the service
 * @property {"sali"} source - @constant
 * @property {string} [explanation] - Explanation of the classification
 * @property {boolean} [isPrimary] - Whether the classification is the primary classification for the matter
 * @property {Array<SaliServiceClassificationItem>} [hierarchy] - The full hierarchical path from major class to this value
 */

/**

 * @typedef {Object} SALIAreaOfLawClassification
 * @property {"areaOfLaw"} type - @constant
 * @property {SALIAreaOfLaw} value
 * @property {string} [id] - IRI of the area of law
 * @property {"sali"} source - @constant
 * @property {string} [explanation] - Explanation of the classification
 * @property {boolean} [isPrimary] - Whether the classification is the primary classification for the matter
 * @property {Array<SaliAreaOfLawClassificationItem>} [hierarchy] - The full hierarchical path from major class to this value
 */

/**

 * @typedef {"contact-updated"|"contact-profile-updated"|"organization-updated"|"workflow-failed"|"matter-updated"} EventType
 */

/**

 * @typedef {Object} SaveContactProductConfiguration
 * @property {"save"} action
 */

/**

 * @typedef {Object} CleanContactProductConfiguration
 * @property {"clean"} action
 * @property {"quarterly"|"monthly"|"none"} frequency - The frequency at which we check the public profiles for updates or 'none' for a one-time clean.
 */

/**

 * @typedef {Object} SaveOrganizationProductConfiguration
 * @property {"save"} action
 */

/**

 * @typedef {Object} ResolveOrganizationProductConfiguration
 * @property {"resolve"} action
 * @property {"quarterly"|"monthly"|"none"} frequency - The frequency at which we check the external profiles for updates or 'none' for a one-time resolution.
 * @property {ResolveOrganizationDataSource} dataSource - The data source to use for the entity resolution. Note that dnb is only available after an initial setup process.
 * @property {boolean} includeVendorData - If true, the data will include the vendor data from the specified data source in the results (e.g. legal name, address, employee and revenue numbers, etc.).
 * @property {boolean} includeWebData - If true, the data will include web data in the results (e.g. url, website title/description, a summary of the company activity based on information found on the web)
 * @property {boolean} includeGlobalUltimate - If true, the data will include the global ultimate parent company in the results (if available).
 * @property {boolean} includeNAICS - If true, the data will include NAICS codes for the company (if available).
 * @property {boolean} includeSALI - If true, the data will include SALI codes for the company (if available).
 * @property {boolean} searchAliases - If true, the search will include the additionalNames/aliases for the company name. This can lead to a higher match rate but also a higher false positive rate.
 * @property {string} [customTaxonomyId] - The ID of a custom taxonomy that has been setup previously via support. If set a label based on this custom taxonomy will be created.
 */

/**

 * @typedef {Object} SaveMatterProductConfiguration
 * @property {"save"} action
 */

/**

 * @typedef {Object} ClassifyMatterProductConfiguration
 * @property {"classify"} action
 * @property {"sali"} [dataSource] - The data source to use for the matter classification.
 */

/**

 * @typedef {Object} ValidationUrl
 * @property {ValidationUrlType} type
 * @property {string} value
 * @property {ValidationUrlSource} [source]
 */

/**

 * @typedef {Object} Address
 * @property {Array<string>} [addressLines]
 * @property {string} [addressLevel1] - State/Region/Province
 * @property {string} [city] - City Name
 * @property {string} [postalCode] - Postal/Zip Code
 * @property {string} [country]
 * @property {string} [countryCode] - Alpha-2 Country Code
 */

/**

 * An ExternalProfileReference is a reference to an ExternalProfile (e.g. a S&P Profile)
 * @typedef {Object} ExternalProfileReference
 * @property {string} id - The ID of the entity, e.g. a DUNS number
 * @property {Record} [data] - Supplementary data of the reference.  For example, the relationship to the parent company.
 * @property {OrganizationProfileDataSources} dataSource
 * @property {"self"|"global-parent"|"domestic-parent"|"parent"|"headquarters"} type - The type of the reference
 * @property {string} [updatedAt] - The last time the reference was updated
 */

/**

 * The data for a specific ExternalProfile and dataSource.
 * @typedef {DnbData|SPData|WebData|NAICSData|SALIData|CustomTaxonomyData|LinkedinData} ExternalOrganizationProfileData
 */

/**

 * @typedef {Object} OrganizationValidationUrl
 * @property {OrganizationValidationUrlType} type
 * @property {string} value
 */

/**

 * @typedef {"linkedin"|"professional"|"other"} ValidationUrlType
 */

/**

 * @typedef {Object} ValidationUrlSource
 * @property {"google"|"googleai"|"contact"|"gd"|"mturk"|"ds"} [name]
 */

/**

 * @typedef {"primary"|"linkedin"|"other"} OrganizationValidationUrlType
 */

/**

 * @typedef {"dnb"|"sp"} ResolveOrganizationDataSource
 */

/**

 * @typedef {Object} DnbData
 * @property {string} id - The DUNS number
 * @property {string} [name]
 * @property {Array<string>} [alternateNames]
 * @property {Array<ExternalLocation>} [locations]
 * @property {Array<OrganizationValidationUrl>} [urls] - The URLs associated with the organization
 * @property {number} [employees] - The number of employees at the company
 * @property {Object} [revenue] - The revenue of the company in the specified currency
 * @property {string} [industry] - The primary industry of the company
 */

/**

 * @typedef {Object} SPData
 * @property {string} id - The SP ID
 * @property {string} [name]
 * @property {Array<ExternalLocation>} [locations]
 * @property {Array<OrganizationValidationUrl>} [urls] - The URLs associated with the organization
 * @property {string} [companyStatusTypeName]
 * @property {number} [companyTypeId]
 * @property {string} [companyTypeName]
 * @property {string} [officeFaxValue]
 * @property {string} [officePhoneValue]
 * @property {string} [otherPhoneValue]
 * @property {string} [simpleIndustryDescription]
 * @property {string} [yearFounded]
 * @property {number} [monthFounded]
 * @property {number} [dayFounded]
 * @property {string} [incorporationCountry]
 * @property {string} [incorporationState]
 * @property {Array<Object>} [additionalData]
 * @property {Array<Object>} [additionalNames]
 * @property {Array<Object>} [additionalIds]
 */

/**

 * @typedef {Object} WebData
 * @property {string} [url] - The website URL
 * @property {string} [metadataDescription] - The website's metadata description
 * @property {string} [metadataTitle] - The website's metadata title
 * @property {string} [gptSummary] - The summary of the company activities by ChatGPT
 */

/**

 * NAICS data
 * @typedef {Object} NAICSData
 * @property {Array<Object>} values
 */

/**

 * SALI data
 * @typedef {Object} SALIData
 * @property {Array<Object>} values
 */

/**

 * Custom taxonomy information
 * @typedef {Object} CustomTaxonomyData
 * @property {TaxonomyId} taxonomyId - The custom taxonomy id
 * @property {Array<Object>} values
 */

/**

 * Linkedin data
 * @typedef {Object} LinkedinData
 * @property {string} [tagline]
 * @property {string} [description]
 * @property {Array<string>} [specialties]
 * @property {string} [phone]
 * @property {string} [employeeCountRange] - Estimated number of employees
 * @property {Array<string>} [industries]
 * @property {Object} [foundedOn]
 * @property {Object} [ticker]
 * @property {Object} [metadata]
 */

/**

 * @typedef {Object} MatterPlayer
 * @property {string} [id] - ID of player in external system
 * @property {string} name - Name of the player
 * @property {"client"|"attorney"|"other"} type - Type of the player
 */

/**

 * Matter Product Configuration
 * @typedef {ClassifyMatterProductConfiguration|SaveMatterProductConfiguration} MatterProductConfiguration
 */

/**

 * SALI Service Classes and Subclasses
 * @typedef {"Bankruptcy and Financial Restructuring Practice"|"Bankruptcy Claims Practice"|"Claims Filing Practice"|"Claims Objection Practice"|"Claims Review Practice"|"Reorganization Bankruptcy"|"US Chapter 13 Bankruptcy"|"US Chapter 11 Bankruptcy"|"US Chapter 11 Bankruptcy - Streamlined"|"US Chapter 11 - Small Business Debtors"|"US Chapter 12 Bankruptcy"|"Bankruptcy Budgeting Practice"|"Fee and Employment Practice"|"Fee Objection Practice"|"Fee Application Process"|"Employment Application Process"|"Employment Objection Process"|"Adversary Proceeding Practice"|"Trial Court Practice"|"Pretrial Practice"|"Discovery Practice"|"Document Collection and Production Practice"|"Identification of Documents Practice"|"Analysis of Documents Practice"|"Processing of Documents Practice"|"Presentation of Documents Practice"|"Preservation of Documents Practice"|"Collection of Documents Practice"|"Review of Documents Practice"|"Production of Documents Practice"|"Written Discovery Practice"|"Interrogatories Practice"|"Subpoena Practice"|"Subpoena Response Practice"|"Subpoena Assertion Practice"|"Requests for Admission Practice"|"Requests for Production Practice"|"Deposition Practice"|"Corporate Representative Deposition Practice"|"Expert Deposition Practice"|"Fact Deposition Practice"|"Deposition Posture"|"Observing Deposition"|"Defending Deposition"|"Taking Deposition"|"Discovery Motion Practice"|"Expert Practice"|"Physical Examination Practice"|"Expert Report Practice"|"Expert Interview Practice"|"Daubert Motion Practice"|"Pretrial Motion Practice"|"Dispositive Motion Practice"|"Injunctions, Restraining Orders, and Provisional Remedies Practice"|"Pleadings Practice"|"Post-Trial Practice"|"Post-Trial Submission Practice"|"Trial and Post-Trial Motion Practice"|"Trial Practice"|"Witness Examination Practice"|"Cross-Examination of Witness"|"Direct-Examination of Witness"|"Jury Selection / Voire Dire Practice"|"Trial Preparation Practice"|"Trial Testimony Practice"|"Asset Analysis"|"Asset Valuation Practice"|"Asset Due Diligence Practice"|"Examiner Investigation Practice"|"Asset Turnover Practice"|"Non-Litigation Recovery Practice"|"Financial Advisor Practice"|"Out-of-Court Restructuring"|"Receivership Creation"|"Assignment for the Benefit of Creditors"|"Individualized Restructuring"|"Liquidation Bankruptcy"|"US Chapter 7 Bankruptcy"|"Relief from Stay Practice"|"Automatic Stay Practice"|"Adequate Protection Practice"|"Bankruptcy Case Closure Practice"|"Insolvency Practice"|"US Chapter 15 Bankruptcy"|"Corporate Governance Analysis"|"Debt Repayment Plan Bankruptcy"|"Analysis of Entity Formation"|"Creditor Meeting and Communication Practice"|"Bankruptcy Exit Financing"|"Bankruptcy Initiation Type"|"Voluntary Bankruptcy"|"Involuntary Bankruptcy"|"Bankruptcy Motion Practice"|"US Chapter 9 Bankruptcy"|"Settlement, Demand, and Collection Practice"|"Demand Letter Practice"|"Debt Collection Practice"|"Domestication Action"|"Settlement Practice"|"Negotiation Sequence"|"Collective Bargaining Event"|"Obligation Analysis"|"Analysis of Vendors & Commercial Arrangement Considerations"|"Analysis of Critical Vendor Status"|"Analysis of Vendor Contracts"|"Analysis of Vendor Communications"|"Analysis of Utilities Considerations"|"Analysis of Securities Reporting Considerations"|"Analysis of Pre-Petition Lien Issues"|"Analysis of Financial Reports"|"Analysis of Insurance Considerations"|"Analysis of Use of Cash"|"Analysis of DIP Financing"|"Analysis of Cash Collateral"|"Analysis of Cash Management"|"Analysis of Monthly Operating Reports"|"Analysis of Cash Management Reports"|"Analysis of Pre-Petition Debt Agreements"|"Analysis of Student Loan Obligations"|"Analysis of Pre-Petition Auto Financing"|"Analysis of Pre-Petition Mortgage"|"Analysis of Dischargeability Issues"|"Analysis of Employee Benefits/Pensions"|"Analysis of Employee Retention"|"Analysis of KEIPs and KERPs"|"Analysis of Benefits Plans"|"Analysis of Severance Obligations"|"Analysis of Severance Arrangement Issues"|"Analysis of Environmental Considerations"|"Avoidance Action Practice"|"Asset Disposition Practice"|"Asset Sales Practice"|"Abandonment Practice"|"Advisory Service"|"Appropriations Practice"|"Government Appropriations Practice"|"Opinion Memo Practice"|"Manuals Practice"|"Grass Roots Organization and Management"|"Coalition Formation and Management Practice"|"Government Coalition Management"|"Strategic Communications Practice"|"Crisis Communications Practice"|"Corporate Campaigns Practice"|"Employee Rights Campaigns Practice"|"Tabletop Exercise Practice"|"Policies Practice"|"Crisis Management Practice"|"Governmental Monitoring Practice"|"Legislative Monitoring Practice"|"Judicial Branch Monitoring Practice"|"Executive Branch Monitoring Practice"|"Regulatory Services (Non-Dispute)"|"Regulatory Enforcement"|"Tax Practice"|"Use Tax Practice"|"Income Tax Practice"|"Sales Tax Practice"|"Excise Tax Practice"|"Property Tax Practice"|"Monitoring"|"International Trade Practice"|"Customs and Import Controls Practice"|"Export Controls Practice"|"Public Benefits"|"Public Housing Benefit"|"School-Based Public Benefit"|"Non-Contributory Benefit"|"Disability Public Benefit"|"In-home Supportive Service Disability Benefit"|"Assessment of Eligibility for Public Benefits"|"Old Age Public Benefits"|"Unemployment Public Benefits"|"Health Public Benefit"|"Family Health Public Benefit"|"Mother and Child Health Public Benefit"|"Pediatric Screening and Intervention Public Benefit"|"Food and Cash Public Benefit"|"Food Public Benefit"|"General Relief Benefit"|"Cash Public Benefit"|"Provider of Public Benefits"|"State-Provided Public Benefit"|"Nation-Provided Public Benefit"|"Locally Provided Public Benefit"|"Military and Veteran Benefits"|"Contributory Benefit"|"Pension Benefit"|"Estate Management Practice"|"Estate Planning Practice"|"Estate Administration Practice"|"Immigration Service"|"Government Relations"|"Legislative Drafting Practice"|"Public Comment Practice"|"Regulatory Drafting Practice"|"Lobbying"|"Disaster Relief"|"Economic Development Service"|"Regulatory Processing Service"|"Regulatory Application Service"|"Regulatory Eligibility Determination Service"|"Intellectual Property Registration Process"|"Domain Name Registration Process"|"Copyright Registration Process"|"Patent Registration Process"|"Patent Assessment Process"|"Prior Art Search Process"|"Patent Search Process"|"Plant Patent Registration"|"Design Patent Registration"|"Patent Opposition Process"|"Patent Reexamination Process"|"Utility Patent Registration"|"Trademark Registration Process"|"Trademark Opposition Process"|"Trademark Renewal Process"|"Trademark Search Process"|"Trademark Cancellation Process"|"Customs Recordal Process"|"Regulatory Compliance"|"Regulatory Disclosure Practice"|"Regulatory Investigation"|"Insurance Regulatory Practice"|"Audit Practice"|"Real Estate Regulatory Services"|"Roadway Closing"|"Density Credit Transactions"|"Roadway Dedication"|"Real Estate Permit Review"|"Real Estate Design Review"|"Real Estate Zoning Modifications"|"Zoning Document Amendments"|"Zoning Text Amendments"|"Zoning Map Amendments"|"Real Estate Special Exception"|"Clearing Title"|"Dispute Service"|"Litigation Practice"|"Alternative Dispute Resolution Practice"|"Mediation Practice"|"Arbitration Practice"|"Domain Name Dispute Resolution Practice"|"Affidavit / Declaration Practice"|"Appellate Practice"|"Appellate Briefing Practice"|"Appellate Motions and Submissions Practice"|"Appellate Argument Practice"|"Case Assessment, Development, Administration"|"Document and File Management"|"Co-Party Coordination"|"Analysis and Strategy"|"Fact Investigation and Development"|"Invalidity Analysis Practice"|"Technical Analysis"|"Fact Witness Interview Practice"|"Infringement Analysis Practice"|"Claim Construction Practice"|"Dispute Proceeding Type"|"Investigation Practice"|"Foreign Direct Investment Review"|"Inquiry Practice"|"Examination Under Oath"|"Tax Dispute Practice"|"Tax Audit Practice"|"Administrative Dispute Proceeding Practice"|"Trade Safeguards Dispute"|"Post-Grant Review"|"Unfair Import Investigation"|"U.S. Inter Partes Review"|"Covered Business Method Review"|"Civil Court Proceeding"|"Criminal Court Proceeding"|"Transactional Practice"|"Services Agreement Practice"|"Funds Practice"|"Fund Formation Practice"|"Lease Practice"|"Employment Transactions Practice"|"Executive Compensation Practice"|"Mortgage Practice"|"Securitization Practice"|"Licensing Practice"|"Separation Agreement  Practice"|"Mergers and Acquisitions Practice"|"M&A Practice Components"|"M&A A Preliminary Matters Practice"|"M&A D Ancillary Documents Practice"|"M&A F Regulatory and Specialty Matters Practice"|"M&A F8 Tax Practice"|"M&A F7 Securities Regulatory Matters Practice"|"M&A F3 Employment, Labor and Employee Benefits Practice"|"M&A F1 Antitrust / Competition Practice"|"M&A F5 Intellectual Property and Technology Practice"|"M&A F6 Real Property Practice"|"M&A F4 Environmental Practice"|"M&A F2 Data Security / Privacy / Data Protection / Cybersecurity Practice"|"M&A K Deal Management Practice"|"M&A I Integration Matters Practice"|"M&A C Due Diligence and Disclosure Schedules Practice"|"M&A H Closing Matters Practice"|"M&A J Post-Closing Requirements, Disputes & Adjustments Practice"|"M&A E Financing Practice"|"M&A B Purchase / Merger Agreement Practice"|"M&A G Shareholder / Board Matters Practice"|"Entity Formation Practice"|"Non-Profit Formation Practice"|"Business Formation Practice"|"Trust Formation Practice"|"Joint Venture Formation Practice"|"Purchase and Sale Practice"|"Service Sales Practice"|"Financing Practice"|"Equity Financing Practice"|"Secondary Offering Practice"|"Shelf Takedown"|"Shelf Registration"|"Private Placement Practice"|"Private Investment in Public Equity Practice"|"Direct Public Offering Practice"|"Initial Public Offering Practice"|"Rights Offering Practice"|"Debt Financing Practice"|"Lending Practice"|"Asset-Based Lending Practice"|"Reserve Based Lending Practice"|"Development of Property Practice"} SALIService
 */

/**

 * @typedef {Object} SaliServiceClassificationItem
 * @property {SALIService} value
 * @property {string} id - IRI of the service
 */

/**

 * The Area of Law is a SALI enumerated value that provides context to the process. The area of law should be thought of the primary subject of law for the process — think the class that’s the attorney was in when she learned about the applicable law. The area of law is provided primarily for context as in the examples, “He prosecuted the defendant” and “She prosecuted the patent.” The first is criminal law, the second is intellectual property law. There can be multiple areas of law.
 * @typedef {"Constitutional and Civil Rights Law"|"Individual Rights Law"|"Environmental, Social, and Governance Law"|"Discrimination Law"|"Political Rights Law"|"Personal Injury and Tort Law"|"Personal Property Law"|"Product Liability Law"|"Defamation Law"|"Mass Torts Law"|"Negligence and Malpractice Law"|"Assault Law"|"Fraud and Economic Torts Law"|"Information Security Law"|"Cybersecurity Law"|"Privacy Law"|"Government Access and Disclosure Law"|"Banking Law"|"Cryptocurrency Law"|"Bank Secrecy and Anti-Money Laundering Law"|"Banking Operations Law"|"Municipal Law"|"Public and Administrative Law"|"Indigenous People's Law"|"Military and Veterans Law"|"Project Finance Law"|"Public Health and Welfare Law"|"Public Finance Law"|"Public Policy and Government Affairs Law"|"Government Contracts Law"|"Election Law"|"Bankruptcy, Insolvency, and Restructuring Law"|"Personal Insolvency Law"|"Corporate Insolvency Law"|"Law of Obligations"|"Food and Drug Law"|"Energy Law"|"Renewable Energy Law"|"Solar Energy Law"|"Hydroelectric Energy Law"|"Wind Power Law"|"Nuclear Law"|"Energy Sales and Transmission Law"|"Oil and Gas Law"|"Transportation Law"|"Motor Vehicle Law"|"Aviation Law"|"Railway Law"|"Personal and Family Law"|"Trusts and Estate Planning Law"|"Custody Law"|"Juvenile Law"|"Matrimonial Law"|"Immigration Law"|"Employment Immigration Law"|"Adoption, Surrogacy, and Paternity Law"|"Probate Law"|"Religious Law"|"Islamic Law"|"Jewish Law"|"Indigenous and Tribal Religious Laws"|"Canon Law"|"Sikh Law"|"Hindu Law"|"Buddhist Law"|"Cannabis Law"|"Gaming Law"|"Securities and Financial Instruments Law"|"Investment Advisor Law"|"Derivatives and Futures Law"|"Investment Companies Law"|"Exchanges Law"|"Structured Finance Law"|"Commodities Law"|"Security Offerings and Capital Markets Law"|"Broker-Dealer Law"|"Private Equity, Hedge Funds and Venture Capital Law"|"Contract Law"|"Property Rights and Transactions Law"|"Civil Contract Law"|"Commercial Transactions Law"|"Employment Contracts Law"|"Independent Contractor Law"|"Labor and Employment Law"|"Reduction in Force Law"|"Employment Law"|"Substance Abuse and Drug Testing Law"|"Labor Law"|"Wage and Hour Law"|"Employment Discrimination Law"|"Employment Health and Safety Law"|"Pay Equity Law"|"Termination Law"|"Unemployment Benefits Law"|"Employee Pension and Benefits Law"|"Employee Stock Ownership Plans Law"|"Workers Compensation Law"|"Education Law"|"Insurance Law"|"Disability Insurance Law"|"Accident Benefits Law"|"Captive Insurance Law"|"Real Property Law"|"Condominium Law"|"Construction and Development Law"|"Eminent Domain Law"|"Landlord Tenant Law"|"Land Use and Zoning Law"|"Intellectual Property Law"|"Patent Law"|"Trade Secret Law"|"Trademark and Trade Dress Law"|"Copyright Law"|"Finance and Lending Law"|"Commercial Finance Law"|"Lender Liability Law"|"Debt Collection Law"|"Corporate Law"|"Business Organizations Law"|"Corporate Governance Law"|"Financial Reporting Law"|"Mergers and Acquisitions Law"|"Criminal Law"|"Prison Law"|"Anti-Corruption Law"|"Asset Forfeiture Law"|"Organized Crime Law"|"Business and Financial Crimes Law"|"Cybercrime Law"|"Environmental and Natural Resource Law"|"Water Resources and Wetlands Law"|"Forest Resources Law"|"Contaminant Cleanup Law"|"Waste Management Law"|"Air Quality Law"|"Water Quality Law"|"Mineral Resources Law"|"Chemical Safety Law"|"Fish and Game Law"|"Impact Assessment Law"|"Wildlife and Plants Law"|"Agriculture Law"|"Tax and Revenue Law"|"Estates, Gifts, and Trusts Law"|"Non-Profit and Tax-Exempt Organizations Law"|"Tax Law"|"Tax Credits Law"|"Health Law"|"Telecommunications, Media, and Entertainment Law"|"Entertainment Law"|"Telecommunications Law"|"Broadcasting Law"|"Telecommunication Utilities Law"|"Sports Law"|"Advertising Law"|"Commercial and Trade Law"|"Trade Law"|"Admiralty and Maritime Law"|"Consumer Protection Law"|"Franchise Law"|"Antitrust and Competition Law"} SALIAreaOfLaw
 */

/**

 * @typedef {Object} SaliAreaOfLawClassificationItem
 * @property {SALIAreaOfLaw} value
 * @property {string} id - IRI of the area of law
 */

/**

 * @typedef {EventType|"*"} EventTypeWithWildcard
 */

/**

 * @typedef {Object} EventPayload
 * @property {ContactPayload|OrganizationPayload|MatterPayload|FailedWorkflowPayload} payload
 */

/**

 * The id of the custom taxonomy
 * @typedef {"IndustryCodes1"|"IndustryCodes2"} TaxonomyId
 */

/**

 * @typedef {Object} ContactPayload
 * @property {ExternalContact} contact
 * @property {ResourceChange} [change]
 */

/**

 * @typedef {Object} OrganizationPayload
 * @property {ExternalOrganization} organization
 * @property {ResourceChange} [change]
 */

/**

 * @typedef {Object} MatterPayload
 * @property {ExternalMatterWithClassifications} matter
 * @property {ResourceChange} [change]
 */

/**

 * @typedef {Object} FailedWorkflowPayload
 * @property {ResourceChange} change
 */

/**

 * Represents a change to a resource (contact or organization)
 * @typedef {Object} ResourceChange
 * @property {Object} resource - Information about the resource that was changed
 * @property {string} changedAt - Timestamp of when the change occurred
 * @property {JSONPatch} patch - JSON Patch describing the changes made to the resource
 */

/**

 * JSON Patch as specified in [RFC 6902](https://tools.ietf.org/html/rfc6902)
 * @typedef {Array<Object>} JSONPatch
 */

module.exports = {};
