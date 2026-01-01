import { http, HttpResponse } from 'msw';

/**
 * eBay Taxonomy API endpoints (sandbox).
 */
const TAXONOMY_API_URL = 'https://api.sandbox.ebay.com/commerce/taxonomy/v1';

/**
 * Sample JSON responses for Taxonomy API operations.
 */
const responses = {
  getDefaultCategoryTreeId: {
    categoryTreeId: '3',
    categoryTreeVersion: '121',
  },

  getCategoryTree: {
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
            categoryId: '293',
            categoryName: 'Electronics',
          },
          categoryTreeNodeLevel: 1,
          leafCategoryTreeNode: false,
        },
      ],
    },
  },

  getCategorySubtree: {
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
  },

  getCategorySuggestions: {
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
        ],
      },
      {
        category: {
          categoryId: '43304',
          categoryName: 'Cell Phone Cases',
        },
        categoryTreeNodeLevel: 3,
      },
    ],
  },

  getItemAspectsForCategory: {
    aspects: [
      {
        localizedAspectName: 'Brand',
        aspectConstraint: {
          aspectDataType: 'STRING',
          aspectMode: 'SELECTION_ONLY',
          aspectRequired: true,
          aspectUsage: 'RECOMMENDED',
          itemToAspectCardinality: 'SINGLE',
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
          { localizedValue: '128 GB' },
          { localizedValue: '256 GB' },
          { localizedValue: '512 GB' },
        ],
      },
    ],
  },

  fetchItemAspects: {
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
              aspectRequired: true,
            },
          },
        ],
      },
    ],
  },

  getExpiredCategories: {
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
  },

  getCompatibilityProperties: {
    compatibilityProperties: [
      { name: 'Year', localizedName: 'Year' },
      { name: 'Make', localizedName: 'Make' },
      { name: 'Model', localizedName: 'Model' },
      { name: 'Trim', localizedName: 'Trim' },
      { name: 'Engine', localizedName: 'Engine' },
    ],
  },

  getCompatibilityPropertyValues: {
    compatibilityPropertyValues: [
      { value: 'Camry' },
      { value: 'Corolla' },
      { value: 'RAV4' },
      { value: 'Highlander' },
    ],
  },

  notFound: {
    errors: [
      {
        errorId: 10001,
        domain: 'TAXONOMY',
        category: 'REQUEST',
        message: 'Category not found',
        longMessage: 'The specified category was not found in the category tree.',
      },
    ],
  },

  invalidCategoryTree: {
    errors: [
      {
        errorId: 10002,
        domain: 'TAXONOMY',
        category: 'REQUEST',
        message: 'Invalid category tree',
        longMessage: 'The specified category tree ID is invalid.',
      },
    ],
  },

  unauthorized: {
    errors: [
      {
        errorId: 1001,
        domain: 'API_AUTH',
        category: 'REQUEST',
        message: 'Access denied',
        longMessage: 'Access token is invalid or expired.',
      },
    ],
  },

  notLeafCategory: {
    errors: [
      {
        errorId: 10003,
        domain: 'TAXONOMY',
        category: 'REQUEST',
        message: 'Not a leaf category',
        longMessage: 'The specified category is not a leaf category.',
      },
    ],
  },
};

/**
 * Tracked requests for assertion in tests.
 */
export const capturedRequests: Array<{
  method: string;
  path: string;
  query?: Record<string, string>;
  headers: Record<string, string>;
}> = [];

/**
 * Clear captured requests between tests.
 */
export function clearCapturedRequests() {
  capturedRequests.length = 0;
}

/**
 * MSW handlers for Taxonomy API.
 */
export const taxonomyHandlers = [
  // ===========================================================================
  // Category Tree Operations
  // ===========================================================================

  // GET /get_default_category_tree_id
  http.get(`${TAXONOMY_API_URL}/get_default_category_tree_id`, async ({ request }) => {
    const url = new URL(request.url);
    const marketplaceId = url.searchParams.get('marketplace_id');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: '/get_default_category_tree_id',
      query: { marketplace_id: marketplaceId || '' },
      headers,
    });

    if (marketplaceId === 'INVALID') {
      return HttpResponse.json(responses.invalidCategoryTree, { status: 400 });
    }

    return HttpResponse.json(responses.getDefaultCategoryTreeId);
  }),

  // GET /category_tree/:categoryTreeId
  http.get(`${TAXONOMY_API_URL}/category_tree/:categoryTreeId`, async ({ request, params }) => {
    const categoryTreeId = params.categoryTreeId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: `/category_tree/${categoryTreeId}`,
      headers,
    });

    if (categoryTreeId === 'INVALID') {
      return HttpResponse.json(responses.invalidCategoryTree, { status: 400 });
    }

    return HttpResponse.json({ ...responses.getCategoryTree, categoryTreeId });
  }),

  // GET /category_tree/:categoryTreeId/get_category_subtree
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_category_subtree`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const url = new URL(request.url);
      const categoryId = url.searchParams.get('category_id');
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_category_subtree`,
        query: { category_id: categoryId || '' },
        headers,
      });

      if (categoryId === 'NOT-FOUND') {
        return HttpResponse.json(responses.notFound, { status: 404 });
      }

      return HttpResponse.json(responses.getCategorySubtree);
    }
  ),

  // GET /category_tree/:categoryTreeId/get_category_suggestions
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_category_suggestions`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const url = new URL(request.url);
      const query = url.searchParams.get('q');
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_category_suggestions`,
        query: { q: query || '' },
        headers,
      });

      return HttpResponse.json(responses.getCategorySuggestions);
    }
  ),

  // GET /category_tree/:categoryTreeId/get_expired_categories
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_expired_categories`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_expired_categories`,
        headers,
      });

      return HttpResponse.json(responses.getExpiredCategories);
    }
  ),

  // ===========================================================================
  // Aspect Operations
  // ===========================================================================

  // GET /category_tree/:categoryTreeId/get_item_aspects_for_category
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_item_aspects_for_category`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const url = new URL(request.url);
      const categoryId = url.searchParams.get('category_id');
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_item_aspects_for_category`,
        query: { category_id: categoryId || '' },
        headers,
      });

      if (categoryId === 'NOT-FOUND') {
        return HttpResponse.json(responses.notFound, { status: 404 });
      }

      if (categoryId === 'NOT-LEAF') {
        return HttpResponse.json(responses.notLeafCategory, { status: 400 });
      }

      return HttpResponse.json(responses.getItemAspectsForCategory);
    }
  ),

  // GET /category_tree/:categoryTreeId/fetch_item_aspects
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/fetch_item_aspects`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/fetch_item_aspects`,
        headers,
      });

      return HttpResponse.json(responses.fetchItemAspects);
    }
  ),

  // ===========================================================================
  // Compatibility Operations
  // ===========================================================================

  // GET /category_tree/:categoryTreeId/get_compatibility_properties
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_compatibility_properties`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const url = new URL(request.url);
      const categoryId = url.searchParams.get('category_id');
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_compatibility_properties`,
        query: { category_id: categoryId || '' },
        headers,
      });

      return HttpResponse.json(responses.getCompatibilityProperties);
    }
  ),

  // GET /category_tree/:categoryTreeId/get_compatibility_property_values
  http.get(
    `${TAXONOMY_API_URL}/category_tree/:categoryTreeId/get_compatibility_property_values`,
    async ({ request, params }) => {
      const categoryTreeId = params.categoryTreeId as string;
      const url = new URL(request.url);
      const categoryId = url.searchParams.get('category_id');
      const compatibilityProperty = url.searchParams.get('compatibility_property');
      const filter = url.searchParams.get('filter');
      const headers = captureHeaders(request);
      capturedRequests.push({
        method: 'GET',
        path: `/category_tree/${categoryTreeId}/get_compatibility_property_values`,
        query: {
          category_id: categoryId || '',
          compatibility_property: compatibilityProperty || '',
          ...(filter ? { filter } : {}),
        },
        headers,
      });

      return HttpResponse.json(responses.getCompatibilityPropertyValues);
    }
  ),
];

/**
 * Helper to capture request headers.
 */
function captureHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

/**
 * Handler that simulates a 401 unauthorized error.
 */
export const unauthorizedHandler = http.get(
  `${TAXONOMY_API_URL}/get_default_category_tree_id`,
  () => {
    return HttpResponse.json(responses.unauthorized, { status: 401 });
  }
);

/**
 * Handler that simulates a 500 server error.
 */
export const error500Handler = http.get(
  `${TAXONOMY_API_URL}/get_default_category_tree_id`,
  () => {
    return new HttpResponse(null, { status: 500 });
  }
);
