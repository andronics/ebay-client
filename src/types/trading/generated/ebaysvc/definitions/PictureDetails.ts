import { ExtendedPictureDetails } from './ExtendedPictureDetails.js';

/**
 * PictureDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PictureDetails {
    /** GalleryTypeCodeType|xs:token|None,Featured,Gallery,Plus,CustomCode */
    GalleryType?: string;
    /** xs:anyURI */
    GalleryURL?: string;
    /** xs:anyURI */
    PictureURL?: Array<string>;
    /** PictureSourceCodeType|xs:token|EPS,PictureManager,Vendor,CustomCode */
    PictureSource?: string;
    /** GalleryStatusCodeType|xs:token|Success,Pending,InvalidUrl,InvalidProtocol,InvalidFile,ServerDown,ImageNonExistent,ImageReadTimeOut,InvalidFileFormat,ImageProcessingError,CustomCode */
    GalleryStatus?: string;
    /** xs:string */
    GalleryErrorInfo?: string;
    /** xs:anyURI */
    ExternalPictureURL?: Array<string>;
    /** ExtendedPictureDetails */
    ExtendedPictureDetails?: ExtendedPictureDetails;
}
