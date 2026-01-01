/**
 * eBay notification event types supported by the Trading API.
 */
export type NotificationEventType =
  | 'ItemSold'
  | 'ItemEnded'
  | 'ItemListed'
  | 'ItemRevised'
  | 'ItemUnsold'
  | 'FixedPriceTransaction'
  | 'BestOffer'
  | 'BestOfferDeclined'
  | 'AskSellerQuestion'
  | 'FeedbackReceived'
  | 'TokenRevocation'
  | 'ItemMarkedPaid'
  | 'ItemMarkedShipped'
  | 'OutBid'
  | 'BidPlaced';

/**
 * List of all supported notification event types.
 */
export const NOTIFICATION_EVENT_TYPES: NotificationEventType[] = [
  'ItemSold',
  'ItemEnded',
  'ItemListed',
  'ItemRevised',
  'ItemUnsold',
  'FixedPriceTransaction',
  'BestOffer',
  'BestOfferDeclined',
  'AskSellerQuestion',
  'FeedbackReceived',
  'TokenRevocation',
  'ItemMarkedPaid',
  'ItemMarkedShipped',
  'OutBid',
  'BidPlaced',
];
