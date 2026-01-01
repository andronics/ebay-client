import { RegistrationAddress } from './RegistrationAddress.js';
import { VatDetails } from './VatDetails.js';

/**
 * BusinessSellerDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BusinessSellerDetails {
    /** Address */
    Address?: RegistrationAddress;
    /** xs:string */
    Fax?: string;
    /** xs:string */
    Email?: string;
    /** xs:string */
    AdditionalContactInformation?: string;
    /** xs:string */
    TradeRegistrationNumber?: string;
    /** xs:boolean */
    LegalInvoice?: boolean;
    /** xs:string */
    TermsAndConditions?: string;
    /** VATDetails */
    VATDetails?: VatDetails;
}
