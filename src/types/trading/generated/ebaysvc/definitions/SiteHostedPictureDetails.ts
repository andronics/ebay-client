import { PictureSetMember } from './PictureSetMember.js';

/**
 * SiteHostedPictureDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SiteHostedPictureDetails {
    /** xs:string */
    PictureName?: string;
    /** PictureSetCodeType|xs:token|Standard,Supersize,Large,CustomCode */
    PictureSet?: string;
    /** PictureFormatCodeType|xs:token|JPG,GIF,PNG,CustomCode */
    PictureFormat?: string;
    /** xs:anyURI */
    FullURL?: string;
    /** xs:anyURI */
    BaseURL?: string;
    /** PictureSetMember[] */
    PictureSetMember?: Array<PictureSetMember>;
    /** xs:anyURI */
    ExternalPictureURL?: string;
    /** xs:dateTime */
    UseByDate?: Date;
}
