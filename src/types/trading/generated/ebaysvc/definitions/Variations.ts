import { Variation } from './Variation.js';
import { Pictures } from './Pictures.js';
import { ItemSpecifics } from './ItemSpecifics.js';
import { ModifyNameList } from './ModifyNameList.js';

/**
 * Variations
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Variations {
    /** Variation[] */
    Variation?: Array<Variation>;
    /** Pictures[] */
    Pictures?: Array<Pictures>;
    /** VariationSpecificsSet */
    VariationSpecificsSet?: ItemSpecifics;
    /** ModifyNameList */
    ModifyNameList?: ModifyNameList;
}
