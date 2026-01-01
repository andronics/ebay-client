import { EnergyEfficiencyLabel } from './EnergyEfficiencyLabel.js';
import { Hazmat } from './Hazmat.js';
import { ProductSafety } from './ProductSafety.js';
import { Manufacturer } from './Manufacturer.js';
import { ResponsiblePersons } from './ResponsiblePersons.js';
import { Documents } from './Documents.js';

/**
 * Regulatory
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Regulatory {
    /** EnergyEfficiencyLabel */
    EnergyEfficiencyLabel?: EnergyEfficiencyLabel;
    /** Hazmat */
    Hazmat?: Hazmat;
    /** ProductSafety */
    ProductSafety?: ProductSafety;
    /** xs:double */
    RepairScore?: number;
    /** Manufacturer */
    Manufacturer?: Manufacturer;
    /** ResponsiblePersons */
    ResponsiblePersons?: ResponsiblePersons;
    /** Documents */
    Documents?: Documents;
}
