/**
 * Sample Taxonomy API JSON responses for testing.
 */

export const GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS = {
  categoryTreeId: '3',
  categoryTreeVersion: '121',
};

export const GET_CATEGORY_TREE_SUCCESS = {
  categoryTreeId: '3',
  categoryTreeVersion: '121',
  applicableMarketplaceIds: ['EBAY_GB'],
  rootCategoryNode: {
    category: {
      categoryId: '0',
      categoryName: 'Root',
    },
    categoryTreeNodeLevel: 0,
    leafCategoryTreeNode: false,
    childCategoryTreeNodes: [
      {
        category: {
          categoryId: '9355',
          categoryName: 'Cell Phones & Smartphones',
        },
        categoryTreeNodeLevel: 1,
        leafCategoryTreeNode: true,
      },
    ],
  },
};

export const GET_CATEGORY_SUBTREE_SUCCESS = {
  categoryTreeId: '3',
  categoryTreeVersion: '121',
  categorySubtreeNode: {
    category: {
      categoryId: '9355',
      categoryName: 'Cell Phones & Smartphones',
    },
    categoryTreeNodeLevel: 3,
    leafCategoryTreeNode: false,
    childCategoryTreeNodes: [
      {
        category: {
          categoryId: '9355001',
          categoryName: 'Apple iPhone',
        },
        categoryTreeNodeLevel: 4,
        leafCategoryTreeNode: true,
      },
      {
        category: {
          categoryId: '9355002',
          categoryName: 'Samsung Galaxy',
        },
        categoryTreeNodeLevel: 4,
        leafCategoryTreeNode: true,
      },
    ],
  },
};

export const GET_CATEGORY_SUGGESTIONS_SUCCESS = {
  categoryTreeId: '3',
  categoryTreeVersion: '121',
  categorySuggestions: [
    {
      category: {
        categoryId: '9355',
        categoryName: 'Cell Phones & Smartphones',
      },
      categoryTreeNodeLevel: 3,
      categoryTreeNodeAncestors: [
        {
          categoryId: '15032',
          categoryName: 'Cell Phones & Accessories',
          categoryTreeNodeLevel: 2,
        },
        {
          categoryId: '293',
          categoryName: 'Electronics',
          categoryTreeNodeLevel: 1,
        },
      ],
    },
    {
      category: {
        categoryId: '43304',
        categoryName: 'Cell Phone Cases, Covers & Skins',
      },
      categoryTreeNodeLevel: 3,
      categoryTreeNodeAncestors: [
        {
          categoryId: '15032',
          categoryName: 'Cell Phones & Accessories',
          categoryTreeNodeLevel: 2,
        },
      ],
    },
  ],
};

export const GET_ITEM_ASPECTS_FOR_CATEGORY_SUCCESS = {
  aspects: [
    {
      localizedAspectName: 'Brand',
      aspectConstraint: {
        aspectDataType: 'STRING',
        aspectMode: 'SELECTION_ONLY',
        aspectRequired: true,
        aspectUsage: 'RECOMMENDED',
        itemToAspectCardinality: 'SINGLE',
        aspectEnabledForVariations: false,
      },
      aspectValues: [
        { localizedValue: 'Apple' },
        { localizedValue: 'Samsung' },
        { localizedValue: 'Google' },
      ],
    },
    {
      localizedAspectName: 'Model',
      aspectConstraint: {
        aspectDataType: 'STRING',
        aspectMode: 'FREE_TEXT',
        aspectRequired: true,
        aspectUsage: 'RECOMMENDED',
        itemToAspectCardinality: 'SINGLE',
        aspectEnabledForVariations: false,
        aspectMaxLength: 65,
      },
    },
    {
      localizedAspectName: 'Storage Capacity',
      aspectConstraint: {
        aspectDataType: 'STRING',
        aspectMode: 'SELECTION_ONLY',
        aspectRequired: false,
        aspectUsage: 'OPTIONAL',
        itemToAspectCardinality: 'SINGLE',
        aspectEnabledForVariations: true,
      },
      aspectValues: [
        { localizedValue: '64 GB' },
        { localizedValue: '128 GB' },
        { localizedValue: '256 GB' },
        { localizedValue: '512 GB' },
        { localizedValue: '1 TB' },
      ],
    },
    {
      localizedAspectName: 'Color',
      aspectConstraint: {
        aspectDataType: 'STRING',
        aspectMode: 'SELECTION_ONLY',
        aspectRequired: false,
        aspectUsage: 'RECOMMENDED',
        itemToAspectCardinality: 'SINGLE',
        aspectEnabledForVariations: true,
      },
      aspectValues: [
        { localizedValue: 'Black' },
        { localizedValue: 'White' },
        { localizedValue: 'Blue' },
        { localizedValue: 'Silver' },
        {
          localizedValue: 'Natural Titanium',
          valueConstraints: [
            {
              applicableForLocalizedAspectName: 'Brand',
              applicableForLocalizedAspectValues: ['Apple'],
            },
          ],
        },
      ],
    },
  ],
};

export const FETCH_ITEM_ASPECTS_SUCCESS = {
  categoryTreeId: '3',
  categoryTreeVersion: '121',
  categoryAspects: [
    {
      category: {
        categoryId: '9355',
        categoryName: 'Cell Phones & Smartphones',
      },
      aspects: [
        {
          localizedAspectName: 'Brand',
          aspectConstraint: {
            aspectDataType: 'STRING',
            aspectMode: 'SELECTION_ONLY',
            aspectRequired: true,
          },
        },
      ],
    },
  ],
};

export const GET_EXPIRED_CATEGORIES_SUCCESS = {
  expiredCategories: [
    {
      fromCategoryId: '12345',
      toCategoryId: '67890',
    },
    {
      fromCategoryId: '11111',
      toCategoryId: '67890',
    },
  ],
};

export const GET_COMPATIBILITY_PROPERTIES_SUCCESS = {
  compatibilityProperties: [
    {
      name: 'Year',
      localizedName: 'Year',
    },
    {
      name: 'Make',
      localizedName: 'Make',
    },
    {
      name: 'Model',
      localizedName: 'Model',
    },
    {
      name: 'Trim',
      localizedName: 'Trim',
    },
    {
      name: 'Engine',
      localizedName: 'Engine',
    },
  ],
};

export const GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS = {
  compatibilityPropertyValues: [
    { value: 'Camry' },
    { value: 'Corolla' },
    { value: 'RAV4' },
    { value: 'Highlander' },
    { value: 'Tacoma' },
  ],
};

export const API_ERROR_NOT_FOUND = {
  errors: [
    {
      errorId: 10001,
      domain: 'TAXONOMY',
      category: 'REQUEST',
      message: 'Category not found',
      longMessage: 'The specified category was not found in the category tree.',
    },
  ],
};

export const API_ERROR_INVALID_CATEGORY_TREE = {
  errors: [
    {
      errorId: 10002,
      domain: 'TAXONOMY',
      category: 'REQUEST',
      message: 'Invalid category tree',
      longMessage: 'The specified category tree ID is invalid.',
    },
  ],
};

export const API_ERROR_UNAUTHORIZED = {
  errors: [
    {
      errorId: 1001,
      domain: 'API_AUTH',
      category: 'REQUEST',
      message: 'Access denied',
      longMessage: 'Access token is invalid or expired.',
    },
  ],
};

export const API_ERROR_NOT_LEAF_CATEGORY = {
  errors: [
    {
      errorId: 10003,
      domain: 'TAXONOMY',
      category: 'REQUEST',
      message: 'Not a leaf category',
      longMessage: 'The specified category is not a leaf category. Item aspects are only available for leaf categories.',
    },
  ],
};
